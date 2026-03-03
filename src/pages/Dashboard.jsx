import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSessionTimer } from '../hooks/useSessionTimer';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, Clock, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const { formattedTime, isExpired } = useSessionTimer();

    const quickLinks = [
        { name: 'Browse Products', icon: ShoppingBag, href: '/products', color: 'bg-brand-500', hoverColor: 'group-hover:text-brand-600' },
        { name: 'View Cart', icon: ShoppingCart, href: '/cart', color: 'bg-emerald-500', hoverColor: 'group-hover:text-emerald-600' },
        { name: 'Edit Profile', icon: User, href: '/profile', color: 'bg-indigo-500', hoverColor: 'group-hover:text-indigo-600' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500 dark:from-brand-400 dark:to-indigo-400">{user?.name?.split(' ')[0] || 'User'}</span>! 👋
                    </h1>
                    <p className="mt-2 text-base font-medium text-slate-500 dark:text-slate-400">
                        Here's what's happening with your store today.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 mt-4 md:mt-0 transition-all hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800/50">
                    <div className={`p-3 rounded-2xl ${isExpired ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 animate-pulse' : 'bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400'}`}>
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Session Time</p>
                        <p className={`text-2xl font-mono font-black border-b-2 border-transparent ${isExpired ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                            {formattedTime}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.href}
                        className="group relative glass-card p-6 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-800/60 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-[2] ${link.color}`}></div>

                        <div className="relative flex items-center justify-between z-10">
                            <div className={`p-4 rounded-2xl ${link.color} text-white shadow-lg shadow-current/30 group-hover:scale-110 transition-transform duration-300`}>
                                <link.icon className="w-8 h-8" />
                            </div>
                            <div className={`w-12 h-12 rounded-full bg-white/50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors ${link.hoverColor} group-hover:bg-white dark:group-hover:bg-slate-700 backdrop-blur-sm shadow-sm`}>
                                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </div>

                        <h3 className="mt-8 text-xl font-bold text-slate-900 dark:text-white relative z-10">{link.name}</h3>
                        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400 relative z-10">
                            Quick access to your {link.name.toLowerCase().split(' ')[1]}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Decorative banner */}
            <div className="mt-10 bg-gradient-to-br from-brand-600 via-indigo-700 to-purple-800 dark:from-brand-800 dark:via-indigo-900 dark:to-purple-900 rounded-[2.5rem] p-10 sm:p-14 text-white shadow-2xl shadow-brand-900/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6bTE5IDE5VjFIMUMxdjE4aDE4eiIgZmlsbD0icmdiYSgyNTUsIDI1NSLCAyNTUsIDAuMDUpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 group-hover:scale-125 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-300 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 group-hover:scale-125 transition-transform duration-1000 delay-100"></div>

                <div className="relative z-10 max-w-2xl">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-white/20 text-white/90">
                        Just Arrived
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-sm">Discover New Collection</h2>
                    <p className="text-brand-100/90 mb-10 text-lg sm:text-xl leading-relaxed font-medium">
                        Check out the latest products added to our catalog. We've updated our inventory with premium items you'll absolutely love.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-3 bg-white text-brand-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 hover:scale-[1.02] transition-all shadow-xl shadow-brand-900/30 active:scale-95 group/btn"
                    >
                        Start Shopping
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
