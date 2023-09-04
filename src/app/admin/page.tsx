import { Metadata } from "next";
import wrapperStyles from "./stylesheets/wrapper.module.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Admin Panel Homepage"
};

export default function Page() {
  return (
    <div className={wrapperStyles.content}>
      <h1 style={{
        textAlign: "center",
        paddingTop: "1em"
      }}>Admin Panel</h1>
    </div>
  );
}