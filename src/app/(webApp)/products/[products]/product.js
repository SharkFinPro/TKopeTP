import { Component } from "react";
import Image from "next/image";
import cart from "../../tools/cart.js";

import productsStyles from "../../stylesheets/products.module.css";

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        cart.createListing(this.props.productData);
        this.updateCount();
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
                    <img alt="product image" src={"/images/" + this.props.productData.image}></img>
                    {/*<Image*/}
                    {/*    src={"/images/" + this.props.productData.image}*/}
                    {/*    width={500}*/}
                    {/*    height={288}*/}
                    {/*    alt="Product Image"*/}
                    {/*/>*/}
                </div>
                <div className={productsStyles.name}>
                    <p>{this.props.productData.displayName} - ${this.props.productData.price}</p>
                </div>
                <div className={productsStyles.purchase}>
                    <button className={`${productsStyles.purchaseThird} ${productsStyles.option} ${productsStyles.left}`} type="button" onClick={() => this.subFromCart(this.props.productData.id)}>-</button>
                    <div className={`${productsStyles.purchaseThird} ${productsStyles.display}`}>
                        <p id={this.props.productData.id}>{this.state.count}</p>
                    </div>
                    <button className={`${productsStyles.purchaseThird} ${productsStyles.option} ${productsStyles.right}`} type="button" onClick={() => this.addToCart(this.props.productData.id)}>+</button>
                </div>
            </div>
        );
    }
}