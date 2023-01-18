"use client";
import { Component } from "react";
import cart from "./tools/cart.js";

const getData = async (path) => {
    let products = await fetch(path);

    return products.json();
};

export default class extends Component {
    async componentDidMount() {
        /* Load Cart */
        cart.load();

        /* Validate Session */
        const serverSession = await getData("/api/sessionID");

        if (parseInt(localStorage.getItem("sessionID")) !== serverSession) {
            localStorage.setItem("sessionID", serverSession);

            // Get ID to identify self to server
            let mySessionID = await getData("/api/createSession");
            localStorage.setItem("mySessionID", mySessionID);

            // Reset Cart
            cart.reset();
        }
    }

    render() {
        return (
            <html lang="en">
                <head />
                <body>
                    <div className="header">
                        <h1>T'Kope Kwiskwis<br/>Trading Post</h1>
                    </div>
                    {this.props.children}
                </body>
            </html>
        )
    }
}
