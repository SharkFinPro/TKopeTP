import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Reports",
    description: "Admin Panel Reports"
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>
        {children}
    </>;
}