import Uploader from "@components/common/uploader";
import { Controller } from "react-hook-form";

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
  thumb_size?:number;
}

const FileInput = ({ control, name, multiple = true,thumb_size=16 }: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { ref, ...rest } }) => (
        <Uploader {...rest} multiple={multiple} size={thumb_size} />
      )}
    />
  );
};

export default FileInput;
