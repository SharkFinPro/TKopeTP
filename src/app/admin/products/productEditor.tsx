"use client";
import { ProductType, RobustProductData} from "../../../productTypes";
import { useEffect, useRef, useState } from "react";
import editorStyles from "../stylesheets/productEditor.module.css";
import Image from "next/image";

import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { postRequest } from "../../tools/requests";

function ImageEditor({
  defaultImage
}: {
  defaultImage: string
}) {
  const [image, setImage] = useState(defaultImage);
  const [editImage, setEditImage] = useState<string | undefined>(undefined);
  const cropperRef = useRef<CropperRef>(null);
  const [fileName, setFileName] = useState(image);

  function crop(event: any): void {
    if (!cropperRef || !cropperRef.current) {
      return;
    }

    const imageFile = cropperRef.current.getCanvas()?.toDataURL("image/webp", 0.2).substring(23);
    postRequest("/api/images/upload", JSON.stringify({
      imageFile,
      fileName
    })).then(() => {
      setTimeout(() => {
        setEditImage(undefined);
        setImage(fileName);
      }, 500);
    });
  }

  return (
    <div className={`${editorStyles.setting} ${editorStyles.imageSetting}`}>
      <label htmlFor={"image"}>Image</label>
      <input id={"image"} value={fileName} onChange={e => setFileName(e.target.value)}/>
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
          <Image
            src={`/api/images/get/${image}`}
            alt={image || ""}
            width={1920}
            height={1080}/>
          <label htmlFor="imageSelector" className={editorStyles.imageSelector}>Select New</label>
          <input
            type="file"
            id="imageSelector"
            style={{ display: "none" }}
            onChange={(event) => {
              if (!event.currentTarget.files) {
                return;
              }

              setEditImage(URL.createObjectURL(event.currentTarget.files[0]));
              setImage("");
            }}/>
        </>
      }
    </div>
  );
}

export function ProductEditor({
  productData,
  productCategories,
  onClose
}: {
  productData: RobustProductData | undefined | null,
  productCategories: ProductType[],
  onClose: any
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleSubmit(event: any): void {
    event.preventDefault();

    const price = event.target.price.value;
    if (parseInt(price) != price || price < 0) {
      return alert("Invalid Price!");
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: event.target.displayName.value,
        id: productData?.id || -1,
        image: event.target.image.value,
        price: price,
        productType: event.target.productType.value,
        active: event.target.active.value
      })
    };

    if (productData === null) {
      fetch("/api/admin/products/create", requestOptions).then((): void => {
        dialogRef.current?.close();
      });
    } else {
      fetch("/api/admin/products/edit", requestOptions).then((): void => {
        dialogRef.current?.close();
      });
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={editorStyles.editor}
      open={false}>
      <h1 className={editorStyles.header}>{productData?.displayName}</h1>
      <form
        id={"settingsForm"}
        onSubmit={handleSubmit}
        className={editorStyles.settingsForm}>
        <div className={editorStyles.settings}>
          <div className={editorStyles.setting}>
            <label htmlFor={"displayName"}>Display Name</label>
            <input id={"displayName"} defaultValue={productData?.displayName}/>
          </div>
          <div className={editorStyles.setting}>
            <label htmlFor={"id"}>ID</label>
            <input id={"id"} defaultValue={productData?.id} disabled/>
          </div>
          <div className={editorStyles.setting}>
            <label htmlFor={"price"}>Price</label>
            <input id={"price"} defaultValue={productData?.price}/>
          </div>
          <div className={editorStyles.setting}>
            <label htmlFor={"productType"}>Product Type</label>
            <select id={"productType"}
              defaultValue={productData?.productType}>
              {productCategories.map((type: ProductType) => (
                <option
                  value={type.id}
                  key={type.id}>
                  {type.displayName}
                </option>
              ))}
            </select>
          </div>
          <div className={editorStyles.setting}>
            <label htmlFor={"active"}>Active</label>
            <select id={"active"}
              defaultValue={productData?.active ? 1 : 0}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
        </div>
        <ImageEditor defaultImage={productData?.image || ""} />
      </form>
      <div className={editorStyles.formSubmit}>
        <input
          type={"submit"}
          form={"settingsForm"}
          value={"Save"}/>
        <button
          onClick={()=>dialogRef.current?.close()}>Close</button>
      </div>
    </dialog>
  );
}