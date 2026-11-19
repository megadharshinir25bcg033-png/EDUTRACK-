# EduTrack AI — Security Specification (Phase 0)

## 1. Data Invariants
1. **Identity Isolation**: Every user profile and private PII sub-document (`/users/{userId}/private/{docId}`) is readable and writable exclusively by `request.auth.uid == userId` or verified administrators.
2. **Tenant Ownership & Zero Cross-Read**: Every workspace document across `assignments`, `submissions`, `attendance`, `leaveRequests`, `grades`, `materials`, `announcements`, `calendarEvents`, `students`, `staff`, and `aiThreads` MUST carry `ownerUid == request.auth.uid`. Both `allow get` and `allow list` verify `resource.data.ownerUid == request.auth.uid || isAdmin()`.
3. **Immutable Ownership & Timestamps**: `ownerUid` and `createdAt` cannot be modified after creation. `createdAt == request.time` on create; `updatedAt == request.time` on update.
4. **No Self-Assigned Admin Roles**: Users cannot write to `/admins/{userId}` from client SDKs and cannot include privilege fields (`isAdmin`, `role`) on `/users/{userId}`.
5. **Strict Key & Size Boundaries**: Every write validates `keys().hasAll(...) && keys().hasOnly(...)` on create, `affectedKeys().hasOnly(...)` on update, `isValidId(docId)` on single-doc operations, and explicit `.size()` bounds on every string and array.

## 2. The "Dirty Dozen" Payloads (All Must Return PERMISSION_DENIED)
1. **Shadow Update on User Profile**: Updating `/users/{uid}` with extra field `{ isAdmin: true }` -> Rejected by `affectedKeys().hasOnly(...)` and `hasOnly(...)`.
2. **Cross-Tenant List Scraping**: Querying `/assignments` without `where('ownerUid', '==', uid)` -> Rejected by `allow list: if resource.data.ownerUid == request.auth.uid || isAdmin()`.
3. **PII Leak Attempt**: Reading `/users/{otherUid}/private/info` as a non-admin signed-in user -> Rejected by `isOwner(userId) || isAdmin()`.
4. **Owner Spoofing on Create**: Creating `/submissions/{id}` with `ownerUid: "victim-uid"` -> Rejected by `incoming().ownerUid == request.auth.uid`.
5. **Owner Mutation on Update**: Updating `/students/{id}` changing `ownerUid` -> Rejected by `incoming().ownerUid == existing().ownerUid` and `affectedKeys().hasOnly(...)`.
6. **ID Poisoning Attack**: Creating `/assignments/../../etc/passwd` or 500-char ID -> Rejected by `isValidId(assignmentId)`.
7. **Timestamp Forgery**: Creating `/leaveRequests/{id}` with client-supplied `createdAt: "2020-01-01"` -> Rejected by `incoming().createdAt == request.time`.
8. **Unverified Email Bypass**: Attempting write with `email_verified: false` -> Rejected by `isVerifiedUser()`.
9. **Resource Exhaustion (1MB String)**: Creating `/aiThreads/{id}` with a 500KB `title` -> Rejected by `data.title.size() <= 140`.
10. **Unbounded Array Injection**: Creating `/aiThreads/{id}` with 100 messages -> Rejected by `data.messages.size() <= 50`.
11. **Terminal State Violation**: Updating a `leaveRequests/{id}` whose `status` is already `'Approved'` -> Rejected by terminal state guard.
12. **Privilege Escalation**: Creating `/admins/{uid}` directly from client SDK -> Rejected by `allow read, write: if false`.
