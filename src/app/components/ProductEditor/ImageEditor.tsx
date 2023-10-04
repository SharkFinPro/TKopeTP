import { useRef, useState } from "react";
import { Coordinates, Cropper, CropperRef } from "react-advanced-cropper";
import { postRequest } from "../../tools/requests";
import editorStyles from "./ProductEditor.module.css";

export default function ImageEditor({
 defaultImage
}: {
  defaultImage: string
}) {
  const [image, setImage] = useState(defaultImage);
  const [editImage, setEditImage] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState(image);
  const cropperRef = useRef<CropperRef>(null);

  function crop(): void {
    if (!fileName) {
      alert("Please name your image!");
      return;
    }

    if (!cropperRef || !cropperRef.current) {
      return;
    }

    const coordinates: Coordinates | null = cropperRef.current.getCoordinates();
    if (!coordinates?.width) {
      return;
    }

    const qualityModifier = 100 / coordinates?.width * 320;
    const imageFile = cropperRef.current.getCanvas()?.toDataURL("image/webp", qualityModifier).substring(23);

    postRequest("/api/images/upload", JSON.stringify({
      imageFile,
      fileName
    })).then(async (res: Response): Promise<void> => {
      const newFileName = await res.json();

      setTimeout((): void => {
        setEditImage(undefined);
        setImage(newFileName.fileName);
      }, 1000);
    });
  }

  return (
    <div className={`${editorStyles.setting} ${editorStyles.imageSetting}`}>
      <label htmlFor={"image"}>Image</label>
      <input
        id={"image"}
        value={fileName}
        disabled={!editImage}
        onChange={e => {
          if (e.target.value.endsWith(".")) {
            return;
          }

          setFileName(e.target.value);
        }}/>
      {
        editImage ? <>
          <Cropper
            src={editImage}
            stencilProps={{
              aspectRatio: 16 / 9,
              grid: true
            }}
            className={editorStyles.cropper}
            ref={cropperRef}/>
          <label htmlFor={"imageConfirmer"} className={editorStyles.imageSelector}>Confirm</label>
          <input
            type={"button"}
            id="imageConfirmer"
            style={{ display: "none" }}
            onClick={crop}/>
        </> : <>
          <img
            src={`/api/images/get/${image}`}
            alt={image || ""}/>
          <label htmlFor="imageSelector" className={editorStyles.imageSelector}>Upload New</label>
          <input
            type="file"
            id="imageSelector"
            accept={"image/*"}
            style={{ display: "none" }}
            onChange={(event) => {
              if (!event.currentTarget.files) {
                return;
              }

              setEditImage(URL.createObjectURL(event.currentTarget.files[0]));
              setImage("");
              setFileName("");
            }}/>
        </>
      }
    </div>
  );
}