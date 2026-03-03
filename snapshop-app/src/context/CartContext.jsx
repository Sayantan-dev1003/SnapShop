import React, { createContext, useState, useEffect, useContext } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { AuthContext } from './AuthContext';
import { useToast } from '../hooks/useToast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { addToast } = useToast();
    const [cart, setCart] = useState([]);

    // Load user's cart on login/mount
    useEffect(() => {
        if (user) {
            const savedCart = getStorageItem(`snapshop_cart_${user.id}`);
            setCart(savedCart || []);
        } else {
            setCart([]);
        }
    }, [user]);

    // Save cart when it changes
    useEffect(() => {
        if (user) {
            setStorageItem(`snapshop_cart_${user.id}`, cart);
        }
    }, [cart, user]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        addToast(`Added ${product.title} to your cart`, 'success');
    };

    const removeFromCart = (productId) => {
        const itemToRemove = cart.find(item => item.id === productId);
        setCart(prev => prev.filter(item => item.id !== productId));
        if (itemToRemove) {
            addToast(`Removed ${itemToRemove.title} from your cart`, 'info');
        }
    };

    const updateQuantity = (productId, amount) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, item.quantity + amount);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            subtotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
