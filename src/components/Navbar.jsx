import React from 'react';
import { Menu, ShoppingCart, User as UserIcon, LogOut, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useSessionTimer } from '../hooks/useSessionTimer';
import { useTheme } from '../hooks/useTheme';

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const { formattedTime, isExpired } = useSessionTimer();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="flex h-[72px] w-full items-center gap-x-4 glass-card px-4 sm:gap-x-6 sm:px-6 transition-all duration-300">
            <button
                type="button"
                className="-m-2.5 p-2.5 text-slate-700 dark:text-slate-300 lg:hidden hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-xl transition-all"
                onClick={toggleSidebar}
            >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between items-center">
                {/* Session Timer */}
                <div className="flex items-center gap-2 text-sm ml-auto">
                    <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-medium">Session expires in:</span>
                    <span className={`font-mono font-bold px-3 py-1.5 rounded-lg transition-colors border duration-300 shadow-sm ${isExpired ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/40 dark:border-red-800 dark:text-red-400 animate-pulse' : 'bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-900/30 dark:border-brand-800/50 dark:text-brand-400'}`}>
                        {formattedTime}
                    </span>
                </div>

                <div className="flex items-center gap-x-3 sm:gap-x-4 lg:gap-x-6">
                    {/* Separator */}
                    <div className="hidden lg:block lg:h-8 lg:w-px lg:bg-slate-200/50 dark:lg:bg-slate-700/50" aria-hidden="true" />

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-amber-400 transition-all duration-300 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 shadow-sm border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50"
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative p-2.5 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-all duration-300 group rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 shadow-sm border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50">
                        <span className="sr-only">View cart</span>
                        <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 shadow-lg shadow-brand-500/50 rounded-full min-w-[20px] h-[20px]">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Profile dropdown / Logout */}
                    <div className="flex items-center gap-2 pl-2 lg:pl-0 border-l lg:border-none border-slate-200/50 dark:border-slate-700/50">
                        <Link to="/profile" className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 cursor-pointer">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shadow-md">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="text-sm font-semibold leading-6 text-slate-900 dark:text-white" aria-hidden="true">
                                {user?.name || 'User'}
                            </span>
                        </Link>
                        <Link to="/profile" className="lg:hidden p-2.5 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors shadow-sm border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50">
                            <UserIcon className="w-5 h-5" />
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="p-2.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300 shadow-sm border border-transparent hover:border-red-100 dark:hover:border-red-900/50 group"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

