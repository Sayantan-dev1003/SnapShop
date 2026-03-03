import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Filter, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { useRef, useCallback } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [displayLimit, setDisplayLimit] = useState(8);

    // Reset limit when filters change
    useEffect(() => {
        setDisplayLimit(8);
    }, [searchTerm, selectedCategory]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('https://fakestoreapi.com/products');
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            setProducts(data);

            // Extract unique categories
            const uniqueCategories = [...new Set(data.map(p => p.category))];
            setCategories(uniqueCategories);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && displayLimit < filteredProducts.length) {
                // Simulate network delay for realistic infinite scroll feel
                setTimeout(() => {
                    setDisplayLimit(prev => prev + 4);
                }, 500);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, displayLimit, filteredProducts.length]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Our Products</h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Browse our collection of high-quality items.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 glass-card z-10 relative">
                <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm transition-all outline-none"
                        placeholder="Search products by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="sm:w-64 flex items-center gap-2 group relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
                        <Filter className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-500 transition-colors" />
                    </div>
                    <select
                        className="block w-full py-3 pl-10 pr-10 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50 dark:bg-slate-800 text-sm appearance-none outline-none cursor-pointer hover:bg-white dark:hover:bg-slate-700 transition-colors capitalize font-medium text-slate-700 dark:text-slate-300 relative z-0"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none z-10">
                        <svg className="h-4 w-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
            </div>

            {error && (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/20 shadow-sm">
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                        <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Oops! Something went wrong</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">{error}</p>
                    <button
                        onClick={fetchProducts}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold rounded-xl transition-all shadow-md active:scale-95 group"
                    >
                        <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </button>
                </div>
            )}

            {loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 h-[380px] flex flex-col animate-pulse">
                            <div className="h-48 bg-slate-200/60 dark:bg-slate-800 rounded-xl mb-6 w-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/20 to-transparent"></div>
                            </div>
                            <div className="h-4 bg-slate-200/80 dark:bg-slate-800 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-slate-200/80 dark:bg-slate-800 rounded w-1/2 mb-auto"></div>
                            <div className="mt-4 flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="h-6 bg-slate-200/80 dark:bg-slate-800 rounded w-1/4"></div>
                                <div className="h-10 w-10 bg-slate-200/80 dark:bg-slate-800 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm glass-card">
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-full text-slate-400 dark:text-slate-500 mb-5 border border-slate-100 dark:border-slate-700 shadow-inner">
                        <Search className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No products found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-lg">
                        Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <button
                        onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                        className="px-6 py-3 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 font-bold rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors hover:shadow-md active:scale-95"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.slice(0, displayLimit).map((product, index) => {
                            if (index === displayLimit - 1 || index === filteredProducts.slice(0, displayLimit).length - 1) {
                                return (
                                    <div ref={lastElementRef} key={product.id} className="h-full">
                                        <ProductCard product={product} />
                                    </div>
                                );
                            }
                            return <ProductCard key={product.id} product={product} />;
                        })}
                    </div>

                    {displayLimit < filteredProducts.length && (
                        <div className="flex justify-center pb-8 animate-in fade-in duration-300">
                            <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                        </div>
                    )}
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
        </div>
    );
};

export default Products;
