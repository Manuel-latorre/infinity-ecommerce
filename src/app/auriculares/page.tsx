'use client'

import { useEffect, useState } from "react";
import {CheckboxGroup, Checkbox, Pagination, Slider,  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import auricularesBanner from '../../components/assets/auriculares.svg'

import Productos from "@/components/Products/Product";
import style from '../Pages.module.css'
import Image from "next/image";
export interface Product {
        _id: string,
        category: string,
        price: number,
        name: string,
        imageCard: string,
        imageDetail: string,
        imageDetail1: string,
        imageDetail2: string,
        color: string,
        description: string,   
        brandLogo: string, 
        brand: string,
        stock: number,
        inCart: boolean
}


async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://api-ecommerce-kappa.vercel.app/products');
    const data = await response.json();
    console.log(data);
    return data.products as Product[]; 
  }


export default function Auriculares (){

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000); // Ajusta según tus necesidades
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [backdrop, setBackdrop] = useState('opaque')

    const backdrops = ["blur"];
  
    const handleOpen = (backdrop:string) => {
      setBackdrop(backdrop)
      onOpen();
    }


    useEffect(() => {
    
    fetchProducts()
    .then((data) => setProducts(data));
  }, []);

   const auriculares = products.filter(cat => cat.category === 'Auriculares')

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

  const filteredByBrand = auriculares.filter((product) => {
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
          <Image src={auricularesBanner} style={{width:'100%'}} alt="teclados"/>
          
          <div className={style.buttonFilter}>
        
          <button 
             
            onClick={() => handleOpen(backdrop)}
            style={{display:'flex', alignItems:'center', border: 'solid 1px black', padding:5, borderRadius:3, gap:10, backgroundColor:'white'}}
          >
           <p style={{color:'black'}}>Filtrar</p>
           <svg width={18} viewBox="0 -4.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow_down [#339]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -6684.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39" id="arrow_down-[#339]"> </path> </g> </g> </g> </g></svg>
          </button>
        
          </div>
      <Modal backdrop= 'blur' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filtros</ModalHeader>
              <ModalBody>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                
                <div style={{marginTop:30}}>
                    <p className={style.titleFilter}>Filtrar por marca</p>
                    <CheckboxGroup>
                        <Checkbox
                        value="logitech"
                        checked={selectedBrands.includes("Logitech")}
                        onChange={() => handleBrandChange("Logitech")} >
                            Logitech
                        </Checkbox>

                        <Checkbox
                        color="danger" 
                        value="redragon"
                        checked={selectedBrands.includes("Redragon")}
                        onChange={() => handleBrandChange("Redragon")} >
                            Redragon
                        </Checkbox>

                        <Checkbox
                        color="danger" 
                        value="hyperx"
                        checked={selectedBrands.includes("Hyperx")}
                        onChange={() => handleBrandChange("Hyperx")} >
                            Hyper X
                        </Checkbox>

                    </CheckboxGroup>
                </div>
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
                        color="default" 
                        value="gris"
                        checked={selectedColors.includes("gris")}
                        onChange={() => handleColorChange("gris")} >
                            Gris
                        </Checkbox>

                        <Checkbox
                        color="success"
                        value="blanco"
                        checked={selectedColors.includes("blanco")}
                        onChange={() => handleColorChange("blanco")} >
                            Blanco
                        </Checkbox>

                        <Checkbox
                        value="azul"
                        checked={selectedColors.includes("azul")}
                        onChange={() => handleColorChange("azul")} >
                            Azul
                        </Checkbox>

                        <Checkbox
                        color='danger'
                        value="rojo"
                        checked={selectedColors.includes("rojo")}
                        onChange={() => handleColorChange("rojo")} >
                            Rojo
                        </Checkbox>

                        <Checkbox
                        color='danger'
                        value="rosa"
                        checked={selectedColors.includes("rosa")}
                        onChange={() => handleColorChange("rosa")} >
                            Rosa
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" variant="solid" onPress={onClose}>
                  Aplicar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            <div className={style.pages_container}>
                <div className={style.filters_container}>
                
                    <div style={{marginTop:30}}>
                        <p className={style.titleFilter}>Filtrar por marca</p>
                        <CheckboxGroup>
                            <Checkbox
                            value="logitech"
                            checked={selectedBrands.includes("Logitech")}
                            onChange={() => handleBrandChange("Logitech")} >
                                Logitech
                            </Checkbox>

                            <Checkbox
                            color="danger" 
                            value="redragon"
                            checked={selectedBrands.includes("Redragon")}
                            onChange={() => handleBrandChange("Redragon")} >
                                Redragon
                            </Checkbox>

                            <Checkbox
                            color="danger" 
                            value="hyperx"
                            checked={selectedBrands.includes("Hyperx")}
                            onChange={() => handleBrandChange("Hyperx")} >
                                Hyper X
                            </Checkbox>

                        </CheckboxGroup>
                    </div>
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
                            color="default" 
                            value="gris"
                            checked={selectedColors.includes("gris")}
                            onChange={() => handleColorChange("gris")} >
                                Gris
                            </Checkbox>

                            <Checkbox
                            color="success"
                            value="blanco"
                            checked={selectedColors.includes("blanco")}
                            onChange={() => handleColorChange("blanco")} >
                                Blanco
                            </Checkbox>

                            <Checkbox
                            value="azul"
                            checked={selectedColors.includes("azul")}
                            onChange={() => handleColorChange("azul")} >
                                Azul
                            </Checkbox>

                            <Checkbox
                            color='danger'
                            value="rojo"
                            checked={selectedColors.includes("rojo")}
                            onChange={() => handleColorChange("rojo")} >
                                Rojo
                            </Checkbox>

                            <Checkbox
                            color='danger'
                            value="rosa"
                            checked={selectedColors.includes("rosa")}
                            onChange={() => handleColorChange("rosa")} >
                                Rosa
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