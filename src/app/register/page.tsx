'use client'

import axios, {AxiosError} from "axios";
import { Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { League_Spartan } from "next/font/google";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import style from '../login/Login.module.css'

const spartan =  League_Spartan({ subsets: ['latin'], weight:['600'] })


export default function RegisterPage() {

    const [error, setError ] = useState()
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);


        try {
            const signUpResponse =  await axios.post('/api/auth/signup', {
                email: formData.get('email'),
                fullname: formData.get('fullname'),
                password: formData.get('password'),
            },
            );
            console.log(signUpResponse, 'signUpResponseee');

            const res = await signIn('credentials', {
              email: signUpResponse.data.email,
              password: formData.get('password'),
              redirect: false,
            },
            )

            if(res?.ok) return router.push('/')
            console.log(res);
            
        } catch (error) {
            console.log(error);
            if(error instanceof AxiosError){
                setError(error.response?.data.message)
            }
            
        }
    }


  return (
    <div className={spartan.className}>
      <div className={style.login}>
        <div className={style.login_container}>
          <form onSubmit={handleSubmit} className={style.form}>
            <p className={style.signIn}>Regístrate en Infinity Game</p>
            <Input isRequired type="text" label="Fullname" placeholder="Fullname" name="fullname" className="mb-2" />
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

