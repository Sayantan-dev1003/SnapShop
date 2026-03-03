import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ShoppingCart, User, X, ShoppingBasket } from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Profile', href: '/profile', icon: User },
];

const Sidebar = ({ closeSidebar }) => {
    return (
        <div className="flex flex-col h-full gap-y-5 overflow-y-auto glass-card px-6 pb-4 transition-all duration-300">
            <div className="flex h-20 shrink-0 items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group px-2">
                    <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2.5 rounded-xl group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-500/30 transition-all duration-300 shadow-md">
                        <ShoppingBasket className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tight">
                        SnapShop
                    </span>
                </Link>
                <button
                    className="lg:hidden p-2 -mr-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
                    onClick={closeSidebar}
                >
                    <X className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex flex-1 flex-col mt-4">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="space-y-2">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.href}
                                        onClick={closeSidebar}
                                        className={({ isActive }) => `
                      group flex gap-x-4 rounded-xl p-3.5 text-sm leading-6 font-semibold transition-all duration-300 relative overflow-hidden
                      ${isActive
                                                ? 'text-brand-700 dark:text-brand-300 shadow-sm'
                                                : 'text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300'
                                            }
                    `}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {/* Active background highlight */}
                                                {isActive && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-100/80 to-transparent dark:from-brand-900/40 dark:to-transparent opacity-100 rounded-xl" />
                                                )}
                                                {/* Active border indicator */}
                                                {isActive && (
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 rounded-l-xl" />
                                                )}

                                                <item.icon
                                                    className={`h-6 w-6 shrink-0 z-10 transition-colors duration-300 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-brand-500 dark:group-hover:text-brand-400'}`}
                                                    aria-hidden="true"
                                                />
                                                <span className="z-10">{item.name}</span>
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
