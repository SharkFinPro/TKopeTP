import { postRequest } from "../../tools/requests";

export interface ProductData {
    displayName: string;
    id: number;
    image: string;
    price: number;
    productType: number;
    count?: number;
}

interface SimplifiedProductData {
    id: number;
    count?: number;
}

class Cart {
    cart: ProductData[] = [];

    constructor() {
        if (typeof window === "undefined") {
            return;
        }

        this.cart = this.getStorage();
        if (this.cart.length === 0) {
            this.reset();
        }
    }

    reset(): void {
        this.cart = [];
        this.updateStorage();
        this.setPaymentMethod("");
    }

    getStorage(): ProductData[] {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    }

    updateStorage(): void {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    setPaymentMethod(paymentMethod: string): void {
        localStorage.setItem("paymentMethod", paymentMethod);
    }

    getPaymentMethod() {
        return localStorage.getItem("paymentMethod");
    }

    createListing(productData: ProductData): void {
        if (!this.cart.find((product: ProductData): boolean => product.id === productData.id)) {
            productData.count = 0;
            this.cart.push(productData);
        }

        this.updateStorage();
    }

    remove(productId: number): boolean {
        const product: ProductData | undefined = this.cart.find((product: ProductData): boolean => product.id === productId);

        if (!product || !product.count)
            return false;

        if (product.count > 0) {
            const cartValue: ProductData | undefined = this.cart.at(this.cart.indexOf(product));
            if (!cartValue || !cartValue.count)
                return false;

            cartValue.count--;
            this.updateStorage();
            return true;
        }

        return false;
    }

    add(productId: number): void {
        const product: ProductData | undefined = this.cart.find((product: ProductData): boolean => product.id === productId);
        if (!product || typeof product.count === "undefined")
            return;

        const cartValue: ProductData | undefined = this.cart.at(this.cart.indexOf(product));
        if (!cartValue || typeof cartValue.count === "undefined")
            return;

        cartValue.count++;
        this.updateStorage();
    }

    getCount(productId: number): number {
        const product: ProductData | undefined = this.cart.find((product: ProductData): boolean => product.id === productId);
        if (!product || typeof product.count === "undefined")
            return 0;

        const cartValue: ProductData | undefined = this.cart.at(this.cart.indexOf(product));
        if (!cartValue || typeof cartValue.count === "undefined")
            return 0;

        return cartValue.count;
    }

    getTotalPrice(): number {
        let total: number = 0;

        for (let product of this.cart) {
            if (!product.count) {
                continue;
            }

            total += product.count * product.price;
        }

        return total;
    }

    getActual(): ProductData[] {
        let cart: ProductData[] = [];
        for (let product of this.cart) {
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