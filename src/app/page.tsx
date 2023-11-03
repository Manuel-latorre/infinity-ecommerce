import Carousel from "@/components/Carousel/Carousel";
import CardsProds from "./products/page";
import ShopByCategory from "@/components/ShopByCategory/ShopByCategory";
import SearchBar from "@/components/Searchbar/Searchbar";



export default function HomePage (){
    return(
        <div>
            <Carousel/>
            <ShopByCategory/>
            <SearchBar/>
            <CardsProds/>
        </div>
    )
}