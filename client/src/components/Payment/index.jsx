// components/VisaComponent.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VisaComponent from './VisaComponent';
import KlarnaComponent from './KlarnaComponent';
import PayPalComponent from './PayPalComponent';
import '../Payment/Bank.css';
const Payment = () => {
    const location = useLocation();
    useEffect(() => {
        console.log('the payment is,  ', location.state?.payment);
    },[])

    if(location.state?.payment === 'Bank1' ){
        return <VisaComponent/>
    }
    if(location.state?.payment === 'Bank2'){
        return <KlarnaComponent/>
    }
    return  <PayPalComponent/>
  };
  
  export default Payment;