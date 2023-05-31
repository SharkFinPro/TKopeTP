"use client";
import indexStyles from "./stylesheets/index.module.css";
import { ProductType } from "../../productTypes";
import Link from "next/link";
import {useEffect, useState} from "react";

async function loadCategories(): Promise<ProductType[]> {
    const res: Response = await fetch("/api/productCategories");
    return await res.json();
}

export function Categories() {
    const [categories, setCategories] = useState<ProductType[]>([]);

    useEffect((): void => {
        loadCategories().then((types: ProductType[]) => setCategories(types));
    }, [])

    return (
        <div className={indexStyles.categories}>
            {categories.map(({ id, displayName }: ProductType) => <Link key={id} href={`products/${id}`}>{displayName}</Link>)}
        </div>
    );
}