import { Component } from "react";
import Image from "next/image";

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // count: cart.getCount(this.props.product)
            count: 0
        };
    }

    subFromCart(product) {
        // cart.remove(product);

        this.setState({
            // count: cart.getCount(this.props.product)
            count: this.state.count - 1
        });
    }

    addToCart(product) {
        // cart.add(product);

        this.setState({
            // count: cart.getCount(this.props.product)
            count: this.state.count + 1
        });
    }

    render() {
        return (
            <div className="product">
                <div className="image">
                    {/*<img alt="product image" src={this.props.productData.image}></img>*/}
                    <Image
                        src={"/images/" + this.props.productData.image}
                        width={500}
                        height={288}
                        alt="Product Image"
                    />
                </div>
                <div className="name">
                    <p>{this.props.productData.displayName} - ${this.props.productData.price}</p>
                </div>
                <div className="purchase">
                    <button className="purchaseThird option left" onClick={() => this.subFromCart(this.props.productData.id)}>-</button>
                    <div className="purchaseThird display">
                        <p id={this.props.productData.id}>{this.state.count}</p>
                    </div>
                    <button className="purchaseThird option right" onClick={() => this.addToCart(this.props.productData.id)}>+</button>
                </div>
            </div>
        );
    }
}