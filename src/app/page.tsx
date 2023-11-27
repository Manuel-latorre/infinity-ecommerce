
import Carousel from "@/components/Carousel/Carousel";
import ShopByCategory from "@/components/ShopByCategory/ShopByCategory";
import Marquee from "@/components/Marquee/Marquee";
import NewIn from "@/components/NewIn/NewIn";
import SearchBar from "@/components/Searchbar/Searchbar";
import ShopByBrand from "@/components/ShopByBrand/ShopByBrand";





export default function HomePage (){
    return(
        <div>
            <Marquee/>
            <Carousel/>
            <ShopByCategory/>
            <ShopByBrand/>
            <NewIn/>
        </div>
    )
}