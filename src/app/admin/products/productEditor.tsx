"use client";
import { ProductType, RobustProductData} from "../../../productTypes";
import { useEffect, useRef, useState } from "react";
import editorStyles from "../stylesheets/productEditor.module.css";
import { getRequest } from "../../tools/requests";

export function ProductEditor({ productData, setCurrentProduct }: { productData: RobustProductData | undefined, setCurrentProduct: any }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [selectedProductType, selectProductType] = useState(0);
  const [selectedActiveMode, selectActiveMode] = useState(0);

  useEffect((): void => {
    getRequest("/api/productCategories").then((types: ProductType[]) => setProductTypes(types));
  }, []);

  useEffect((): void => {
    if (!dialogRef || !dialogRef.current) {
      return;
    }

    if (!productData && dialogRef.current.open) {
      dialogRef.current.close();
    }

    if (productData && !dialogRef.current.open) {
      formRef.current?.reset();
      selectProductType(productData?.productType);
      selectActiveMode(productData?.active ? 1 : 0);
      dialogRef.current.showModal();

      dialogRef.current?.addEventListener("close", (event: Event): void => {
        setCurrentProduct(undefined);
      });
    }
  }, [productData]);

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
        id: productData?.id,
        image: event.target.image.value,
        price: event.target.price.value,
        productType: event.target.productType.value,
        active: event.target.active.value
      })
    };
    fetch("/api/admin/products/edit", requestOptions).then((): void => {
      dialogRef.current?.close();
    });
  }

  return (
    <dialog ref={dialogRef} className={editorStyles.modal} open={false}>
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
            onChange={(e) => selectProductType(parseInt(e.target.value))}>
            {productTypes.map((type: ProductType) => (
              <option value={type.id} key={type.id}>{type.displayName}</option>
            ))}
          </select>
        </div>
        <div className={editorStyles.setting}>
          <label htmlFor={"active"}>Active</label>
          <select id={"active"}
            value={selectedActiveMode}
            onChange={(e) => selectActiveMode(parseInt(e.target.value))}>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
      </form>
      <footer>
        <button onClick={()=>dialogRef.current?.close()}>Quit</button>
        <input type={"submit"} form={"settingsForm"}/>
      </footer>
    </dialog>
  );
}