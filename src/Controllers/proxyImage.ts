import { Request, Response } from 'express';
import request from 'request';
import BufferResizer, { BufferResizerOptions } from '../Utlis/BufferResizer';

export const proxyImage = (req: Request, res: Response) => {
    const url = req.query.url as string;
    const w = req.query.w as string;
    const h = req.query.h as string;
    let resizeRequiried: Boolean = false;

    if (!url) return res.status(400).send('URL not specified!');

    if (w && h) {
        if (!Number(h) || !Number(w)) return res.status(400).send('h and w must be numbers!');
        resizeRequiried = true;
    };

    const requestSettings = {
        url: url,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, async (error, response, body) => {
        if (!resizeRequiried) return res.status(200).send(body);
        try {
            const resizedImageBuffer = await BufferResizer(body, {
                height: Number(h),
                width: Number(w),
            });
            res.status(200).send(resizedImageBuffer);
        } catch (e) {
            console.log(e);
            res.status(500).send('Error resizing the image!');
        }
    });
};