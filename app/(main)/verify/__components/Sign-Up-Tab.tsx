import { Button } from '@/components/ui/button'
import { CardAction, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { toast } from 'sonner';

// Regex : Generated with chatgpt
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;'"<>,.?/-]).{8,}$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

function SignUpTab() {

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
        toast("Password must contain a number, uppercase letter, and symbol.", {
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
      name="name"
      className="h-11"
      placeholder="Name*"
      onChange={ChangeInput}
      type="string"
    />
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
      onChange={ChangeInput}
      placeholder="****"
      type="password"
    />

    <CardAction className="w-full">
      <Button onClick={handleSubmit} className="h-10  mt-3 w-full">sign-up</Button>
    </CardAction>
  </CardContent>
  )
}

export default SignUpTab