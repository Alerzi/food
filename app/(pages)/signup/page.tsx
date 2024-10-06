"use client"
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import {burger} from "@/img"
import "./signup.css"
import {UserApi} from "@/services"
import Cookie from "js-cookie"
import {errorsProps} from "@/utils/types"
import {useRouter} from "next/navigation"
import {useDispatch} from "react-redux"
import {setUser} from "@/store/userSlice"

const signup = () => {
  const [errors, setErrors] = React.useState<errorsProps>({ name: "", email: "", password: "", password2: "" });
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [password2, setPassword2] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
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
  const passwordSetTwo = (value: string) => {
    if(!/^[A-Za-z0-9-_?!#$%^&*()+]{8,}$/.test(value)) { setErrors({...errors, password2: "Password"}); }
    else if(password !== value) { setErrors({...errors, password2: "Password mismatch"}); }
    else { setErrors({...errors, password2: "OK"}); setPassword2(value); }
  }
  const nameSet = (value: string) => {
    if(!/^[A-Z]{1}[a-z0-9]{2,}$/.test(value)) { setErrors({...errors, name: "name"}) }
    else { setErrors({...errors, name: "OK"}); setName(value); }
  }

  const submit = () => {
    try {
      if(name.length && password.length && email.length && password2.length) {
        UserApi.register({name, email, password, password2}).then(({data}: any) => {
          if(typeof(data) === "string") {
              console.log(data);
          }
          else {
              Cookie.set("token", data.token, {expires: 30, secure: true, sameSite: "none"});
              Cookie.set("user", data.user, {expires: 30, secure: true, sameSite: "none"});
              Cookie.set("email", data.email, {expires: 30, secure: true, sameSite: "none"});
              Cookie.set("id", data.id, {expires: 30, secure: true, sameSite: "none"});
              Cookie.set("city", data.city, {expires: 30, secure: true, sameSite: "none"});
              Cookie.set("address", data.address, {expires: 30, secure: true, sameSite: "none"});
              dispatch(setUser({name: data.name, email: data.email, id: data.id, token: data.token, city: data.city, address: data.address}));
              if(data.email) {
                setTimeout(() => {
                  router.push("/confirm");
                }, 1000);
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
    <div className="signup">
        <div className="signup__image"><Image src={burger} alt="burger" /></div>
        <div className="signup__title">Sign up</div>
        <div className="signup__input"><input type="name" placeholder="Name" onChange={(event) => nameSet(event.currentTarget.value)} /></div>
        <div className="signup__err">{errors.name === "OK" ? " " : errors.name}</div>
        <div className="signup__input"><input type="email" placeholder="Email" onChange={(event) => emailSet(event.currentTarget.value)} /></div>
        <div className="signup__err">{errors.email === "OK" ? " " : errors.email}</div>
        <div className="signup__input"><input type="password" placeholder="Rassword" onChange={(event) => passwordSet(event.currentTarget.value)} /></div>
        <div className="signup__err">{errors.password === "OK" ? " " : errors.password}</div>
        <div className="signup__input"><input type="password" placeholder="Repeat password" onChange={(event) => passwordSetTwo(event.currentTarget.value)} /></div>
        <div className="signup__err">{errors.password2 === "OK" ? " " : errors.password2}</div>
        <div className="signup__btn"><button onClick={() => submit()}>Continue</button></div>
        <div className="signup__text">Already have an account? <Link href="/login">Log in</Link></div>
    </div>
  )
}

export default signup