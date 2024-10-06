"use client"
import Link from 'next/link'
import react from 'react'
import {headerProps, userProps} from "@/utils/types"
import Image from "next/image"
import {menu, user as userImg} from "@/icons"
import "@/css/header.css"
import Cookie from "js-cookie"
import { useClickOutside } from '@/utils/useClickOutside'
import {useDispatch, useSelector} from "react-redux"
import {setUser} from "@/store/userSlice"
import {RootState} from "@/store/store"

const header = ({mobileNavSet}: headerProps) => {
  const [user, setCurrentUser] = react.useState<userProps>({name: "", email: "", id: "", token: ""});
  const [profile, setProfile] = react.useState<boolean>(false);
  const menuRef = react.useRef(null);
  const spanRef = react.useRef(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.user);

  react.useEffect(() => {
    if(Cookie.get("user")) {
      setCurrentUser({name: Cookie.get("user"), email: Cookie.get("email"), id: Cookie.get("id"), token: Cookie.get("token")});
      dispatch(setUser({name: Cookie.get("user"), email: Cookie.get("email"), id: Cookie.get("id"), token: Cookie.get("token")}));
    }
    if(!Cookie.get("user")) {
      setCurrentUser({name: "", email: "", id: "", token: ""});
    }
  }, [currentUser.name]);

  const logout = () => {
    Cookie.remove("email"); 
    Cookie.remove("user"); 
    Cookie.remove("id"); 
    Cookie.remove("token");
    dispatch(setUser({name: "", email: "", id: "", token: ""}));
    setCurrentUser({name: "", email: "", id: "", token: ""});
    setProfile(false);
  }

  useClickOutside(menuRef, spanRef, () => { // учитывается само меню и кнопка, которая его закрывает
    setProfile(false);
  })

  return (
    <div className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="header__title" href="/">Burger.com</Link>
          {
            user.email ? (
              <div className="header__reg">
                <Image className="header__avatar" src={userImg} alt="user" />
                <span className="header__span" onClick={() => setProfile(!profile)} ref={spanRef}>{user.email}</span>
                {
                  profile && 
                  <div className="header__profile" ref={menuRef}>
                    <Link href="/user-profile" className="header__profile-link" onClick={() => setProfile(false)}>User Profile</Link>
                    <button className="header__button" onClick={() => logout()}>Log Out</button>
                  </div>
                }
              </div>
            ) : 
            (
              <div>
                <Link className="header__btn" href="/login">Log in</Link>
                <Image className="header__menu" src={menu} alt="menu" onClick={() => mobileNavSet()}/>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default header 
