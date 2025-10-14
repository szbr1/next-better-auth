"use client"

import { Button } from '@/components/ui/button'
import { CardAction, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { toast } from 'sonner'

// Regex : Generated with chatgpt
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;'"<>,.?/-]).{8,}$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

function SignInTab() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const ChangeInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
     setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = ()=>{
    if(!emailRegex.test(formData.email)){
      toast("Email format is not valid!", {
        style: {
          background: "#f44336",
        }
      })
      return;
    }

    if(!passwordRegex.test(formData.password)){
      toast("Password must contain a number, uppercase letter, and symbol.",{
        style: {
          background: "#f44336",
        }
      });
      return;
    }

   console.log(formData, "formdata loaded successfully")    
  }
  
  return (
    <CardContent className="flex flex-col justify-center items-center gap-1">
    <Input
      name="email"
      className="h-11"
      placeholder="Email"
      onChange={ChangeInput}
      type="email"
    />
    <Input
      name="password"
      className="h-11"
      placeholder="****"
      onChange={ChangeInput}
      type="password"
    />

    <CardAction className="w-full">
      <Button onClick={handleSubmit} className="h-10  mt-3 w-full">SignIn</Button>
    </CardAction>
  </CardContent>
  )
}

export default SignInTab