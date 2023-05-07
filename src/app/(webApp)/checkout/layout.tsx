import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Checkout page"
};

export default function Layout({ children }: {children: React.ReactNode}) {
    return <>
        {children}
    </>
}