import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShoppingBasket, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            const result = login(email, password);
            setIsLoading(false);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message);
            }
        }, 600);
    };

    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors">
            {/* Left side: Form */}
            <div className="flex flex-1 flex-col justify-center relative px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 mx-auto lg:mx-0">
                {/* Decorative background blur for mobile/tablet */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-300 dark:bg-brand-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 lg:hidden animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                <div className="w-full max-w-md mx-auto z-10">
                    <div className="glass-panel rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600"></div>

                        <div className="text-center mb-10">
                            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                                <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-3 rounded-2xl shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300">
                                    <ShoppingBasket className="h-8 w-8 text-white" />
                                </div>
                            </Link>
                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Welcome back</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Sign in to your account to continue</p>
                        </div>

                        {error && (
                            <div className="mb-6 flex items-start gap-3 p-4 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/30 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p className="font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-premium pl-11"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-premium pl-11"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full mt-6 py-3.5 text-base font-bold shadow-brand-500/40"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-5 w-5 ml-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 hover:underline transition-all">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side: Decorative gradient panel */}
            <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-slate-900 border-l border-slate-200 dark:border-slate-800">
                {/* Stunning gradient mesh background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-800 to-slate-900 opacity-90"></div>

                {/* Animated Orbs */}
                <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-brand-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-[pulse_6s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-[10%] right-[20%] w-[30rem] h-[30rem] bg-indigo-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: '3s' }}></div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6bTE5IDE5VjFIMUMxdjE4aDE4eiIgZmlsbD0icmdiYSgyNTUsIDI1NSLCAyNTUsIDAuMDUpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                    <div className="glass-card mb-10 p-8 rounded-3xl border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
                        <ShoppingBasket className="h-20 w-20 text-white" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-white">SnapShop</span></h2>
                    <p className="text-xl text-brand-100/90 max-w-lg leading-relaxed font-medium">
                        Discover the best products with an incredibly fast, premium dashboard experience tailored just for you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
