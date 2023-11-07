'use client'


import { Product } from "@/components/NewIn/NewIn";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import style from './Detail.module.css'
import Image from "next/image";
import mp from '../../../components/assets/mp.png'
import visa from '../../../components/assets/visa.png'
import mastercard from '../../../components/assets/mastercard.png'
import ButtonPay from "@/components/ButtonPay/ButtonPay";




async function fetchProduct(_id: Product) {
    return await fetch(`https://api-ecommerce-kappa.vercel.app/products/${_id}`)
    .then(res => res.json())
}



export default async function DetailProduct({ params }: any) {
    const { id } = params;
    const prod = await fetchProduct(id)
    
    
    const division = prod.price / 3;
    const resultado = division.toFixed(5).toString().substring(0, 5);


    async function addToCart(product: Product) {
        try {
          const data = {
            price: product.price,
            name: product.name,
            imageCard: product.imageCard,
          };
      
          const response = await fetch('https://api-ecommerce-kappa.vercel.app/products-cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(prod, 'PROD')
        
          if (response.ok) {
            console.log('Producto agregado al carrito con éxito');
          } else {
            console.error('Error al agregar el producto al carrito');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      }

    return (
        <div style={{backgroundColor:'#fff', color:'black'}}>
            <div className={style.detailContainer}>
                <div>
                    <Carousel className={style.carrusel}>
                        <div>
                            <img src={prod.imageDetail} />
                            
                        </div>
                        <div>
                            <img src={prod.imageDetail1} />
                            
                        </div>
                        <div>
                            <img src={prod.imageDetail2} />
                            
                        </div>
                        <div>
                            <img src={prod.imageDetail} />
                            
                        </div>
                        <div>
                            <img src={prod.imageDetail1} />
                            
                        </div>
                        <div>
                            <img src={prod.imageDetail2} />
                            
                        </div>
                    </Carousel>
                </div>
                <div>
                    <div>
                        <p className={style.name}>{prod.name}</p>
                        <p className={style.price}>$ {prod.price}</p>
                    </div>
                    <p>Mismo precio en 3 cuotas sin intereses de ${resultado}</p>
                    <div style={{marginTop:20}}>
                        <p style={{color:'limegreen'}}>Stock disponible</p>
                        <p>Disponibles({prod.stock})</p>
                    </div>
                    <div style={{display:'flex', marginTop:20}}>
                        <Image width={40} src={mp} alt="mp"/>
                        <Image width={40} src={visa} alt="visa"/>
                        <Image width={40} src={mastercard} alt="mastercard"/>
                    </div>

                    <div style={{display:'flex', flexDirection:'column', marginTop: 20, gap:15}}>
                        <ButtonPay/>
                        <button onClick={() => addToCart(prod)} className={style.buttonCarrito}>Agregar al carrito</button>
                    </div>
                </div>

            </div>
            <div style={{width:'80%', margin:'auto', marginTop:100}}>
                <p className={style.titleDescription}>Lo que tenes que saber de <b>{prod.name}</b></p>

                <p style={{marginTop:20}}>{prod.description}</p>
            </div>
        </div>
    );
}
