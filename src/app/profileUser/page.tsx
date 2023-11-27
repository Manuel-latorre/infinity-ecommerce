'use client'


import { useSession, signOut } from 'next-auth/react'
import { Avatar, Button } from '@nextui-org/react';
import style from './Dashboard.module.css'

export default function ProfileUser(){

    const {data: session, status} = useSession()
    console.log(session, status);
    

    return(
        <div>
            <h1>Mi perfil</h1>
            <div className={style.userContainer}>
                <Avatar isBordered as="button" className="transition-transform" color="danger" size="lg" src={'https://api.dicebear.com/7.x/bottts/svg'} alt='avatar'/>
                <p>{session?.user?.email}</p>
                
                <Button variant='shadow' color='danger' onClick={() => signOut()}>Logout</Button>
            </div>
        </div>
    )
}