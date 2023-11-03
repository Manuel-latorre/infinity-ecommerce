'use client'

import Link from "next/link"
import ButtonPay from "../ButtonPay/ButtonPay"


export interface ProductProps{
    product: {
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
}


export default function Productos({product}:ProductProps){
    return(
        <div>
            <img style={{width:300, height:'300'}} src={product.imageCard} alt='product'/>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <ButtonPay/>
            <a href={`/products/${product._id}`}>
             VER MAS
            </a>
        </div>
    )
}