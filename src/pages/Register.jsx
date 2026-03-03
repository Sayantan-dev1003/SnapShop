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
        <div className="flex min-h-screen items-center justify-center w-full bg-slate-50 dark:bg-slate-950 transition-colors p-4 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-300 dark:bg-brand-900/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-pulse-slow pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-300 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-[pulse_5s_cubic-bezier(0.4,0,0.6,1)_infinite] pointer-events-none"></div>

            <div className="w-full max-w-md mx-auto z-10 relative">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 sm:p-10 shadow-xl border border-slate-100 dark:border-slate-800">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                            <div className="bg-brand-500 p-3 rounded-2xl shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300">
                                <ShoppingBasket className="h-8 w-8 text-white" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Create an account</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Join SnapShop to start shopping</p>
                    </div>

                    {error && (
                        <div className="mb-6 flex items-start gap-3 p-4 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/30">
                            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 flex items-start gap-3 p-4 text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
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
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-premium pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
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
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-premium pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
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
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-premium pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
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
    );
};

export default Register;
