import Jimp from 'jimp';

export interface BufferResizerOptions {
    width: number;
    height: number;
};

const defaultOptions: BufferResizerOptions = { width: 400, height: 225 };

// TODO: GIF SUPPORT
export default async (buffer: Buffer, options: BufferResizerOptions = defaultOptions) => {
    const image = await Jimp.read(buffer);

    options.width = Math.trunc(
        image.bitmap.width * (options.height / image.bitmap.height)
    );
    options.height = Math.trunc(
        image.bitmap.height * (options.width / image.bitmap.width)
    );
    
    //TODO: Fix mime
    return image.resize(options.width, options.height).getBufferAsync('image/png');
};