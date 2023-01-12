"use client";
import { useState } from "react";
import Product from "./product";
import "../../stylesheets/products.css";

const getProducts = async (type) => {
    let products = await fetch(`/api/products/${type}`);

    return products.json();
};

export default ({ params, searchParams }) => {
    const [products, setProducts] = useState({});

    getProducts(params.products).then((products) => {
        setProducts(products);
    });

    return (
        <div className="content">
            <div className="products">
                {Object.keys(products).map((product) => (
                    <Product productData={products[product]} />
                ))}
            </div>
        </div>
    );
};