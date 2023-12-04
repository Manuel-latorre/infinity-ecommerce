'use client'

import React, {useEffect, useRef, useState } from 'react'
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../assets/logoInfinit1.svg'
import CartView from '../Cart/CartView';
import SearchBar from '../Searchbar/Searchbar';
import ArrowIcon from './ArrowIcon'
import './Navbar.css'





const Navbar = () => {


  const [isOpen, setIsOpen] = useState(false)
  const {data: session} =  useSession()

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement | HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      toggleRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !toggleRef.current.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

   return (
         <nav  className='navbarContainer'>
            <div className='navbar'>
                    <div className={`nav_toggle ${isOpen && 'open'}`} onClick={() => setIsOpen(!isOpen)} ref={toggleRef as React.RefObject<HTMLDivElement>} >
                        <span></span>
                        <span></span>
                    </div>

                    <div>
                        <a href="/">
                        <Image  className='logo' src={logo} alt="logo" />
                        </a>
                    </div>

                    <div  className={`nav_items ${isOpen && 'open'}`} ref={dropdownRef}>
                        <Link href='/'>
                          Inicio
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
                        <Dropdown backdrop="blur">
                          <DropdownTrigger>
                            <Button variant='light'>
                              
                              <p style={{fontSize:16}}> Play Station</p>
                              <ArrowIcon/>
                            </Button>
                          
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Static Actions">
                          <DropdownItem variant='flat' color='success' key="new"><Link href='/sony'>Ver todo</Link></DropdownItem>
                          <DropdownItem variant='flat' color='secondary' key="copy"><Link href='/joysticks'>Joysticks</Link></DropdownItem>
                          <DropdownItem variant='flat' color='warning' key="edit"><Link href='/consolas'>Consolas</Link></DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
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
                  <div className='signSection'>
                    <Button style={{margin:5}} as={Link} color="success" href="/login" variant="flat">
                      Ingresar
                    </Button>

                    <Button style={{margin:5}} as={Link} color="primary" href="/register" variant="flat">
                      Registrarse
                    </Button>
                  </div>
                )
              }
            </div>
            <div className='searchbarContainer'>
                <SearchBar/>
            </div>
</nav>
    
   )
 }

 export default Navbar