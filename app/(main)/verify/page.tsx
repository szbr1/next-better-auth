"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SignUpTab from "./__components/Sign-Up-Tab";
import SignInTab from "./__components/Sign-In-Tab";

function Page() {

  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Tabs  defaultValue="sign-in" >

        <TabsList>
          <TabsTrigger value="sign-in">Sign-In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign-Up</TabsTrigger>
        </TabsList>
  {/* Tab 1 */}

        <TabsContent value="sign-in">
          <Card className="w-[40vw]">
            <CardHeader>
              <CardTitle className="text-center text-2xl">SignIn</CardTitle>
            </CardHeader>
            <SignInTab />
          </Card>
        </TabsContent>
  {/* Tab 2 */}

        <TabsContent value="sign-up">
          <Card className="w-[40vw]">
            <CardHeader>
              <CardTitle className="text-center text-2xl">SignUp</CardTitle>
            </CardHeader>
            <SignUpTab />
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default Page;
