"use client"
import { usePathname } from "next/navigation";
import MainFooter from "./MainFooter";
import DefaultFooter from "./DefaultFooter";

const Footer = () => {
    const pathname = usePathname();

    const isMainPage = pathname === "/" || pathname === "/en" || pathname === "/ru" || pathname === "/tk"; // локализованные пути

    return isMainPage ? <MainFooter /> : <DefaultFooter />;
};

export default Footer;
