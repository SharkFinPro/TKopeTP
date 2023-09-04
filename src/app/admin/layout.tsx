import { ReactNode } from "react";
import { NavBar } from "./navBar";
import "./stylesheets/global.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";

export default function Layout({
  children
}: {
  children: ReactNode
}) {
  return <>
    <NavBar />
    <div className={wrapperStyles.content}>
      {children}
    </div>
  </>
}