import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSessionTimer } from '../hooks/useSessionTimer';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, Clock, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { formattedTime, isExpired } = useSessionTimer();

    const quickLinks = [
        { name: 'Browse Products', icon: ShoppingBag, href: '/products', color: 'bg-blue-500', hoverColor: 'group-hover:text-blue-600' },
        { name: 'View Cart', icon: ShoppingCart, href: '/cart', color: 'bg-emerald-500', hoverColor: 'group-hover:text-emerald-600' },
        { name: 'Edit Profile', icon: User, href: '/profile', color: 'bg-purple-500', hoverColor: 'group-hover:text-purple-600' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Here's what's happening with your store today.
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-5 py-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mt-4 md:mt-0 glass-card transition-all hover:shadow-md">
                    <div className={`p-2.5 rounded-xl ${isExpired ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 animate-pulse' : 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'}`}>
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Session Time</p>
                        <p className={`text-xl font-mono font-bold leading-none ${isExpired ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                            {formattedTime}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {quickLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.href}
                        className="group relative bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden glass-card"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 rounded-full opacity-5 transition-transform duration-500 group-hover:scale-150 ${link.color}`}></div>

                        <div className="relative flex items-center justify-between z-10">
                            <div className={`p-4 rounded-2xl ${link.color} text-white shadow-lg shadow-slate-200 dark:shadow-none group-hover:scale-110 transition-transform duration-300`}>
                                <link.icon className="w-8 h-8" />
                            </div>
                            <div className={`w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors ${link.hoverColor} group-hover:bg-slate-100 dark:group-hover:bg-slate-700`}>
                                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white relative z-10">{link.name}</h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 relative z-10">
                            Quick access to your {link.name.toLowerCase().split(' ')[1]}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Decorative banner */}
            <div className="mt-8 bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-700 dark:from-brand-800 dark:via-indigo-900 dark:to-purple-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400 opacity-20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10 max-w-xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm border border-white/10">
                        Just Arrived
                    </span>
                    <h2 className="text-3xl font-bold mb-3">Discover New Collection</h2>
                    <p className="text-brand-100 mb-8 text-lg leading-relaxed max-w-md">
                        Check out the latest products added to our catalog. We've updated our inventory with premium items you'll absolutely love.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-white text-brand-700 px-7 py-3.5 rounded-xl font-bold hover:bg-brand-50 hover:scale-105 transition-all shadow-lg shadow-brand-900/20 active:scale-95"
                    >
                        Start Shopping
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
