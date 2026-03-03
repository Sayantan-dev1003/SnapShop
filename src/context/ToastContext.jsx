import React, { createContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border backdrop-blur-md bg-white/90 dark:bg-slate-900/90 animate-in slide-in-from-right-8 fade-in duration-300 transform transition-all translate-y-0 relative overflow-hidden
              ${toast.type === 'success' ? 'border-emerald-200 dark:border-emerald-800/50' : ''}
              ${toast.type === 'error' ? 'border-red-200 dark:border-red-800/50' : ''}
              ${toast.type === 'info' ? 'border-brand-200 dark:border-brand-800/50' : ''}
            `}
                    >
                        {/* Decorative side accent based on type */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${toast.type === 'success' ? 'bg-emerald-500' :
                                toast.type === 'error' ? 'bg-red-500' : 'bg-brand-500'
                            }`} />
                        <div className="flex-shrink-0 mt-0.5">
                            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                            {toast.type === 'info' && <Info className="w-5 h-5 text-brand-500" />}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="flex-shrink-0 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
