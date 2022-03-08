import { Request, Response } from 'express';
import { responseTemplate } from '../Utlis/responseTemplate';

export const proxyImage = (req: Request, res: Response) => {
    const url = req.query.url as string;
    const w = req.query.w as string;
    const h = req.query.h as string;

    if (!url) return res.status(400).send('URL not specified!');
    if (w || h) {
        if (!Number(h) || !Number(w)) return res.status(400).send('h and w must be numbers');
        return res.status(200).send(responseTemplate(encodeURI(url), w, h));
    };

    return res.status(200).send(responseTemplate(encodeURI(url)));
};