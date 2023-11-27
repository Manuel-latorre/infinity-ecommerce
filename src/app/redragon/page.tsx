'use client'

import Productos from "@/components/Products/Product";
import { useEffect, useState } from "react";


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


export default function Redragon (){

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
    
    fetchProducts()
    .then((data) => setProducts(data));
  }, []);

   const redragon = products.filter(marca => marca.brand === 'Redragon')
    
    return(
        <div>
            {
                redragon.map((prod) => (
                    <Productos product={prod} key={prod._id}/>
                ))
            }
        </div>
    )
}