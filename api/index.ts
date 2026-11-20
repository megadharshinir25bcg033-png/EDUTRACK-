import { createApp } from '../server/app.js';

// Single Vercel Serverless Function serving every /api/* route via the
// rewrite in vercel.json. Express sees the original request path.
export default createApp();
