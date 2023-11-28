'use client'

import style from './Product.module.css'
import logo from '../assets/logoInfinity.svg'
import Image from 'next/image'
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
    if(product.brand === 'Logitech'){
        return(
            <div className={style.card}>
  <a href={`/products/${product._id}`} className={style.cardLink}>
    <div className={style.cardContent}>
      <div className={style.logoContainer}>
        <Image className={style.logo} src={logo} alt="logo" />
        <img className={style.brandLogoLogitech} src={product.brandLogo} alt="" />
      </div>
      <img className={style.productImage} src={product.imageCard} alt='product'/>
      <div className={style.textCard}>
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
    </div>
  </a>
</div>
        )
    }

    return(
        <div className={style.card}>
  <a href={`/products/${product._id}`} className={style.cardLink}>
    <div className={style.cardContent}>
      <div className={style.logoContainer}>
        <Image className={style.logo} src={logo} alt="logo" />
        <img className={style.brandLogo} src={product.brandLogo} alt="" />
      </div>
      <img className={style.productImage} src={product.imageCard} alt='product'/>
      <div className={style.textCard}>
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
    </div>
  </a>
</div>
    )
}