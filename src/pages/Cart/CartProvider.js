// CartContext.js
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const fetchCart = () => {
        return fetch('http://localhost:3001/cart', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            setCart(data); // hoặc data.items nếu bạn dùng .items
            setCartCount(data.length); // hoặc data.items.length
        });
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, cartCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
}
