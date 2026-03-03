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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Profile Settings</h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage your account details and security preferences.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden glass-card">
                {/* Header decoration */}
                <div className="h-32 bg-gradient-to-r from-brand-600 to-indigo-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, white 20%, white 80%, transparent 80%, transparent)' }}></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="px-6 sm:px-10 pb-10">
                    <div className="relative -mt-16 mb-8 flex items-end justify-between">
                        <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-800 p-2 shadow-lg border border-slate-100 dark:border-slate-700 relative group">
                            <div className="absolute inset-0 bg-brand-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-full h-full bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400">
                                <User className="w-12 h-12" />
                            </div>
                        </div>

                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 text-brand-700 dark:text-brand-400 font-bold rounded-xl transition-colors border border-brand-100 dark:border-brand-800 shadow-sm active:scale-95"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {message.text && (
                        <div className={`mb-8 p-4 rounded-2xl flex items-start gap-3 border animate-in fade-in zoom-in duration-300 ${message.type === 'success'
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-100 dark:border-red-800/30'
                            }`}>
                            {message.type === 'success' ? (
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                            )}
                            <div className="font-medium text-sm leading-6">{message.text}</div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">
                                    Personal Information
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="name">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                        </div>
                                        <input
                                            id="name"
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50 dark:bg-slate-800 text-sm transition-all outline-none disabled:opacity-70 disabled:bg-slate-100 dark:disabled:bg-slate-800/50 font-medium text-slate-900 dark:text-white disabled:cursor-not-allowed"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50 dark:bg-slate-800 text-sm transition-all outline-none disabled:opacity-70 disabled:bg-slate-100 dark:disabled:bg-slate-800/50 font-medium text-slate-900 dark:text-white disabled:cursor-not-allowed"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security */}
                            <div className="space-y-5">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-brand-500 dark:text-brand-400" />
                                    Security Controls
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="currentPassword">
                                        Current Password {isEditing && <span className="text-red-500">*</span>}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                        </div>
                                        <input
                                            id="currentPassword"
                                            type="password"
                                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm transition-all outline-none disabled:opacity-70 disabled:bg-slate-100 dark:disabled:bg-slate-800/50 disabled:cursor-not-allowed"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            disabled={!isEditing}
                                            placeholder={isEditing ? "Required to verify changes" : "••••••••"}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="newPassword">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                        </div>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm transition-all outline-none disabled:opacity-70 disabled:bg-slate-100 dark:disabled:bg-slate-800/50 disabled:cursor-not-allowed"
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
                            <div className="pt-6 mt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
                                    className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-md active:scale-95"
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
