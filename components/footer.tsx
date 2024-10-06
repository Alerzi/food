import React from 'react'
import Link from "next/link"
import "@/css/footer.css"

const footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__inner">
          <span className="footer__link"><Link href="/">Burger.com</Link></span>
          <span className="footer__info">
            <span><Link href="/privacy">Privacy Policy</Link></span>
            <span><Link href="/terms">Terms of Service</Link></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default footer