"use client";
import { Component } from "react";
import Product from "./product.js";
import Footer from "../../footer.js";
import getData from "../../tools/getData.js";

import wrapperStyles from "../../stylesheets/wrapper.module.css";
import productsStyles from "../../stylesheets/products.module.css";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: {}
        }
    }

    componentDidMount() {
        getData("/api/products/" + this.props.params.products).then((products) => {
            this.setState({
                products: products
            })
        });
    }

    render() {
        return <>
            <div className={wrapperStyles.content}>
                <div className={productsStyles.products}>
                    {Object.keys(this.state.products).map((product) => (
                        <Product key={product} productData={this.state.products[product]} />
                    ))}
                </div>
            </div>
            <Footer />
        </>;
    }
}