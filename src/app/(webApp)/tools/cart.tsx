import { postRequest } from "../../tools/requests";
import { ProductData, SimplifiedProductData } from "../../../productTypes";

class Cart {
    data: ProductData[] = [];

    constructor() {
        if (typeof window === "undefined") {
            return;
        }

        this.data = this.getStorage();
        if (this.data.length === 0) {
            this.reset();
        }
    }

    reset(): void {
        this.data = [];
        this.updateStorage();
        this.setPaymentMethod("");
    }

    getStorage(): ProductData[] {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    }

    updateStorage(): void {
        localStorage.setItem("cart", JSON.stringify(this.data));
    }

    setPaymentMethod(paymentMethod: string): void {
        localStorage.setItem("paymentMethod", paymentMethod);
    }

    getPaymentMethod(): string {
        return localStorage.getItem("paymentMethod") || "";
    }

    createListing(productData: ProductData): void {
        if (!this.data.find((product: ProductData): boolean => product.id === productData.id)) {
            productData.count = 0;
            this.data.push(productData);
        }

        this.updateStorage();
    }

    remove(productId: number): boolean {
        const product: ProductData | undefined = this.data.find((product: ProductData): boolean => product.id === productId);

        if (!product || !product.count)
            return false;

        if (product.count > 0) {
            const cartValue: ProductData | undefined = this.data.at(this.data.indexOf(product));
            if (!cartValue || !cartValue.count)
                return false;

            cartValue.count--;
            this.updateStorage();
            return true;
        }

        return false;
    }

    add(productId: number): void {
        const product: ProductData | undefined = this.data.find((product: ProductData): boolean => product.id === productId);
        if (!product || typeof product.count === "undefined")
            return;

        const cartValue: ProductData | undefined = this.data.at(this.data.indexOf(product));
        if (!cartValue || typeof cartValue.count === "undefined")
            return;

        cartValue.count++;
        this.updateStorage();
    }

    getCount(productId: number): number {
        const product: ProductData | undefined = this.data.find((product: ProductData): boolean => product.id === productId);
        if (!product || typeof product.count === "undefined")
            return 0;

        const cartValue: ProductData | undefined = this.data.at(this.data.indexOf(product));
        if (!cartValue || typeof cartValue.count === "undefined")
            return 0;

        return cartValue.count;
    }

    getTotalPrice(): number {
        let total: number = 0;

        for (let product of this.data) {
            if (!product.count) {
                continue;
            }

            total += product.count * product.price;
        }

        return total;
    }

    getActual(): ProductData[] {
        let cart: ProductData[] = [];
        for (let product of this.data) {
            if (product.count) {
                cart.push(product);
            }
        }

        return cart;
    }

    async purchase() {
        const cart: ProductData[] = this.getActual();
        const simplifiedCart: SimplifiedProductData[] = [];

        for (let product of cart) {
            simplifiedCart.push({ id: product.id, count: product.count });
        }

        await postRequest("/api/purchase", JSON.stringify({
            cart: JSON.stringify(simplifiedCart),
            paymentMethod: this.getPaymentMethod(),
            time: new Date().toJSON()
        }));

        this.reset();
    }
}

export const cart: Cart = new Cart();