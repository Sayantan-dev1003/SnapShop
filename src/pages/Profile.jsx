import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Lock, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [message, setMessage] = useState({ type: '', text: '' });
    const [isEditing, setIsEditing] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!name || !email || !currentPassword) {
            setMessage({ type: 'error', text: 'Name, email, and current password are required' });
            return;
        }

        if (!validateEmail(email)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address' });
            return;
        }

        if (newPassword && newPassword.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
            return;
        }

        const result = updateProfile(name, email, currentPassword, newPassword);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully' });
            setCurrentPassword('');
            setNewPassword('');
            setIsEditing(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Profile Settings</h1>
                    <p className="mt-2 text-base font-medium text-slate-500 dark:text-slate-400">
                        Manage your account details and security preferences.
                    </p>
                </div>
            </div>

            <div className="glass-card rounded-[2.5rem] shadow-xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
                {/* Header decoration */}
                <div className="h-40 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, white 20%, white 80%, transparent 80%, transparent)' }}></div>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-300 opacity-20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="px-6 sm:px-12 pb-12">
                    <div className="relative -mt-20 mb-10 flex items-end justify-between">
                        <div className="w-36 h-36 rounded-[2rem] bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-3 shadow-2xl border border-white dark:border-slate-700 relative group">
                            <div className="absolute inset-0 bg-brand-500/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-full h-full bg-gradient-to-br from-brand-50 to-indigo-50 dark:from-brand-900/40 dark:to-indigo-900/40 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-800/30">
                                <User className="w-14 h-14" />
                            </div>
                        </div>

                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 text-brand-700 dark:text-brand-400 font-extrabold rounded-xl transition-colors border border-slate-200 dark:border-slate-700 shadow-sm shadow-brand-500/5 active:scale-95"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {message.text && (
                        <div className={`mb-8 p-4 rounded-2xl flex items-start gap-3 border animate-in fade-in zoom-in duration-300 shadow-sm ${message.type === 'success'
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-100 dark:border-red-800/30'
                            }`}>
                            {message.type === 'success' ? (
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                            )}
                            <div className="font-bold text-sm leading-6">{message.text}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700/50 pb-3 mb-6">
                                    Personal Information
                                </h3>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="name">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className={`h-5 w-5 transition-colors ${isEditing ? 'text-slate-400 group-focus-within:text-brand-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                        </div>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`input-premium pl-11 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-50/50 dark:disabled:bg-slate-800/30 ${!isEditing ? 'border-dashed' : ''}`}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className={`h-5 w-5 transition-colors ${isEditing ? 'text-slate-400 group-focus-within:text-brand-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            className={`input-premium pl-11 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-50/50 dark:disabled:bg-slate-800/30 ${!isEditing ? 'border-dashed' : ''}`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700/50 pb-3 mb-6 flex items-center gap-2 relative">
                                    <ShieldCheck className="w-6 h-6 text-brand-500 dark:text-brand-400" />
                                    Security Controls
                                    {!isEditing && <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">Protected</span>}
                                </h3>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="currentPassword">
                                        Current Password {isEditing && <span className="text-red-500">*</span>}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className={`h-5 w-5 transition-colors ${isEditing ? 'text-slate-400 group-focus-within:text-brand-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                        </div>
                                        <input
                                            id="currentPassword"
                                            type="password"
                                            className={`input-premium pl-11 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-50/50 dark:disabled:bg-slate-800/30 ${!isEditing ? 'border-dashed' : ''}`}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            disabled={!isEditing}
                                            placeholder={isEditing ? "Required to verify changes" : "••••••••"}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="newPassword">
                                        New Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className={`h-5 w-5 transition-colors ${isEditing ? 'text-slate-400 group-focus-within:text-brand-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                        </div>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            className={`input-premium pl-11 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-50/50 dark:disabled:bg-slate-800/30 ${!isEditing ? 'border-dashed' : ''}`}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            disabled={!isEditing}
                                            placeholder={isEditing ? "Leave blank to keep current" : "••••••••"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="pt-8 mt-10 border-t border-slate-200 dark:border-slate-700/50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setName(user?.name || '');
                                        setEmail(user?.email || '');
                                        setCurrentPassword('');
                                        setNewPassword('');
                                        setMessage({ type: '', text: '' });
                                    }}
                                    className="w-full sm:w-auto px-8 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-extrabold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary w-full sm:w-auto px-10 py-3 shadow-brand-500/30 font-extrabold"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
