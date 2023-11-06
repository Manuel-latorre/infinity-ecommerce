
import { createContext, useState, useEffect } from "react";
import {Badge} from "@nextui-org/react";
import CartIcon from "./CartIcon";
import axios from "axios";
import { Product } from "../NewIn/NewIn";


// const CartContext = createContext({});

export default function Cart() {

  // const [cartItems, setCartItems] = useState([]);
  // const [products, setProducts] = useState([]);

  // const getProducts = async() => {
  //   return await axios.get('https://dark-red-gharial-suit.cyclic.app/products')
  //   .then(({data}) => setProducts(data.products));
  // }

  // const getProductsCart = async() => {
  //   return await axios.get('https://dark-red-gharial-suit.cyclic.app/products-cart')
  //   .then(({data}) => setCartItems(data.productsCart))
  //   .catch((error) => console.error(error));
  // }

  // useEffect(() => {
  //   // localStorage.setItem("cartProducts", JSON.stringify(cartItems))
  //   getProducts()
  //   getProductsCart()
  // }), []

  // const addToCart = async (product:Product) => {
  //   const {name, imageCard, price} = product;

  //   await axios.post('https://dark-red-gharial-suit.cyclic.app/products-cart', { name, imageCard, price});

  //   getProducts()
  //   getProductsCart()
  // }


  // const updateCart = async (_id:string, query:string, amount:number) => {
  //   if(query === 'del' && amount === 1){
  //     await axios.delete(`https://dark-red-gharial-suit.cyclic.app/products-cart/${_id}`)
  //     .then(({data}) => console.log(data));
  //   }else{
  //     await axios.put(`https://dark-red-gharial-suit.cyclic.app/products-cart/${_id}?query=${query}`, {
  //       amount,
  //     })
  //     .then(({data}) => console.log(data))
  //   }

  //   getProducts()
  //   getProductsCart()
  // }


  return (
     <div className="flex items-center gap-4">
       <div className="flex items-center gap-3">
         <Badge color="danger" content={0} shape="circle">
             <CartIcon size={30} />
         </Badge>
       </div>
     </div>
  );
}


