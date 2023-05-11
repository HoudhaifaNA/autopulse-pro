import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormikContext } from "formik";

import { Values } from "components/LicenceForm/types";
import Button from "components/Buttons/Button";
import uid from "utils/uniqid";

const Dropzone = () => {
  const { setFieldValue, values } = useFormikContext<Values>();
  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "application/pdf": [".pdf"],
    },
  });

  // We give new attachments unique ids and add theme to the previous attachments
  useEffect(() => {
    let newAttachments = acceptedFiles.map((file) => {
      return { id: uid(), file };
    });
    setFieldValue("attachments", values.attachments.concat(newAttachments));
  }, [acceptedFiles]);

  return (
    <Button
      {...getRootProps({ type: "button", variant: "primary", icon: "upload" })}
    >
      <input {...getInputProps()} style={{ display: "none" }} />
      Ajouter un document
    </Button>
  );
};

export default Dropzone;
