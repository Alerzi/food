"use client"
import react from "react"
import {main, burger, order} from "@/img"
import {google, app, search} from "@/icons"
import Image from "next/image"
import "./page.css"

export default function Home() {

  return (
    <div>
      <div className="home__img">
        <div className="container">
          <Image src={main} alt="main" />
          <Image src={burger} alt="burger" />
        </div>
      </div>
      <div className="container">
        <div className="home__block">
          <div className="home__block-title">Tuck into a takeway today</div>
          <div className="home__block-text">Food is just a click away!</div>
          <div className="home__block-search">
            <div className="home__block-input">
              <Image src={search} alt="search" />
              <input type="text" placeholder="Text" />
              <button>Search</button>
            </div>
          </div>
        </div>
        <div className="home__order">
          <div className="home__order-img">
            <Image src={order} alt="order" />
          </div>
          <div>
            <h1>Order takeaway even faster!</h1>
            <p>Download the MemEats App for faster ordering and personalised recommendations</p>
            <div className="home__order-store">
              <button><Image src={google} alt="google" /></button>
              <button><Image src={app} alt="app" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
