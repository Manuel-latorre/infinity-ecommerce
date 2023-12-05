'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Searchbar.module.css';
import { SearchIcon } from './SearchIcon';
import { Input, ScrollShadow } from '@nextui-org/react';

interface Product {
  _id: string;
  name: string;
  price:number;
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

  const handleSuggestionClick = (suggestion: Product) => {
    window.location.href = `/products/${suggestion._id}`;
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <div className={style.searchbarComponent}>
    <Input
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Buscar..."
      size="sm"
      startContent={<SearchIcon size={18} width={undefined} height={undefined} />}
      type="search"
    />

    {searchQuery.length > 0 && suggestions.length > 0 && (
      <ul className={style.resultsSearch}>
        {suggestions.map((item) => (
          <li key={item._id} onClick={() => handleSuggestionClick(item)}>
            <div className={style.result}>
              <div style={{display:'flex', flexDirection:'column'}}>
                <p>{item.name}</p>
                <p style={{color: 'black'}}>${item.price}</p>
              </div>
              <img width={80} src={item.imageCard} alt="" />
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}
