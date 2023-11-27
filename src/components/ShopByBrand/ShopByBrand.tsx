import style from './ShopByBrand.module.css'
import redragon from '../assets/redragon.png'
import logitech from '../assets/logitech.png'
import hyperx from '../assets/hyperx.png'
import Image from 'next/image'
import Link from 'next/link'

export default function ShopByBrand(){
    return (
        <div className={style.marquee_container}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className={style.marquee_text}>
                <Link href='/logitech'>
                    <Image width={200}  src={logitech} alt='logitech'/>
                </Link>
                <Link href='/redragon'>
                    <Image width={200}  src={redragon} alt='redragon'/>
                </Link>
                <Link href='/hyperx'>
                    <Image width={200}  src={hyperx} alt='hyperx'/>
                </Link>
                <Link href='/logitech'>
                    <Image width={200}  src={logitech} alt='logitech'/>
                </Link>
                <Link href='/redragon'>
                    <Image width={200} src={redragon} alt='redragon'/>
                </Link>
                <Link href='/hyperx'>
                    <Image width={200} src={hyperx} alt='hyperx'/>
                </Link>
                <Link href='/logitech'>
                    <Image width={200}  src={logitech} alt='logitech'/>
                </Link>
                <Link href='/redragon'>
                    <Image width={200} src={redragon} alt='redragon'/>
                </Link>
                <Link href='/hyperx'>
                    <Image width={200}  src={hyperx} alt='hyperx'/>
                </Link>
                <Link href='/logitech'>
                    <Image width={200}  src={logitech} alt='logitech'/>
                </Link>
                <Link href='/redragon'>
                    <Image width={200}  src={redragon} alt='redragon'/>
                </Link>
                <Link href='/hyperx'>
                    <Image width={200}  src={hyperx} alt='hyperx'/>
                </Link>
                
            </div>
        </div>
    )
}
