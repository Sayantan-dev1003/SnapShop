import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ShoppingBasket, Mail, Lock, User as UserIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const result = register(name, email, password);
            setIsLoading(false);

            if (result.success) {
                setSuccess(true);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(result.message);
            }
        }, 600);
    };

    return (
        <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 transition-colors flex-row-reverse">
            {/* Right side: Form (Reversed layout for differentiation from Login) */}
            <div className="flex flex-1 flex-col justify-center relative px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 mx-auto lg:mx-0">
                {/* Decorative background blur for mobile/tablet */}
                <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-brand-300 dark:bg-brand-900/40 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-30 lg:hidden animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

                <div className="w-full max-w-md mx-auto z-10">
                    <div className="glass-panel rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-brand-400 to-brand-600"></div>

                        <div className="text-center mb-10">
                            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                                <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-3 rounded-2xl shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300">
                                    <ShoppingBasket className="h-8 w-8 text-white" />
                                </div>
                            </Link>
                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Create an account</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Join SnapShop to start shopping</p>
                        </div>

                        {error && (
                            <div className="mb-6 flex items-start gap-3 p-4 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/30 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p className="font-medium">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 flex items-start gap-3 p-4 text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30 animate-in fade-in zoom-in duration-300">
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5 text-emerald-500" />
                                <p className="font-medium">Registration successful! Redirecting to login...</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="name">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="input-premium pl-11"
                                        placeholder="John Doe"
                                        disabled={success}
                                    />
                                </div>
                            </div>

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
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-premium pl-11"
                                        placeholder="you@example.com"
                                        disabled={success}
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
                                        placeholder="At least 6 characters"
                                        disabled={success}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || success}
                                className="btn-primary w-full mt-6 py-3.5 text-base font-bold shadow-brand-500/40"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 hover:underline transition-all">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Left side: Decorative gradient panel */}
            <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-slate-900 border-r border-slate-200 dark:border-slate-800">
                {/* Visual Art pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-brand-900 to-indigo-800 opacity-90"></div>

                {/* Floating bubbles */}
                <div className="absolute top-[30%] left-[10%] w-[20rem] h-[20rem] bg-indigo-500/40 rounded-full mix-blend-overlay filter blur-3xl opacity-60 animate-[pulse_5s_ease-in-out_infinite]"></div>
                <div className="absolute top-[10%] right-[10%] w-[15rem] h-[15rem] bg-brand-400/50 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-[pulse_7s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-[20%] right-[20%] w-[25rem] h-[25rem] bg-blue-500/30 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>

                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6bTE5IDE5VjFIMUMxdjE4aDE4eiIgZmlsbD0icmdiYSgyNTUsIDI1NSLCAyNTUsIDAuMDMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
                    <div className="glass-card mb-10 p-8 rounded-3xl border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
                        <ShoppingBasket className="h-20 w-20 text-white" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-indigo-200">Future</span></h2>
                    <p className="text-xl text-brand-100/90 max-w-lg leading-relaxed font-medium">
                        Create an account today to build your custom shopping catalog and enjoy personalized features.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
