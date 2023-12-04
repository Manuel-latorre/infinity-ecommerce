'use client'

import { useEffect, useState } from "react";
import {CheckboxGroup, Checkbox, Pagination, Slider} from "@nextui-org/react";

import Productos from "@/components/Products/Product";
import style from '../Pages.module.css'
export interface Product {
        _id: string,
        brand: string,
        price: number,
        name: string,
        imageCard: string,
        imageDetail: string,
        imageDetail1: string,
        imageDetail2: string,
        color: string,
        description: string,   
        brandLogo: string, 
        stock: number,
        category: string,
        inCart: boolean
}


async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://api-ecommerce-kappa.vercel.app/products');
    const data = await response.json();
    console.log(data);
    return data.products as Product[]; 
  }


export default function Hyperx (){

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000); // Ajusta según tus necesidades



    useEffect(() => {
    
    fetchProducts()
    .then((data) => setProducts(data));
  }, []);

   const hyperx = products.filter(cat => cat.brand === 'Hyperx')

   //FILTERS
   const handleMinPriceChange = (value: number) => {
    setMinPrice(value);
  };
  
  const handleMaxPriceChange = (value: number) => {
    setMaxPrice(value);
  };

   const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(item => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleColorChange = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(item => item !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const filteredByBrand = hyperx.filter((product) => {
    if (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) {
      return true;
    }
    return false;
  });

  const filteredByColor = filteredByBrand.filter((product) => {
    if (selectedColors.length === 0 || selectedColors.includes(product.color)) {
      return true;
    }
    return false;
  });

  const filteredProducts = filteredByColor.filter((product) => {
    // Filtro por precio
    return product.price >= minPrice && product.price <= maxPrice;
  });


  const minPriceMousepads =
    filteredByColor.length > 0
      ? Math.min(...filteredByColor.map((product) => product.price))
      : 0;

  const maxPriceMousepads =
    filteredByColor.length > 0
      ? Math.max(...filteredByColor.map((product) => product.price))
      : 0;


  //FILTER BY COLOR


  

   
    
    return(
        <div>

            <div className={style.pages_container}>
                <div className={style.filters_container}>
                    <div style={{marginTop:30}}>
                        <p className={style.titleFilter}>Filtrar por color</p>
                        <CheckboxGroup>
                            <Checkbox
                            color="default" 
                            value="negro"
                            checked={selectedColors.includes("negro")}
                            onChange={() => handleColorChange("negro")} >
                                Negro
                            </Checkbox>

                            

                            <Checkbox
                            color="success"
                            value="blanco"
                            checked={selectedColors.includes("blanco")}
                            onChange={() => handleColorChange("blanco")} >
                                Blanco
                            </Checkbox>



                        </CheckboxGroup>
                    </div>
                    <div style={{marginTop:30, width:'85%'}}>
                        <p style={{textAlign:'center'}} className={style.titleFilter}>Filtrar por precio</p>
                        <Slider
                          value={[minPrice, maxPrice]}
                          onChange={(newValue: number | number[]) => {
                            if (Array.isArray(newValue)) {
                              handleMinPriceChange(newValue[0]);
                              handleMaxPriceChange(newValue[1]);
                            }
                          }}
                          minValue={minPriceMousepads}
                          maxValue={maxPriceMousepads} // Ajusta según tus necesidades
                          label='Precio'
                          formatOptions={{style: "currency", currency:'ARS'}}
                          
                          color='foreground'
                        />
                    </div>
           
                </div>
                <div className={style.pages}>
                    {
                        filteredProducts.map((prod) => (
                            <Productos product={prod} key={prod._id}/>
                        ))
                    }
                </div>

            </div>
                {/* <Pagination isCompact showControls total={10} initialPage={1} /> */}
        </div>
    )
}