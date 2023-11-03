'use client'


import React, { useRef, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Link } from "@nextui-org/react"
import { League_Spartan } from "next/font/google"
import style from './ShopByCategory.module.css'
import 'swiper/css';
import 'swiper/css/pagination';



const spartan = League_Spartan({ subsets: ['latin'], weight:['700'] })



export default function ShopByCategory(){
    return(
        <div className={spartan.className} style={{margin:100}}>
            <p className={style.title}>Explora por categorías</p>
            <Swiper
                slidesPerView={3}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                modules={[Autoplay]}
                className={style.mySwiper}
                loop={true}
            >
        
            <div className={style.categories}>
                <SwiperSlide className={style.swiperSlide}>
                    <div className={style.swiperSlideTeclados}>
                        <p className={style.textCard}>TECLADOS</p>
                        <Button className={style.button} color="success" as={Link} href="/teclados" showAnchorIcon variant="solid">
                            Explorar
                        </Button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.swiperSlide}>
                    <div className={style.swiperSlideAuriculares}>
                        <p className={style.textCard}>AURICULARES</p>
                        <Button className={style.button} color="primary" as={Link} href="/auriculares" showAnchorIcon variant="solid">
                            Explorar
                        </Button>
                    </div>
                </SwiperSlide>
                
               <SwiperSlide className={style.swiperSlide}>
                    <div className={style.swiperSlideMouses}>
                        <p className={style.textCard}>MOUSES</p>
                        <Button className={style.button} color="warning" as={Link} href="/mouses" showAnchorIcon variant="solid">
                            Explorar
                        </Button>
                        
                    </div>
               </SwiperSlide>
               <SwiperSlide className={style.swiperSlide}>
                    <div className={style.swiperSlideMousepads}>
                        <p className={style.textCard}>MOUSEPADS</p>
                        <Button className={style.button} color="secondary" as={Link} href="/mousepads" showAnchorIcon variant="solid">
                            Explorar
                        </Button>
                    </div>
               </SwiperSlide>
            </div>
      </Swiper>
    </div>
    )
}