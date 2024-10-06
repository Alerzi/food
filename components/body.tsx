"use client"
import React from 'react'
import { Footer, Header, MobileNav } from "@/components";
import react from "react"
import {mulish, dmsans, geistsans, geistmono} from "@/utils/fonts"
import {Provider} from "react-redux";
import {store} from "@/store/store"

const body = ({page}: any) => {
    const [mobileNav, setMobileNav] = react.useState<boolean>(false);
    const mobileNavSet = () => {
        setMobileNav(!mobileNav);
    }
    const mobileNavClose = () => {
        setMobileNav(false);
    }
    return (
        <div style={{position: "relative", height: "100%", display: "flex", flexDirection: "column"}} className={`${mulish} ${dmsans} ${geistsans} ${geistmono}`}>
            <Provider store={store}>
                <Header mobileNavSet={mobileNavSet} />
                <MobileNav mobileNav={mobileNav} mobileNavClose={mobileNavClose}/>
                <div style={{flexGrow: 1}}>
                    {page}
                </div>
                <Footer />
            </Provider>
        </div>
    )
}

export default body