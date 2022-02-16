import React, { useEffect, useState } from 'react'
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    
    return (
        <div>
            <ToastContainer/>
            <Cart/>
        </div>
    )
}
