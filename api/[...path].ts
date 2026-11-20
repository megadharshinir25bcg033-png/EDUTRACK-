
import type { Request, Response } from 'express';
import { createApp } from '../server.ts';

let appPromise: ReturnType<typeof createApp> | undefined;

export default async function handler(req: Request, res: Response) {
    try {
        appPromise ??= createApp();
        const app = await appPromise;
        return app(req, res);
    } catch (error) {
        console.error('EduTrack API error:', error);
        return res.status(500).json({
            error: 'Institutional server is unavailable.',
        });
    }
}
