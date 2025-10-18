"use client";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import VerifyEmail from "./__components/email-verify";
import { Tabs as tabs } from "@/types/AuthTypes";
import SignUpTab from "./__components/Sign-Up-Tab";
import SignInTab from "./__components/Sign-In-Tab";
import ForgetPassword from "./__components/forget-password";


function Page() {
  const [TabSwitch, setTabSwitch] = useState<tabs>("sign-in");
  const [Email, setEmail] = useState("")


  const openEmailVerificationTab = (data: string)=>{
   setEmail(data)
   setTabSwitch("email-verification")
  }

  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Tabs value={TabSwitch} >
    {TabSwitch === "email-verification" || TabSwitch === "forget-password" ? null : 
        <TabsList>
          <TabsTrigger  onClick={()=> setTabSwitch("sign-in")} value="sign-in">Sign-In</TabsTrigger>
          <TabsTrigger  onClick={()=> setTabSwitch("sign-up")} value="sign-up">Sign-Up</TabsTrigger>
        </TabsList>
        }
  {/* Tab 1 */}

        <TabsContent value="sign-in">
          <Card className="w-[40vw]">
            <CardHeader>
              <CardTitle className="text-center text-2xl">SignIn</CardTitle>
            </CardHeader>
            <SignInTab openEmaillVerificationTab={openEmailVerificationTab} setTabSwitch={setTabSwitch} />
          </Card>
        </TabsContent>
  {/* Tab 2 */}

        <TabsContent value="sign-up">
          <Card className="w-[40vw]">
            <CardHeader>
              <CardTitle className="text-center text-2xl">SignUp</CardTitle>
            </CardHeader>
            <SignUpTab openEmaillVerificationTab={openEmailVerificationTab}/>
          </Card>
        </TabsContent>
  {/* Tab 3 */}

        <TabsContent value="email-verification">
          <Card className="w-[40vw] bg-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Verify Your Email</CardTitle>
            </CardHeader>
            <VerifyEmail email={Email}/>
          </Card>
        </TabsContent>
  {/* Tab 3 */}

  <TabsContent value="forget-password">
          <Card className="w-[40vw]">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Send Forget Password Email</CardTitle>
            </CardHeader>
            <ForgetPassword />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
