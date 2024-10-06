import localFont from "next/font/local";
import {Mulish} from "next/font/google";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--geistsans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--geistmono",
    weight: "100 900",
});
const DMsans = localFont({
    src: "../fonts/DMSans-Regular.ttf",
    variable: "--dmsans",
    weight: "400",
});
const mul = Mulish({
    subsets: ["latin"],
    variable: "--mulish",
    weight: ["800"],
})

export const dmsans = DMsans.variable;
export const mulish = mul.variable;
export const geistmono = geistMono.variable;
export const geistsans = geistSans.variable;