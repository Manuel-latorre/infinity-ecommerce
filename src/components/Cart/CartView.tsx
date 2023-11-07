'use client'

import { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Cart from "./Cart";
import { Product } from "../NewIn/NewIn";

interface Cart {
  
    name: string,
    price: number,
    imageCard: string,
    _id: number,
  
}
async function fetchProducts(): Promise<Cart[]> {
  const response = await fetch('https://api-ecommerce-kappa.vercel.app/products-cart');
  const data = await response.json();
  console.log(data, 'DATITTA');
  return data as Cart[] ; 
}



export default function CartView() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque')
  const [products, setProducts] = useState<Cart[]>([]);

  const backdrops = ["blur"];
  
  const handleOpen = (backdrop:any) => {
    setBackdrop(backdrop)
    onOpen();
  }

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        console.log(data, 'useffect');
      });
  }, []);


  

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <button  
            key={b}
            onClick={() => handleOpen(b)}
          >
           <Cart/>
          </button>
        ))}  
      </div>
      <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <div>
                {
                  products.map((prod) => (
                    <div key={prod._id}>
                      <p style={{color:'red'}}>{prod.name}</p>
                    </div>
                  ))
                }
              </div>
              
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Comprar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
