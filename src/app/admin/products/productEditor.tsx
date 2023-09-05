"use client";
import { ProductType, RobustProductData} from "../../../productTypes";
import { useEffect, useRef, useState } from "react";
import editorStyles from "../stylesheets/productEditor.module.css";

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
  const formRef = useRef<HTMLFormElement | null>(null);
  const [selectedProductType, setSelectedProductType] = useState(productData?.productType);
  const [selectedActiveMode, setSelectedActiveMode] = useState(productData?.active ? 1 : 0);

  useEffect(() => {
    dialogRef.current?.showModal()
  }, []);

  function handleSubmit(event: any): void {
    event.preventDefault();

    if (parseInt(event.target.price.value) != event.target.price.value) {
      return console.log("Invalid Price!");
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: event.target.displayName.value,
        id: productData?.id || -1,
        image: event.target.image.value,
        price: event.target.price.value,
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
      className={editorStyles.modal}
      open={false}
    >
      <header>
        <h1>{productData?.displayName}</h1>
      </header>
      <form id={"settingsForm"} className={editorStyles.settings} ref={formRef} onSubmit={handleSubmit}>
        <div className={editorStyles.setting}>
          <label htmlFor={"displayName"}>Display Name</label>
          <input id={"displayName"} defaultValue={productData?.displayName}/>
        </div>
        <div className={editorStyles.setting}>
          <label htmlFor={"id"}>ID</label>
          <input id={"id"} defaultValue={productData?.id} disabled/>
        </div>
        <div className={editorStyles.setting}>
          <label htmlFor={"image"}>Image</label>
          <input id={"image"} defaultValue={productData?.image}/>
        </div>
        <div className={editorStyles.setting}>
          <label htmlFor={"price"}>Price</label>
          <input id={"price"} defaultValue={productData?.price}/>
        </div>
        <div className={editorStyles.setting}>
          <label htmlFor={"productType"}>Product Type</label>
          <select id={"productType"}
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(parseInt(e.target.value))}>
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
            value={selectedActiveMode}
            onChange={(e) => setSelectedActiveMode(parseInt(e.target.value))}>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
      </form>
      <footer>
        <input type={"submit"} form={"settingsForm"} value={"Submit"}/>
        <button onClick={()=>dialogRef.current?.close()}>Quit</button>
      </footer>
    </dialog>
  );
}