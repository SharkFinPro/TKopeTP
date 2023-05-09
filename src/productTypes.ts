export interface ProductData {
    displayName: string;
    id: number;
    image: string;
    price: number;
    productType: number;
    count?: number;
}

export interface SimplifiedProductData {
    id: number;
    count?: number;
}

export interface ProductType {
    id: number;
    displayName: string;
}