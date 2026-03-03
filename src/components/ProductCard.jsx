import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="group relative flex flex-col glass-card border border-slate-200/60 dark:border-slate-700/60 overflow-hidden hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1.5 transition-all duration-300 h-full">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-white/60 dark:bg-slate-800/60 mix-blend-multiply dark:mix-blend-normal p-6 relative lg:aspect-none lg:h-64 border-b border-slate-100 dark:border-slate-700/50">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-brand-700 dark:text-brand-300 shadow-sm border border-brand-100/50 dark:border-brand-800/50 capitalize">
                        {product.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight" title={product.title}>
                        {product.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5">
                        <div className="flex items-center text-amber-500 text-sm font-bold">
                            ★ {product.rating?.rate || 0}
                        </div>
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                            {product.rating?.count || 0} reviews
                        </span>
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white pb-0.5 flex items-start">
                        <span className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 mr-0.5">$</span>
                        {product.price?.toFixed(2)}
                    </p>
                    <button
                        onClick={() => addToCart(product)}
                        className="btn-primary px-3 py-2.5 rounded-xl shadow-brand-500/20 group-hover:shadow-brand-500/40"
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
