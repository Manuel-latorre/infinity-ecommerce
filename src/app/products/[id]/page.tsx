

import { Product } from "../page";



async function fetchProduct(_id: Product) {
    return await fetch(`https://dark-red-gharial-suit.cyclic.app/products/${_id}`)
    .then(res => res.json())
    
}

export default async function DetailProduct({ params }: any) {
    const { id } = params;
    const prod = await fetchProduct(id)

    return (
        <div>
            <p>{prod.id}</p>
            <p>{prod.name}</p>
        </div>
    );
}
