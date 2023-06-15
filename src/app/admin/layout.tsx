import React from "react";
import "./stylesheets/superWrapper.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";
import { NavBar } from "./navBar";

export default function Layout({ children }: { children: React.ReactNode}) {
  return <>
    <NavBar />
    <div className={wrapperStyles.content}>
      {children}
    </div>
  </>
}