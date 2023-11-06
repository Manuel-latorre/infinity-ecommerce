'use client'


import { Product } from "@/components/NewIn/NewIn";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import style from './Detail.module.css'




async function fetchProduct(_id: Product) {
    return await fetch(`https://api-ecommerce-kappa.vercel.app/products/${_id}`)
    .then(res => res.json())
    
}

export default async function DetailProduct({ params }: any) {
    const { id } = params;
    const prod = await fetchProduct(id)

    return (
        <div className={style.detailContainer}>
            <p>{prod.id}</p>
            <p>{prod.name}</p>
            
            <Carousel className={style.carrusel}>
                <div>
                    <img src={prod.imageDetail} />
                    
                </div>
                <div>
                    <img src={prod.imageDetail} />
                    
                </div>
                <div>
                    <img src={prod.imageDetail2} />
                    
                </div>
        </Carousel>
        </div>
    );
}
