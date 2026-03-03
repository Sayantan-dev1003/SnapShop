import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in duration-500">
                <div className="bg-brand-50 dark:bg-brand-900/30 p-6 rounded-full text-brand-500 dark:text-brand-400 mb-6 shadow-inner">
                    <ShoppingBag className="h-16 w-16" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Your cart is empty</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-lg">
                    Looks like you haven't added any products to your cart yet.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/30 active:scale-95"
                >
                    Start Shopping
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Your Cart</h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Review your items and proceed to checkout.
                    </p>
                </div>

                <button
                    onClick={clearCart}
                    className="flex items-center gap-2 px-5 py-2.5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 font-semibold rounded-xl transition-colors active:scale-95 self-start md:self-end"
                >
                    <Trash2 className="w-4 h-4" />
                    Empty Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-8 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow relative group glass-card">
                            <div className="sm:w-32 sm:h-32 flex-shrink-0 bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-50 dark:border-slate-700 relative overflow-hidden flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
                                />
                            </div>

                            <div className="flex flex-col flex-1 pb-1">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">{item.title}</h3>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 capitalize px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 inline-block font-medium border border-slate-200 dark:border-slate-700">
                                            {item.category}
                                        </p>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white whitespace-nowrap bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 flex items-center justify-between">
                                    <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden h-11">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="px-3 h-full text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:bg-slate-100 dark:active:bg-slate-700 flex items-center justify-center border-r border-slate-200 dark:border-slate-700"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 h-full flex items-center justify-center border-t border-b border-transparent">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="px-3 h-full text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:bg-slate-100 dark:active:bg-slate-700 flex items-center justify-center border-l border-slate-200 dark:border-slate-700"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2.5 text-slate-400 hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-red-500 dark:hover:bg-red-600 rounded-xl transition-colors shadow-sm"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24 glass-card">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">Order Summary</h2>

                        <dl className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex justify-between items-center">
                                <dt className="text-slate-500 dark:text-slate-400">Subtotal</dt>
                                <dd className="font-medium text-slate-900 dark:text-white text-base">${subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-slate-500 dark:text-slate-400">Estimated Tax (10%)</dt>
                                <dd className="font-medium text-slate-900 dark:text-white text-base">${tax.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-medium pb-4 border-b border-slate-100 dark:border-slate-800">
                                <dt>Shipping</dt>
                                <dd className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/30">Free</dd>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <dt className="text-lg font-bold text-slate-900 dark:text-white">Total</dt>
                                <dd className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">${total.toFixed(2)}</dd>
                            </div>
                        </dl>

                        <button className="w-full mt-8 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold py-4 px-4 rounded-xl transition-colors shadow-lg shadow-slate-900/20 dark:shadow-none active:scale-[0.98] flex items-center justify-center gap-2 group">
                            Proceed to Checkout
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="mt-6 text-center">
                            <Link to="/products" className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors inline-block hover:underline underline-offset-4">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
