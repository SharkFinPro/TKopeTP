"use client";
import { Component } from "react";
import Product from "./product.js";
import validateSession from "../../tools/validateSession.js";
import { getRequest } from "../../../tools/requests.js";
import wrapperStyles from "../../stylesheets/wrapper.module.css";
import productsStyles from "../../stylesheets/products.module.css";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: {}
        };
    }

    componentDidMount() {
        validateSession().then(() => {
            getRequest("/api/products/" + this.props.params.products).then((products) => {
                this.setState({ products });
            });
        });
    }

    render() {
        return (
            <div className={wrapperStyles.content}>
                <div className={productsStyles.products}>
                    {Object.keys(this.state.products).map((product) => (
                        <Product key={product} productData={this.state.products[product]} />
                    ))}
                </div>
            </div>
        );
    }
}