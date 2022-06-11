import {createReadStream} from 'fs';
import path from 'path';
import { fromDwebLink } from '..';
import { PinFileResponse } from '../types';

export default async function uploadFile(file: File): Promise<PinFileResponse> {
  //@ts-ignore
  const body = createReadStream(file.filepath)
  try {
    const response = await fetch('https://api.nft.storage/upload', {
      //@ts-ignore 
      body,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NFT_STORAGE_API_KEY || ''}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const json = await response.json();
    if (!json.ok) {
      return {
        error: json.error?.code + ': ' + json.error?.message,
        uri: '',
        //@ts-ignore
        name: file.originalFilename || '',
        //@ts-ignore
        type: file.mimetype || '',
      };
    }
    //@ts-ignore
    const ext = path.extname(file.originalFilename).replace('.', '');
    return {
      error: undefined,
      uri: fromDwebLink(json.value.cid) + `?ext=${ext}`,
      //@ts-ignore
      name: file.originalFilename || '',
      //@ts-ignore
      type: file.mimetype || '',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Upload error',
      uri: undefined,
      //@ts-ignore
      name: file.originalFilename || '',
      //@ts-ignore
      type: file.mimetype || '',
    };
  }
}
