import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormikContext } from "formik";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import * as S from "./styles";
import PDFPreview from "../PDFPreview";
import Icon from "components/Icon/Icon";
import { Attachment, LicenceInitalValues } from "../LicenceForm/types";

const AttachmentViewer = ({ attachment }: { attachment: Attachment }) => {
  const { setFieldValue, values } = useFormikContext<LicenceInitalValues>();
  const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (progress === 100) setLoading(false);
  }, [progress]);

  const handleDelete = () => {
    const { attachments } = values;
    let filterdFiles = attachments.filter(({ id }) => id !== attachment.id);

    setFieldValue("attachments", filterdFiles);
  };

  const fileExtension = attachment.file.type.split("/")[1];
  const reader = new FileReader();

  reader.readAsDataURL(attachment.file);
  reader.onload = () => setProgress(100);
  reader.onloadend = () => setThumbnail(reader.result);

  const renderThumbnail = () => {
    // Only render when it is not loading and file has been read
    if (!loading && typeof thumbnail === "string") {
      return (
        <>
          <S.DeleteButton onClick={handleDelete}>
            <Icon icon="delete" size="2.4rem" />
          </S.DeleteButton>
          {fileExtension === "pdf" ? (
            <PDFPreview file={attachment.file} />
          ) : (
            <Image src={thumbnail} fill={true} alt={attachment.file.name} />
          )}
        </>
      );
    }
  };

  return (
    <S.DocumentPreview>
      {loading && <CircularProgressbar value={progress} text={`${progress}%`} />}
      {renderThumbnail()}
    </S.DocumentPreview>
  );
};

export default AttachmentViewer;
