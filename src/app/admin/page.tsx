import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Admin Panel Homepage"
};

export default function Page() {
  return (
    <h1 style={{
      textAlign: "center",
      paddingTop: "1em"
    }}>Admin Panel</h1>
  );
}