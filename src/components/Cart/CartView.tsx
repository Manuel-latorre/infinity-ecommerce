'use client'

import { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Cart from "./Cart";
import { Product } from "../NewIn/NewIn";

interface Cart {
      name: string,
      price: number,
      imageCard: string,
      _id: string,
}

async function fetchProducts(): Promise<Cart[]> {
  try {
    const response = await fetch('https://api-ecommerce-kappa.vercel.app/products-cart');
    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status code: ${response.status}`);
    }
    const data = await response.json();
    return data.productsCart as Cart[];
  } catch (error) {
    console.error(error);
    return [];
  }
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

  const refreshData = () => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      });
  }

  useEffect(() => {
    refreshData(); // Initial data fetch

    // Set up a periodic data refresh (e.g., every 5 seconds)
    const refreshInterval = setInterval(refreshData, 5000); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);



  const totalItems = products.length;


  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <button  
            key={b}
            onClick={() => handleOpen(b)}
          >
           <Cart totalItems={totalItems}/>
          </button>
        ))}  
      </div>
      <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Carrito</ModalHeader>
              <ModalBody>
              <div>
                  {
                  products.map((prod) => (
                    <div key={prod._id} style={{display:'flex', alignItems:'center'}}>
                      <div>
                        <p>{prod.name}</p>
                        <p>{prod.price}</p>
                      </div>
                      <div>
                        <img width={80} src={prod.imageCard} alt={prod.name} />
                      </div>
                      <div>
                        <button>hola</button>
                      </div>
                    </div>
                  ))}
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
