import { useState } from "react";
import Image from "next/image";

import * as S from "components/LicenceDocument/LicenceDocument.styled";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";
import PDFPreview from "components/LicenceForm/PDFPreview";
import FileViewer from "components/FileViewer/FileViewer";
import PDFViewer from "components/PDFViewer/PDFViewer";

const LicenceDocument = ({ document }: { document: any }) => {
  const [currentImage, setCurrentImage] = useState<string>();
  const [currentPDF, setCurrentPDF] = useState<string>();
  const attachments = JSON.parse(document.attachments);

  const renderFileViewer = () => {
    if (currentImage) {
      return (
        <FileViewer onCloseFile={() => setCurrentImage("")}>
          <Image
            src={currentImage}
            width={0}
            height={0}
            alt={document.moudjahid}
          />
        </FileViewer>
      );
    } else if (currentPDF) {
      return (
        <FileViewer onCloseFile={() => setCurrentPDF("")}>
          <PDFViewer file={currentPDF} />
        </FileViewer>
      );
    }
  };

  const renderAttachments = () => {
    return attachments.map((atc: any, ind: number) => {
      const fileType = atc.endsWith("pdf") ? "pdf" : "image";
      const filePath = `http://localhost:3000/api/attachments/${atc}`;
      if (fileType === "pdf") {
        return (
          <S.Attachement key={ind} onClick={() => setCurrentPDF(filePath)}>
            <PDFPreview file={filePath} />
          </S.Attachement>
        );
      } else {
        return (
          <S.Attachement key={ind}>
            <Image
              src={filePath}
              fill={true}
              alt={atc}
              onClick={() => setCurrentImage(filePath)}
            />
          </S.Attachement>
        );
      }
    });
  };

  return (
    <>
      {renderFileViewer()}
      <DetailsViewer title="Document de licence">
        <DetailSection>
          <DetailHeader title="Détails de la licence" />
          <DetailContent $columns={4}>
            <DetailItem title="vendeur" value={document.seller} />
            <DetailItem title="moudjahid" value={document.moudjahid} />
            <DetailItem
              title="prix"
              value={`${document.price.toLocaleString()}.00 DZD`}
            />
            <DetailItem title="wilaya" value={document.wilaya} />
          </DetailContent>
        </DetailSection>
        <DetailSection>
          <DetailHeader title="Pièces jointes" />
          <DetailContent $columns={1}>
            <S.LicenceAttachments>
              {attachments.length > 0 && renderAttachments()}
            </S.LicenceAttachments>
          </DetailContent>
        </DetailSection>
      </DetailsViewer>
    </>
  );
};

{
  /* <S.AttachmentController>
<div>
  <Icon icon="download" size="2.4rem" />
</div>
<div>
  <Icon icon="delete" size="2.4rem" />
</div>
</S.AttachmentController> */
}

export default LicenceDocument;
