import Jimp from 'jimp';

export interface BufferResizerOptions {
    width: number;
    height: number;
};

const defaultOptions: BufferResizerOptions = { width: 700, height: 500 };

export default async (buffer: Buffer, options: BufferResizerOptions = defaultOptions) => {
    const image = await Jimp.read(buffer);

    options.width = Math.trunc(
        image.bitmap.width * (options.height / image.bitmap.height)
    );
    options.height = Math.trunc(
        image.bitmap.height * (options.width / image.bitmap.width)
    );

    return image.resize(options.width, options.height).getBufferAsync('image/png');
};