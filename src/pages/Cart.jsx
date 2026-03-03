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
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-6 animate-in zoom-in-95 duration-500 glass-card border-slate-200/60 dark:border-slate-800/60 max-w-xl mx-auto rounded-[2rem] py-12 mt-10 shadow-lg shadow-brand-500/5">
                <div className="bg-gradient-to-br from-brand-100 to-white dark:from-brand-900/40 dark:to-transparent p-6 rounded-3xl text-brand-500 dark:text-brand-400 mb-6 border border-white dark:border-slate-700 shadow-inner">
                    <ShoppingBag className="h-16 w-16 opacity-80" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight drop-shadow-sm">Your cart is empty</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 text-base font-medium">
                    Looks like you haven't added any products to your cart yet.
                </p>
                <Link
                    to="/products"
                    className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base shadow-brand-500/20 font-bold"
                >
                    Start Shopping
                    <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Your Cart</h1>
                    <p className="mt-2 text-base font-medium text-slate-500 dark:text-slate-400">
                        Review your items and proceed to checkout.
                    </p>
                </div>

                <button
                    onClick={clearCart}
                    className="flex items-center gap-2 px-6 py-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 font-bold rounded-xl transition-all active:scale-95 self-start md:self-end border border-transparent hover:border-red-200 dark:hover:border-red-800"
                >
                    <Trash2 className="w-5 h-5" />
                    Empty Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-8 space-y-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-6 glass-card p-6 sm:p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/60 hover:shadow-2xl hover:-translate-y-1 hover:shadow-brand-500/5 transition-all duration-300 relative group">
                            <div className="sm:w-36 sm:h-36 flex-shrink-0 bg-white/60 dark:bg-slate-800/60 rounded-2xl p-3 border border-slate-100 dark:border-slate-700 relative overflow-hidden flex items-center justify-center mix-blend-normal backdrop-blur-sm">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            <div className="flex flex-col flex-1 pb-1">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight pr-4">{item.title}</h3>
                                        <p className="mt-2 text-xs text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/20 inline-block border border-brand-100 dark:border-brand-800/30">
                                            {item.category}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-slate-900 dark:text-white whitespace-nowrap bg-slate-50/50 dark:bg-slate-800/50 px-4 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700/50 backdrop-blur-sm">
                                            <span className="text-sm text-slate-400 mr-0.5">$</span>{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-1">
                                            ${item.price.toFixed(2)} each
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 flex items-center justify-between">
                                    <div className="flex items-center bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden h-12 shadow-sm backdrop-blur-sm">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-12 h-full text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-slate-700 transition-colors active:bg-slate-100 flex items-center justify-center border-r border-slate-200 dark:border-slate-700 font-medium"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="w-14 text-center font-bold text-lg text-slate-900 dark:text-white h-full flex items-center justify-center bg-transparent">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-12 h-full text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white dark:hover:bg-slate-700 transition-colors active:bg-slate-100 flex items-center justify-center border-l border-slate-200 dark:border-slate-700 font-medium"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-3 text-slate-400 hover:text-red-600 dark:hover:text-red-400 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-4">
                    <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl shadow-brand-500/5 border border-slate-200/60 dark:border-slate-700/60 sticky top-32 overflow-hidden relative">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-400 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 pb-6 border-b border-slate-200 dark:border-slate-700 relative z-10">Order Summary</h2>

                        <dl className="space-y-5 text-base text-slate-600 dark:text-slate-400 relative z-10">
                            <div className="flex justify-between items-center">
                                <dt className="font-semibold">Subtotal</dt>
                                <dd className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="font-semibold">Estimated Tax (10%)</dt>
                                <dd className="font-bold text-slate-900 dark:text-white">${tax.toFixed(2)}</dd>
                            </div>
                            <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-bold pb-6 border-b border-slate-200 dark:border-slate-700">
                                <dt>Shipping</dt>
                                <dd className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/30 uppercase tracking-wide text-xs">Free</dd>
                            </div>
                            <div className="flex justify-between items-baseline pt-2">
                                <dt className="text-xl font-extrabold text-slate-900 dark:text-white">Total</dt>
                                <dd className="text-4xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm flex items-start">
                                    <span className="text-2xl mt-1 mr-1 text-slate-400">$</span>
                                    {total.toFixed(2)}
                                </dd>
                            </div>
                        </dl>

                        <button className="btn-primary w-full mt-10 py-5 text-lg font-extrabold shadow-brand-500/30 group relative z-10">
                            Proceed to Checkout
                            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="mt-8 text-center relative z-10">
                            <Link to="/products" className="text-base font-bold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-block hover:underline underline-offset-4">
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
