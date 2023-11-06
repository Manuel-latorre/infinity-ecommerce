'use client'


import { useEffect, useState } from "react";
import { League_Spartan } from "next/font/google"
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Link } from "@nextui-org/react"
import 'swiper/css';
import 'swiper/css/pagination';
import style from './NewIn.module.css'
import ProductNewIn from "./ProductNewIn";

export interface Product {
    _id: string,
    category: string,
    price: number,
    name: string,
    imageCard: string,
    imageDetail: string,
    imageDetail1: string,
    imageDetail2: string,
    color: string,
    description: string,   
    brandLogo: string, 
    brand: string,
    stock: number,
    inCart: boolean
}

async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://api-ecommerce-kappa.vercel.app/products');
    const data = await response.json();
    console.log(data);
    return data.products as Product[]; 
  }

  const spartan = League_Spartan({ subsets: ['latin'], weight:['700'] })

export default function NewIn (){

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
    
    fetchProducts()
    .then((data) => setProducts(data));
  }, []);

    const teclados = products.filter(cat => cat.category === 'Teclados')
    console.log(teclados, 'TECLADITOS')

  return(

    <div className={spartan.className}>
        <p className={style.title}>NUEVOS INGRESOS</p>
        <div className={style.container}>
            <Swiper
                slidesPerView={1}
                breakpoints={{
                    640:{
                        slidesPerView:2
                    },
                    1077:{
                        slidesPerView:3
                    },
                    1489:{
                        slidesPerView:4
                    },
                    2034:{
                        slidesPerView:5
                    },
                    2342:{
                        slidesPerView:6
                    },
                    3141:{
                        slidesPerView:7
                    }
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                modules={[Autoplay]}
                className={style.mySwiper}
                loop={true}
                >
            {
                teclados.map((prod) => (
                    <SwiperSlide key={prod._id} className={style.swiperNewIn}>
                        <ProductNewIn key={prod._id} product={prod}/>
                    </SwiperSlide>
                    
                ))
            }
            </Swiper>
        </div>
    </div>
  )
}



