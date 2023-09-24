import { Ref, forwardRef, useEffect } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useFormikContext } from "formik";

import Button from "components/Button/Button";

import uid from "utils/uniqid";
import { LicenceInitalValues } from "../LicenceForm/types";

interface DropzoneProps {
  disabled?: boolean;
}

const DROPZONE_OPTIONS: DropzoneOptions = {
  accept: {
    "image/*": [".png", ".jpeg", ".jpg"],
    "application/pdf": [".pdf"],
  },
};

const Dropzone = forwardRef(({ disabled }: DropzoneProps, ref: Ref<HTMLButtonElement>) => {
  const { setFieldValue, values } = useFormikContext<LicenceInitalValues>();
  const { getInputProps, getRootProps, acceptedFiles } = useDropzone(DROPZONE_OPTIONS);

  useEffect(() => {
    const newAttachments = acceptedFiles.map((file) => {
      return { id: uid(), file };
    });

    setFieldValue("attachments", values.attachments.concat(newAttachments));
  }, [acceptedFiles]);

  return (
    <Button {...getRootProps({ type: "button", variant: "primary", icon: "upload", disabled })} ref={ref}>
      <input {...getInputProps()} style={{ display: "none" }} />
      Ajouter des documents
    </Button>
  );
});

export default Dropzone;
