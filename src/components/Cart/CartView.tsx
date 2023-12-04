'use client'

import { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import Cart from "./Cart";
import style from './Cart.module.css'

export interface User {
  email: string;
  // Otros campos de usuario
  cart: Cart[]; // Define el tipo de datos para el carrito
}

export interface Cart {
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

async function deleteProduct(_id: string) {
  const res = await fetch(`https://api-ecommerce-kappa.vercel.app/products-cart/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (res.ok) {
    console.log('Producto eliminado del carrito.');
  } else {
    console.error('Error al eliminar el producto del carrito.');
  }
}


export default function CartView() {
  const { data: session } = useSession();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = useState('opaque')
  const [products, setProducts] = useState<Cart[]>(
    (session?.user as User)?.cart || []
  );
  
  
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
    refreshData();

    const refreshInterval = setInterval(refreshData, 1000); // Adjust the interval as needed

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  



  const totalItems = products.length;

  const handleDeleteProduct = async (_id: string) => {
    await deleteProduct(_id);
    // Después de eliminar un producto, actualiza la vista del carrito.
    refreshData();
  }

  const calculateTotal = () => {
    const totalPrice = products.reduce((acc, prod) => acc + prod.price, 0);
    return totalPrice.toFixed(2); // Redondear a dos decimales
  };
  
  return (
    <>
      <div>
        {backdrops.map((b) => (
          <button  
            key={b}
            onClick={() => handleOpen(b)}
          >
           <Cart totalItems={totalItems}/>
          </button>
        ))}  
      </div>
      <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Mi Carrito</ModalHeader>
              <ModalBody>
              <div>
                  {
                  products.map((prod) => (
                    <div key={prod._id} className={style.cartView}>
                      <div>
                        <p>{prod.name}</p>
                        <p>${prod.price}</p>
                      </div>
                      <div>
                        <img width={100} src={prod.imageCard} alt={prod.name} />
                      </div>
                      <div>
                      <Button onPress={() => handleDeleteProduct(prod._id)} variant="shadow" color="danger">
                        Quitar
                      </Button>  
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p>Total: ${calculateTotal()}</p>
                </div>
              
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary">
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
