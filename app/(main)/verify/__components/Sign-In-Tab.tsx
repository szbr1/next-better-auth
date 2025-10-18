"use client";

import { Button } from "@/components/ui/button";
import { CardAction, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";
import { Tabs } from "@/types/AuthTypes";
import { authClient } from "@/utils/authClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

// Regex : Generated with chatgpt
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;'"<>,.?/-]).{8,}$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

function SignInTab({openEmaillVerificationTab, setTabSwitch}: {openEmaillVerificationTab: (email:string)=> void, setTabSwitch: React.Dispatch<React.SetStateAction<Tabs>>}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const sendAuthRequest = await authClient.signIn.email(
      { ...formData, callbackURL: "/" },
      {
        onError: (error) => {
          setIsSubmitting(false)
          if (error.error.message === "EMAIL_NOT_VERIFIED") {
            openEmaillVerificationTab(formData.email)
          }
          toast.error(error.error.message || "This email can't signin.");
        },
        onSuccess: () => {
          setIsSubmitting(false)
          router.push("/")
        }
      }
    );
    if (sendAuthRequest.data) {
      toast(`Welcome Back, ${sendAuthRequest.data?.user.name}`);
    }
    setIsSubmitting(false)
  };

  return (
    <CardContent className="flex flex-col justify-center w-full items-center gap-1">
      <Input
        name="email"
        className="h-11"
        placeholder="Email"
        onChange={ChangeInput}
        type="email"
      />
      <PasswordInput
        name="password"
        className="h-11 w-full"
        placeholder="****"
        onChange={ChangeInput}
      />
      <div className="w-full flex justify-end items-center">
           <button 
           onClick={()=>{
            setTabSwitch("forget-password")
           }}
           className="text-sm underline-offset-4 cursor-pointer underline ">
            Forget Password
           </button>
      </div>

      <CardAction className="w-full">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="h-10  mt-3 w-full">
          <LoadingSwap isLoading={isSubmitting}>
              SignIn
          </LoadingSwap>
        </Button>
      </CardAction>
    </CardContent>
  );
}

export default SignInTab;
