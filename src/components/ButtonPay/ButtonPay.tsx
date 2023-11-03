'use client'

import{ useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'



export default function ButtonPay ()  {

    const [ preferenceId, setPreferenceId ]  = useState(null);
    
    initMercadoPago('TEST-0838d460-5b5f-49ac-812c-d1e7cb7aba08');

    const createPreference = async () => {
        try {
            const response = await axios.post("https://dark-red-gharial-suit.cyclic.app/create_preference", {
                description: 'prod 1',
                price: 100,
                quantity: 1,
                currency_id: 'ARS'
            })
            const {id} = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    const handleBuy = async () => {
        const id = await createPreference();
        if(id) setPreferenceId(id);
    }

    return (
        <div>
            <button onClick={handleBuy}>COMPRAR</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>

    )
}