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
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8 transition-colors">
            <button
                type="button"
                className="-m-2.5 p-2.5 text-slate-700 dark:text-slate-300 lg:hidden hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                onClick={toggleSidebar}
            >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between items-center">
                {/* Session Timer */}
                <div className="flex items-center gap-2 text-sm ml-auto">
                    <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-medium">Session expires in:</span>
                    <span className={`font-mono font-bold px-2.5 py-1 rounded-md transition-colors duration-300 ${isExpired ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 animate-pulse' : 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'}`}>
                        {formattedTime}
                    </span>
                </div>

                <div className="flex items-center gap-x-3 sm:gap-x-4 lg:gap-x-6">
                    {/* Separator */}
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200 dark:lg:bg-slate-700" aria-hidden="true" />

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-amber-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative p-2 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors group rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                        <span className="sr-only">View cart</span>
                        <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 rounded-full shadow-sm">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Profile dropdown / Logout */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="hidden lg:flex lg:items-center mr-2">
                            <span className="text-sm font-semibold leading-6 text-slate-900 dark:text-white" aria-hidden="true">
                                {user?.name || 'User'}
                            </span>
                        </span>
                        <Link to="/profile" className="p-1.5 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 rounded-full hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors">
                            <UserIcon className="w-5 h-5" />
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="p-1.5 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

