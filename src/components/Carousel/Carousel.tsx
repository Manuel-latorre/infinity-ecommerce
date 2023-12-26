'use client'

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper/modules';
import hyperx from '../assets/carruselHyperx.gif'
import redragon from '../assets/carruselreddragon.gif'
import logitech from '../assets/carruselLogitech.gif'
import ps5 from '../assets/ps5.gif'
import "swiper/css";
import 'swiper/css/pagination';
import "./Carousel.css";
import Image from "next/image";

export default function Carousel() {
  return (
    <>
      <Swiper 
      pagination={true} 
      autoplay={{
        delay: 3000,
      }}
      loop={true}  
      modules={[Pagination, Autoplay]}  
      className="mySwiper">
        <SwiperSlide>
            <Image src={hyperx} alt="hyperx"/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={redragon} alt="redragon"/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={logitech} alt="logitech"/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={ps5} alt="ps5"/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
