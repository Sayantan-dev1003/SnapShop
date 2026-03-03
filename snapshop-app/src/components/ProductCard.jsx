import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white dark:bg-slate-800 p-6 relative lg:aspect-none lg:h-64">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm capitalize">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2" title={product.title}>
                        {product.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1">
                        <div className="flex items-center text-amber-400 text-sm">
                            ★ {product.rating?.rate || 0}
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            ({product.rating?.count || 0} reviews)
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-slate-900 dark:text-white border-b border-transparent group-hover:border-brand-300 dark:group-hover:border-brand-500 transition-colors pb-0.5">
                        ${product.price?.toFixed(2)}
                    </p>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-600 dark:hover:bg-brand-500 hover:text-white dark:hover:text-white hover:shadow-md transition-all duration-300 transform active:scale-95"
                        aria-label="Add to cart"
                        title="Add to cart"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
