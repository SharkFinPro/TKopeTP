"use client";
import { Component } from "react";
import cart from "./tools/cart.js";
import getData from "./tools/getData.js";

import wrapperStyles from "./stylesheets/wrapper.module.css";
import "./stylesheets/superWrapper.css";

export default class extends Component {
    async componentDidMount() {
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
                    <div className={wrapperStyles.header}>
                        <h1>T'Kope Kwiskwis<br/>Trading Post</h1>
                    </div>
                    {this.props.children}
                </body>
            </html>
        )
    }
}
