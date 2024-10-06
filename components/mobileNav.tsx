"use client"
import Image from "next/image"
import "@/css/mobileNav.css"
import {mobileNavProps} from "@/utils/types"
import {useSelector, useDispatch} from "react-redux"
import {RootState} from "@/store/store"
import {useRouter} from "next/navigation"
import {user as userImg, close} from "@/icons"
import Link from "next/link"
import Cookie from "js-cookie"
import {setUser} from "@/store/userSlice"

const mobileNav = ({mobileNav, mobileNavClose}: mobileNavProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const login = () => {
    router.push("/login");
    mobileNavClose();
  }
  const logout = () => {
    Cookie.remove("email"); 
    Cookie.remove("user"); 
    Cookie.remove("id"); 
    Cookie.remove("token");
    dispatch(setUser({name: "", email: "", id: "", token: ""}));
    mobileNavClose();
  }
  return (
    <div className={`${mobileNav ? "" : "mobileNav__hide"} mobileNav`}>
      <div className="mobileNav__title">
        {
          user.name ? (<div className="mobileNav__inner"><Image src={userImg} alt="user" /><span>{user.email}</span></div>) 
          : ("Welcome to Burger.com!")
        }
      </div>
      { !user.name && <button className="mobileNav__btn" onClick={() => login()}>Log In</button> }
      { 
        user.name && 
        <div className="mobileNav__profile">
          <Link href="/user-profile">User profile</Link>
          <button onClick={() => logout()}>Log out</button>
        </div> 
      }
      <button className="mobileNav__close" onClick={() => mobileNavClose()}><Image src={close} alt="close" /></button>
    </div>
  )
}

export default mobileNav