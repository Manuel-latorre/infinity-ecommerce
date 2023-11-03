import Carousel from "@/components/Carousel/Carousel";
import CardsProds from "./products/page";
import ShopByCategory from "@/components/ShopByCategory/ShopByCategory";
import Marquee from "@/components/Marquee/Marquee";



export default function HomePage (){
    return(
        <div style={{backgroundColor:'#030303'}}>
            <Marquee/>
            <Carousel/>
            <ShopByCategory/>
            <CardsProds/>
        </div>
    )
}