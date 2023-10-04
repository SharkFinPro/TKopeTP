import { ReactNode } from "react";
import "./global.css";
import wrapperStyles from "./wrapper.module.css";

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