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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Profile Settings</h1>
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                        Manage your account details and security preferences.
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary px-6 py-2 border-slate-200 shadow-sm"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 p-8 sm:p-10">
                <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-24 h-24 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name || 'User'}</h2>
                        <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-xs font-bold rounded-full">
                            Active Account
                        </span>
                    </div>
                </div>

                {message.text && (
                    <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 border animate-in fade-in zoom-in duration-300 shadow-sm ${message.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-100 dark:border-red-800/30'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        )}
                        <div className="font-bold text-sm leading-5">{message.text}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Personal Information */}
                        <div className="space-y-5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-slate-400" />
                                Personal Information
                            </h3>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="name">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                        <User className={`h-5 w-5 transition-colors ${isEditing ? 'text-slate-400 group-focus-within:text-brand-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        className={`input-premium pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 disabled:opacity-60 disabled:bg-slate-100 dark:disabled:bg-slate-800/30 ${!isEditing ? 'border-transparent shadow-none' : ''}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                        <Mail className={`h-5 w-5 transition-colors ${isEditing ? 'text-slate-400 group-focus-within:text-brand-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        className={`input-premium pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 disabled:opacity-60 disabled:bg-slate-100 dark:disabled:bg-slate-800/30 ${!isEditing ? 'border-transparent shadow-none' : ''}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="space-y-5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                                    Security Controls
                                </div>
                                {!isEditing && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Protected</span>}
                            </h3>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="currentPassword">
                                    Current Password {isEditing && <span className="text-red-500">*</span>}
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                        <Lock className={`h-5 w-5 transition-colors ${isEditing ? 'text-slate-400 group-focus-within:text-brand-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                    </div>
                                    <input
                                        id="currentPassword"
                                        type="password"
                                        className={`input-premium pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 disabled:opacity-60 disabled:bg-slate-100 dark:disabled:bg-slate-800/30 ${!isEditing ? 'border-transparent shadow-none' : ''}`}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "Required to verify changes" : "••••••••"}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1" htmlFor="newPassword">
                                    New Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                        <Lock className={`h-5 w-5 transition-colors ${isEditing ? 'text-slate-400 group-focus-within:text-brand-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                    </div>
                                    <input
                                        id="newPassword"
                                        type="password"
                                        className={`input-premium pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 disabled:opacity-60 disabled:bg-slate-100 dark:disabled:bg-slate-800/30 ${!isEditing ? 'border-transparent shadow-none' : ''}`}
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
                        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
                                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary w-full sm:w-auto px-8 py-2.5 shadow-sm font-bold"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;
