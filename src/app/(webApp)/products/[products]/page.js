"use client";
import { Component } from "react";
import Product from "./product";
import Footer from "../../footer";

import "../../stylesheets/wrapper.css";
import "../../stylesheets/products.css";

const getProducts = async (type) => {
    let products = await fetch(`/api/products/${type}`);

    return products.json();
};

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: {}
        }
    }

    componentDidMount() {
        getProducts(this.props.params.products).then((products) => {
            this.setState({
                products: products
            })
        });
    }

    render() {
        return <>
            <div className="content">
                <div className="products">
                    {Object.keys(this.state.products).map((product) => (
                        <Product key={product} productData={this.state.products[product]} />
                    ))}
                </div>
            </div>
            <Footer />
        </>;
    }
}