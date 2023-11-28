 'use client'
 
 import React, { useEffect, useState } from 'react';
 import {ScrollShadow} from "@nextui-org/react";
 import axios from 'axios';
 import Autosuggest from 'react-autosuggest';
 import Link from 'next/link';
 import style from './Searchbar.module.css';


 interface Product {
   _id: string;
   name: string;
   imageCard: string;
 }

 export default function SearchBar() {
   const [searchQuery, setSearchQuery] = useState('');
   const [suggestions, setSuggestions] = useState<Product[]>([]);

   const fetchSuggestions = async (value: string): Promise<Product[]> => {
     try {
       const response = await axios.get(
         `https://api-ecommerce-kappa.vercel.app/products/search?name=${value}`
       );
       return response.data;
     } catch (error) {
       console.error('Error al buscar productos por nombre:', error);
       return [];
     }
   };

   const handleSearch = async (value: string) => {
     setSearchQuery(value);
     const products = await fetchSuggestions(value);
     setSuggestions(products);
   };

   const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
     const fetchedSuggestions = await fetchSuggestions(value);
     setSuggestions(fetchedSuggestions);
   };

   const onSuggestionsClearRequested = () => {
     setSuggestions([]);
   };

   const getSuggestions = (value: string) => {
     const inputValue = value.trim().toLowerCase();
     const inputLength = inputValue.length;
     return inputLength === 0 ? [] : suggestions.filter(
       product => product.name.toLowerCase().slice(0, inputLength) === inputValue
     );
   };

   const renderSuggestion = (suggestion: Product) => (
     <div className={style.result_container}>
        <div className={style.result} onClick={() => handleSuggestionClick(suggestion)}>
          {suggestion.name}
          <img width={80} src={suggestion.imageCard} alt="" />
        </div>
      </div>
   );

   const handleSuggestionClick = (suggestion: Product) => {
//     // Redirige manualmente al usuario al detalle del producto
     window.location.href = `/products/${suggestion._id}`;
   };

   useEffect(() => {
     handleSearch('');
   }, []);

   return (
      
     <div className={style.searchbarComponent}>
        <Autosuggest
          suggestions={getSuggestions(searchQuery)}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={renderSuggestion}
          inputProps={{
           placeholder: 'Buscar...',
           value: searchQuery,
           onChange: (e, { newValue }) => {
             handleSearch(newValue);
           },
           className: style.searchbar,
          }}
          />

     </div>
      
   );
 }

