

import React from 'react';
import mp from '../assets/mp.png'
import visa from '../assets/visa.png'
import mastercard from '../assets/mastercard.png'
import andreani from '../assets/andreani.png'
import correoarg from '../assets/correoargentino.png'
import './Marquee.css'; 
import Image from 'next/image';

function Marquee() {
  return (
    <div className="marquee-container">
      <div style={{display:'flex', alignItems:'center'}} className="marquee-text">Envíos gratis en compras superiores a $49.999 -  <Image style={{margin:4}} width={40} src={mp} alt="mp" />  -  <Image style={{margin:4}} width={40} src={mastercard} alt="mp" />  -  <Image style={{margin:4}} width={40} src={visa} alt="mp" />  - Envíos por <Image style={{margin:10}} width={100} src={andreani} alt='andreani'/> y por <Image width={100} src={correoarg} alt='correo'/> </div>
    </div>
  );
}

export default Marquee;
