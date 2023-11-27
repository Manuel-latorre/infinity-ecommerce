import { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import style from './Button.module.css';
import { Cart, User } from '../Cart/CartView';
import { useSession } from 'next-auth/react';

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

export default function ButtonPay() {
  const { data: session } = useSession();
  const [preferenceId, setPreferenceId] = useState(null);
  const [products, setProducts] = useState<Cart[]>((session?.user as User)?.cart || []);

  initMercadoPago('TEST-0838d460-5b5f-49ac-812c-d1e7cb7aba08');

  const createPreference = async () => {
    try {
      const productDescriptions = products.map((product) => product.name).join(', '); // Concatenar nombres de productos
      const response = await axios.post('https://api-ecommerce-kappa.vercel.app/create_preference', {
        description: `Compra de: ${productDescriptions}`, // Usar la lista de nombres de productos en la descripción
        price: 100,
        quantity: 1,
        currency_id: 'ARS',
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) setPreferenceId(id);
  };

  return (
    <div>
      <button className={style.buttonComprar} onClick={handleBuy}>
        Comprar ahora
      </button>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}
