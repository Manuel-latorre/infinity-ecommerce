'use client'


import { useSession, signOut } from 'next-auth/react'

export default function ProfileUser(){

    const {data: session, status} = useSession()
    console.log(session, status);
    

    return(
        <div>
            <h1>dashboard</h1>
            <p>{session?.user?.email}</p>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}