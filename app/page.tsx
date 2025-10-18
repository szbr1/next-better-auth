"use client"
import { Button } from "@/components/ui/button"
import { SessionProps } from "@/types/AuthTypes"
import { authClient } from "@/utils/authClient"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function page (){


  
  const [session, setSession] = useState<SessionProps | null >(null)

  const callFunc = async()=>{
    const ses = await authClient.getSession()
    if(ses.data && ses.data.user){
      setSession(ses.data.user)
    }
  }

  useEffect(()=>{
    callFunc()
  },[])

    if(!session){
      return <div className="flex h-screen w-full justify-center p-12 gap-4">
        <Button >
          <Link href="/verify">SignUp</Link>
        </Button>
        <Link href="/verify">
        <Button >
            SignIn
          </Button></Link>
       
      </div>
        
    }
  return (
    <div>
      Hello 
    </div>
  )
}