import { ReactNode } from "react";
import "./stylesheets/global.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";

export default function WebAppLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className={wrapperStyles.wrapper}>
      {children}
    </div>
  );
}