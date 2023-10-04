import React from "react";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import wrapperStyles from "../stylesheets/wrapper.module.css";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page"
};

export default function Layout({ children }: {children: React.ReactNode}) {
  return <>
    <header className={wrapperStyles.header}>
      <h1>Checkout</h1>
    </header>
    {children}
    <Footer checkout={true} />
  </>
}