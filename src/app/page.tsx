import Carousel from "@/components/Carousel/Carousel";
import ShopByCategory from "@/components/ShopByCategory/ShopByCategory";
import Marquee from "@/components/Marquee/Marquee";
import NewIn from "@/components/NewIn/NewIn";



export default function HomePage (){
    return(
        <div style={{backgroundColor:'#030303'}}>
            <Marquee/>
            <Carousel/>
            <ShopByCategory/>
            <NewIn/>
            
        </div>
    )
}