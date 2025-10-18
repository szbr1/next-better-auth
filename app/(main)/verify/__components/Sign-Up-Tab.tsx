"use client"
import { Button } from "@/components/ui/button";
import { CardAction, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/utils/authClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

// Regex : Generated with chatgpt
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;'"<>,.?/-]).{8,}$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

function SignUpTab({openEmaillVerificationTab}: {openEmaillVerificationTab: (email:string)=> void}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  }); 
  const [isSubmitting, setIsSubmitting] = useState(false)
  

  const ChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true)
    if (!emailRegex.test(formData.email)) {
      setIsSubmitting(false)
      toast("Email format is not valid!", {
        style: {
          background: "#f44336",
        },
      });
      return;
    }
    
    if (!passwordRegex.test(formData.password)) {
      setIsSubmitting(false)
      toast("Password must contain a number, uppercase letter, and symbol.", {
        style: {
          background: "#f44336",
        },
      });
      return;
    }
    
    const res = await authClient.signUp.email(
      { ...formData, callbackURL: "/" },
      {
        onError: (error) => {
          setIsSubmitting(false)
          if (error.error.message === "EMAIL_NOT_VERIFIED") {
            openEmaillVerificationTab(formData.email);
          }
          console.log("eror a gya 😜:",error.error.message)
          toast.error(error.error.message || "This email can't signup.");
        },
        
      }
    );
    
    if(res.error == null && !res.data.user.emailVerified){
      setIsSubmitting(false)
      openEmaillVerificationTab(formData.email)
    }
    setIsSubmitting(false)
  };
  
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
      <PasswordInput
        name="password"
        className="h-11"
        onChange={ChangeInput}
        placeholder="*******"
      />

      <CardAction className="w-full">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="h-10  mt-3 w-full">
          <LoadingSwap isLoading={isSubmitting}>
             Sign-Up
          </LoadingSwap>
        </Button>
      </CardAction>
    </CardContent>
  );
}

export default SignUpTab;
