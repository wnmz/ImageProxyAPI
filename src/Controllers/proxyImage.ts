import { Request, Response } from 'express';
import request from 'request';
import BufferResizer from '../Utlis/BufferResizer';

export const proxyImage = (req: Request, res: Response) => {
    const url = req.query.url as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    let resizeRequiried: Boolean = false;

    if (!url) return res.status(400).send('URL not specified!');

    if (width && height) {
        if (!Number(height) || !Number(width))
            return res.status(400).send('h and w must be numbers!');

        if (Number(height) > 1000 || Number(width) > 1000)
            return res.status(400).send('width or height can\'t be higher than 1000px');

        resizeRequiried = true;
    };

    const requestSettings: request.Options = {
        url: url,
        method: 'GET',
        encoding: null,
        timeout: 10000,
    };

    const handleResponse = async (error: Error, response: request.Response, body: Buffer) => {
        if (error) return res.status(424).send('Something went wrong!');
        if (!resizeRequiried) return res.status(200).send(body);

        try {
            const resizedImageBuffer = await BufferResizer(body, {
                height: Number(height),
                width: Number(width),
            });
            res.status(200).send(resizedImageBuffer);
        } catch (e) {
            console.log(e);
            res.status(500).send('Error resizing the image!');
        }
    };

    request(requestSettings, handleResponse);
}


