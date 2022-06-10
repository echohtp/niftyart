
import ipfsSDK from '../src/modules/ipfs/client';
import { Upload } from 'antd';
import { isNil } from 'ramda';
import { toast } from 'react-toastify';

type UploadProps = {
  beforeUpload?: (file: any) => boolean;
  onChange?: (uploads: any) => any;
  onRemove?: (uploads: any) => any;
  className?: string;
  disabled?: boolean;
  value?: any;
  children?: React.ReactElement | boolean;
  dragger?: boolean;
  success?: (resp: any, file: any) => any;
};

export default function FileUpload ({ children, onChange, dragger = false, success, onRemove, beforeUpload }: UploadProps) {

  const handleInputChange = async (upload: any) => {
    const file = upload.file;

    if (isNil(file)) {
      return;
    }

    ipfsSDK
      .uploadFile(file)
      .then(res => {
        let resp = res
        resp['url'] = resp['uri']
        //@ts-ignore
        success(resp, file);
        upload.onSuccess(resp, file)
        
      })
      .catch(e => {
        console.error(e);
        upload.onError(e);
        toast.error(<>{e instanceof Error ? e.message : 'Upload to ipfs failed.'}</>);
      });
  };

  const Component = dragger ? Upload.Dragger : Upload;

  return (
    <Component
      beforeUpload={beforeUpload}
      onRemove={onRemove}
      customRequest={handleInputChange}
      maxCount={1}
      onChange={({ fileList }: any) => {

        // if (isNil(onChange)) {
        //   return;
        // }
        // onChange(fileList);
        // console.log(fileList)
      }}
      // fileList={value}
    >
      {children}
    </Component>
  );
}
