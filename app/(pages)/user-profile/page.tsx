"use client"
import React from 'react'
import "./user-profile.css"
import {errorsProps} from "@/utils/types"
import Cookie from "js-cookie"
import { useDispatch } from 'react-redux'
import {setUser} from "@/store/userSlice"
import {UserApi} from "@/services"
import {Preloader} from "@/components"

let header = { headers: { "authorization": `${Cookie.get("token")}` } };
let token = Cookie.get("token");

const userProfile = () => {
    const [errors, setErrors] = React.useState<errorsProps>({ name: "", email: "", city: "", address: "" });
    const [email, setEmail] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [city, setCity] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const userId = Cookie.get("id");

    React.useEffect(() => {
      if(userId && token) {
        UserApi.getUser(userId, header).then(({data}: any) => {
          if(typeof(data) === "string") {
              console.log(data);
          }
          else {
              setEmail(data.email);
              setName(data.name);
              if(data.city) {
                setCity(data.city);
              }
              if(data.address) {
                setAddress(data.address);
              }
          }
        })
      }
    }, []);

    const emailSet = (value: string) => {
        if(!value) { setEmail(""); }
        if(!/^[A-Za-z-0-9\-_[\]()!;:&^%$#?]+@[a-z]{2,6}\.[a-z]{2,6}$/.test(value)) { setErrors({...errors, email: "email"}); }
        else { setErrors({...errors, email: "OK"}); setEmail(value); }
    }
    const addressSet = (value: string) => {
        if(!value) { setAddress(""); }
        if(!/^[A-Za-z0-9-_?!#$%^&,.*()+]{6,}$/.test(value)) { setErrors({...errors, address: "address"}); }
        else { setErrors({...errors, address: "OK"}); setAddress(value); }
    }
    const citySet = (value: string) => {
        if(!value) { setCity(""); }
        if(!/^[A-Za-z0-9-_?!#$%^&,.*()+]{2,}$/.test(value)) { setErrors({...errors, city: "city"}); }
        else { setErrors({...errors, city: "OK"}); setCity(value); }
    }
    const nameSet = (value: string) => {
        if(!value) { setName(""); }
        if(!/^[A-Z]{1}[a-z0-9]{2,}$/.test(value)) { setErrors({...errors, name: "name"}) }
        else { setErrors({...errors, name: "OK"}); setName(value); }
    }

    const submit = () => {
        setLoading(true);
        try {
            if(name.length && city.length && email.length && address.length, userId) {
              UserApi.update({name, email, city, address, userId, header}).then(({data}: any) => {
                if(typeof(data) === "string") {
                    setLoading(false);
                    console.log(data);
                }
                else {
                    Cookie.set("user", data.name, {expires: 30, secure: true, sameSite: "none"});
                    Cookie.set("email", data.email, {expires: 30, secure: true, sameSite: "none"});
                    Cookie.set("id", data.id, {expires: 30, secure: true, sameSite: "none"});
                    Cookie.set("address", data.address, {expires: 30, secure: true, sameSite: "none"});
                    Cookie.set("city", data.city, {expires: 30, secure: true, sameSite: "none"});
                    dispatch(setUser({name: data.name, email: data.email, id: data.id, city: data.city, address: data.address}));
                    if(data.email) {
                      setTimeout(() => {
                        setLoading(false);
                        alert("Your information was successfuly updated.");
                      }, 1000);
                    }
                }
              })
            }
            else {
              setLoading(false);
              alert("Enter all information.");
            }
          }
          catch(err) {
            setLoading(false);
            console.log(err);
          }
    }

  return (
    <div className="profile">
        <h3>User Profile</h3>
        <p>View and change your profile information here</p>
        <div className="profile__text">Email</div>
        <div className="profile__input"><input disabled type="email" placeholder={email} onChange={(event) => emailSet(event.currentTarget.value)} /></div>
        <div className="profile__error">{errors.email == "email" ? errors.email : ""}</div>
        <div className="profile__text">Name</div>
        <div className="profile__input"><input type="text" placeholder={name} onChange={(event) => nameSet(event.currentTarget.value)} /></div>
        <div className="profile__error">{errors.name == "name" ? errors.name : ""}</div>
        <div className="profile__bottom">
            <div className="profile__bottom-block">
                <div className="profile__text">Address</div>
                <div className="profile__input"><input type="text" placeholder={address} onChange={(event) => addressSet(event.currentTarget.value)} /></div>
                <div className="profile__error">{errors.address == "address" ? errors.address : ""}</div>
            </div>
            <div className="profile__bottom-block">
                <div className="profile__text">City</div>
                <div className="profile__input"><input type="text" placeholder={city} onChange={(event) => citySet(event.currentTarget.value)} /></div>
                <div className="profile__error">{errors.city == "city" ? errors.city : ""}</div>
            </div>
        </div>
        {
          loading ? <button className="loadingButton"><Preloader width="40px" height="40px" left="25px" top="50%"/>Loading</button> 
          : <button className="profile__btn" onClick={() => submit()}>Submit</button>
        }
    </div>
  )
}

export default userProfile