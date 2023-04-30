"use client";
import { Component } from "react";
import Image from "next/image";
import cart from "../../tools/cart.js";
import productsStyles from "../../stylesheets/products.module.css";
import loadingImage from "../../../../../public/images/NOT_FOUND.png";

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            imageData: ""
        };
    }

    componentDidMount() {
        cart.createListing(this.props.productData);
        this.updateCount();

        import("../../../../../public/images/" + (this.props.productData.image || "NOT_FOUND.png")).then((imageData) => {
            this.setState({ imageData });
        });
    }

    updateCount() {
        this.setState({
            count: cart.getCount(this.props.productData.id)
        });
    }

    subFromCart(product) {
        cart.remove(product);
        this.updateCount();
    }

    addToCart(product) {
        cart.add(product);
        this.updateCount();
    }

    render() {
        return (
            <div className={productsStyles.product}>
                <div className={productsStyles.image}>
                    <Image
                        src={this.state.imageData || loadingImage}
                        alt="Product Image"
                    />
                </div>
                <p className={productsStyles.name}>{this.props.productData.displayName} - ${this.props.productData.price}</p>
                <div className={productsStyles.purchase}>
                    <button className={`${productsStyles.purchaseThird} ${productsStyles.option} ${productsStyles.left}`} type="button" onClick={() => this.subFromCart(this.props.productData.id)}>-</button>
                    <p className={`${productsStyles.purchaseThird} ${productsStyles.display}`} id={this.props.productData.id}>{this.state.count}</p>
                    <button className={`${productsStyles.purchaseThird} ${productsStyles.option} ${productsStyles.right}`} type="button" onClick={() => this.addToCart(this.props.productData.id)}>+</button>
                </div>
            </div>
        );
    }
}