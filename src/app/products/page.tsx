'use client'


import Productos from "@/components/Products/Product";
import { useEffect, useState } from "react";
import style from './Products.module.css'



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
    const response = await fetch('https://dark-red-gharial-suit.cyclic.app/products');
    const data = await response.json();
    console.log(data);
    return data.products as Product[]; 
  }


export default function CardsProds (){

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
    
    fetchProducts()
    .then((data) => setProducts(data));
  }, []);

//   const teclados = products.filter(cat => cat.category === 'Teclados')
//   console.log(teclados, 'TECLADITOS')
  
    
    return(
        <div className={style.cards_container}>
            {
                products.map((prod) => (
                    <Productos product={prod} key={prod._id}/>
                ))
            }
        </div>
    )
}