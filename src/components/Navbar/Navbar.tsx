'use client'

import React, {useState, useEffect} from 'react'
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../assets/logoInfinit1.svg'
import Cart from '../Cart/Cart';
import './Navbar.css'
import CartView from '../Cart/CartView';





const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const {data: session} =  useSession()


   return (
         <nav className='navbar'>

            <div className={`nav_toggle ${isOpen && 'open'}`} onClick={() => setIsOpen(!isOpen)} >
                 <span></span>
                 <span></span>
             </div>

             <div>
                 <a href="/">
                 <Image  className='logo' src={logo} alt="" />
                 </a>
             </div>

             <div  className={`nav_items ${isOpen && 'open'}`}>
                <Link href='/'>
                  Inico
                </Link>
                <Link href='/teclados'>
                  Teclados
                </Link>
                <Link href='/auriculares'>
                  Auriculares
                </Link>
                <Link href='/mouses'>
                  Mouses
                </Link>
                <Link href='/mousepads'>
                  Mousepads
                </Link>
             </div>

             {
        session ? (

          <div style={{display:'flex', gap: 30, alignItems:'center'}}>
            <div>
                <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="danger"
                  name="Jason Hughes"
                  size="sm"
                  src={'https://api.dicebear.com/7.x/bottts/svg'}
                  alt='avatar'
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Sesión iniciada en</p>
                  <p className="font-semibold">{session.user?.email}</p>
                </DropdownItem>
                <DropdownItem>
                  <Link href='/profileUser'>Mi perfil</Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <button onClick={() => signOut()}>Cerrar sesión</button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </div>
            <div>
              <CartView/>
            </div>
        </div>

          

          
        ) : (
          <div>
            <Button style={{margin:5}} as={Link} color="primary" href="/login" variant="flat">
              Sign In
            </Button>

            <Button style={{margin:5}} as={Link} color="warning" href="/register" variant="flat">
              Sign Up
            </Button>
          </div>
        )
      }

      
       
         </nav>
    
   )
 }

 export default Navbar