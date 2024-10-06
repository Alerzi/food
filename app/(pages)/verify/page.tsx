"use client"
import React from 'react'
import Image from "next/image" 
import {burger} from "@/img"
import {useRouter} from "next/navigation"
import "./verify.css"

const verify = () => {
    const router = useRouter();
    setTimeout(() => {
        router.push("/");
    }, 2000);

  return (
    <div className="ver">
        <div className="ver__img"><Image src={burger} alt="burger" /></div>
        <div className="ver__text">Your email was successfuly confirmed!</div>
    </div>
  )
}

export default verify