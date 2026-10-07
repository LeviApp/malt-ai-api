import { type Request, type Response, type NextFunction } from 'express';

export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
    const clientKey = req.headers['x-api-key'];
    const serverKey = process.env.API_FINGERPRINT;

    if (!serverKey) {
        return res.status(500).json({ error: 'Server configuration error: Missing API key.' });
    }

    if (!clientKey || clientKey !== serverKey) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid API key.' });
    }

    next();
}