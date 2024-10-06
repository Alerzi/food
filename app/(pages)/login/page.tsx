"use client"
import React from 'react'
import "./login.css"
import Link from "next/link"
import Image from "next/image"
import {burger} from "@/img"
import { errorsProps } from '@/utils/types'
import Cookie from "js-cookie"
import {UserApi} from "@/services"
import {useRouter} from "next/navigation"
import {useDispatch} from "react-redux"
import {setUser} from "@/store/userSlice"

const login = () => {
  const [errors, setErrors] = React.useState<errorsProps>({email: "", password: ""});
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();

  const emailSet = (value: string) => {
    if(!/^[A-Za-z-0-9\-_[\]()!;:&^%$#?]+@[a-z]{2,6}\.[a-z]{2,6}$/.test(value)) { setErrors({...errors, email: "email"}); }
    else { setErrors({...errors, email: "OK"}); setEmail(value); }
  }
  const passwordSet = (value: string) => {
    if(!/^[A-Za-z0-9-_?!#$%^&*()+]{8,}$/.test(value)) { setErrors({...errors, password: "password"}); }
    else { setErrors({...errors, password: "OK"}); setPassword(value); }
  }

  const submit = () => {
    try {
      if(password.length && email.length) {
        UserApi.login({email, password, token: ""}).then(({data}: any) => {
          if(typeof(data) === "string") {
              alert(data);
          }
          else {
              Cookie.set("token", data.token, {expires: 30, secure: true, sameSite: "none"});
              Cookie.set("user", data.user, {expires: 30, secure: true, sameSite: "none"});
              Cookie.set("email", data.email, {expires: 30, secure: true, sameSite: "none"});
              Cookie.set("id", data.id, {expires: 30, secure: true, sameSite: "none"});
              dispatch(setUser({name: data.name, email: data.email, id: data.id, token: data.token}));
              if(data.email) {
                router.push("/");
              }
          }
        })
      }
      else {
        alert("Enter all information.");
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="login">
        <div className="login__image"><Image src={burger} alt="burger" /></div>
        <div className="login__title">Log in</div>
        <div className="login__input"><input type="Email" onChange={(event) => {emailSet(event.currentTarget.value)}} /></div>
        <div className="login__err">{errors.email === "OK" ? " " : errors.email}</div>
        <div className="login__input"><input type="Password" onChange={(event) => {passwordSet(event.currentTarget.value)}} /></div>
        <div className="login__err">{errors.password === "OK" ? " " : errors.password}</div>
        <div className="login__btn"><button onClick={() => submit()}>Continue</button></div>
        <div className="login__text">Don`t have an account? <Link href="/signup">Sign up</Link></div>
    </div>
  )
}

export default login