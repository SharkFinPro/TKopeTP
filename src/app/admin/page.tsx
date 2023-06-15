import wrapperStyles from "./stylesheets/wrapper.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Admin Panel Homepage"
};

export default function Page() {
  return (
    <div className={wrapperStyles.content}>
      <h1 style={{textAlign: "center"}}>Admin Panel</h1>
    </div>
  );
}