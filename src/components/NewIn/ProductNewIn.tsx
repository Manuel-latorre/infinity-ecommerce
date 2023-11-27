import { ProductProps } from '../Products/Product';
import style from './NewIn.module.css'




export default function ProductnewIn ({product}: ProductProps){
    return(
            <a href={`/products/${product._id}`}>
                <div className={style.card}>
                        <img className={style.brandLogo} src={product.brandLogo} alt='logo' />
                        <img className={style.cardImage} src={product.imageCard} alt={product.name}/>
                        <div className={style.textCard}>
                            <p>{product.name}</p>
                            <p>${product.price}</p>
                        </div>
                </div>
            </a>
    )
}