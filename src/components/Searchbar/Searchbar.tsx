 'use client'

 import React, { useEffect, useState } from 'react';
 import axios, { AxiosResponse } from 'axios';
 import Autosuggest from 'react-autosuggest';
 import Link from 'next/link';
 import style from './Searchbar.module.css'



interface Product {
    _id: string;
    name: string;
    imageCard: string
  }
  export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const handleSearch = async (value: string) => {
      setSearchQuery(value);
      try {
        const response = await axios.get(`https://api-ecommerce-kappa.vercel.app/products/search?name=${value}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al buscar productos por nombre:', error);
      }
    }
    const getSuggestions = (value: string) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      return inputLength === 0 ? [] : products.filter(
        product => product.name.toLowerCase().slice(0, inputLength) === inputValue
      );
    };
    const renderSuggestion = (suggestion: Product) => (
        <Link href={`/products/${suggestion._id}`}>
            <div className={style.result}>
                  {suggestion.name}
                  <img width={80} src={suggestion.imageCard} alt="" />
            </div>
        </Link>
    )
    useEffect(() => {
        handleSearch('');
    }, [])
    return (
      <div className={style.searchbarComponent}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => {
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Buscar...',
            value: searchQuery,
            onChange: (e, { newValue }) => {
              handleSearch(newValue);
            },
            className: style.searchbar
          }}
        />
      </div>
    );
  }