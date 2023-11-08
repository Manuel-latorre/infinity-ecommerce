
import { createContext, useState, useEffect } from "react";
import {Badge} from "@nextui-org/react";
import CartIcon from "./CartIcon";
import axios from "axios";
import { Product } from "../NewIn/NewIn";

interface CartProps {
  totalItems: number;
}

export default function Cart({ totalItems }: CartProps) {

  

  return (
     <div className="flex items-center gap-4">
       <div className="flex items-center gap-3">
         <Badge color="danger" content={totalItems} shape="circle">
             <CartIcon size={30} />
         </Badge>
       </div>
     </div>
  );
}


