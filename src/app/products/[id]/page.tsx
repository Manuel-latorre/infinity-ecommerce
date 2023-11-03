

import { Product } from "../page";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";


async function fetchProduct(_id: Product) {
    return await fetch(`https://dark-red-gharial-suit.cyclic.app/products/${_id}`)
    .then(res => res.json())
    
}

export default async function DetailProduct({ params }: Params) {
    const { id } = params;
    const prod = await fetchProduct(id)

    return (
        <div>
            <p>{prod.id}</p>
            <p>{prod.name}</p>
        </div>
    );
}
