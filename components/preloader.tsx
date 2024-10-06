import React from 'react'
import "@/css/preloader.css"
import {preloaderProps} from "@/utils/types"

const preloader = ({width, height, left, top}: preloaderProps) => {
  return (
    <div className="preloader" style={{width: width, height: height, left: left, top: top}}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default preloader