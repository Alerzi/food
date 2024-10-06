"use client"
import React from 'react'
import Image from "next/image" 
import {burger} from "@/img"
import "./confirm.css"

const confirm = () => {
  return (
    <div className="confirm">
        <div className="confirm__img"><Image src={burger} alt="burger" /></div>
        <div className="confirm__text">Activation link has been send to your email.</div>
    </div>
  )
}

export default confirm