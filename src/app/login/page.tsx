'use client'

import { Input, Button } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { League_Spartan } from "next/font/google";
import style from './Login.module.css'
import Link from "next/link";

const spartan =  League_Spartan({ subsets: ['latin'], weight:['600'] })

export default function LoginPage() {

    const [error, setError ] = useState('')
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const res = await signIn('credentials', {
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: false,
        })

        if(res?.error) return setError(res.error as string)

        if(res?.ok) return router.push('/')
        
    }


  return (
    <div className={spartan.className}>
      <div className={style.login}>
        <div className={style.login_container}>
          <form onSubmit={handleSubmit} className={style.form}>
            <p className={style.signIn}>Iniciar sesión</p>



            <Input isRequired type="email" label="Email" placeholder="Email" name="email" className="mb-2" />
            { error && <div className={style.errors}> {error} </div> }
            <Input isRequired type="password" label="Password" placeholder="*****" name="password" className="mb-2" />

            <button className={style.submit}>Iniciar</button>
          
          </form>
        </div>
      </div>
    </div>
  );
}
