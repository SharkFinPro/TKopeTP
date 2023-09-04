import React from "react";
import "./stylesheets/global.css";
import wrapperStyles from "./stylesheets/wrapper.module.css";

export default function WebAppLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className={wrapperStyles.wrapper}>
      <div className={wrapperStyles.container}>
        {children}
      </div>
    </div>
  );
}