import { League_Spartan } from "next/font/google"


const spartan = League_Spartan({ subsets: ['latin'], weight:['700'] })



export default function ShopByCategory(){
    return(
        <div className={spartan.className}>
            <p style={{fontSize:50}}>MOUSES</p>
        </div>
    )
}