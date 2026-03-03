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
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 pb-4 h-full shadow-sm transition-colors">
            <div className="flex h-16 shrink-0 items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-brand-600 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md shadow-brand-200">
                        <ShoppingBasket className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500 tracking-tight">
                        SnapShop
                    </span>
                </Link>
                <button
                    className="lg:hidden p-2 -mr-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    onClick={closeSidebar}
                >
                    <X className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex flex-1 flex-col mt-4">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-2">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.href}
                                        onClick={closeSidebar}
                                        className={({ isActive }) => `
                      group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium transition-all duration-200
                      ${isActive
                                                ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 shadow-sm'
                                                : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-brand-400 dark:hover:bg-slate-800'
                                            }
                    `}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon
                                                    className={`h-6 w-6 shrink-0 transition-colors ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400'}`}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
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
