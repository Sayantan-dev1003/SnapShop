import React, { createContext, useState, useEffect } from 'react';
import { getSession, createSession, clearSession } from '../utils/session';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from '../hooks/useToast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    // Initial check
    useEffect(() => {
        const session = getSession();
        if (session) {
            setUser(session.user);
        }
        setLoading(false);
    }, []);

    // Polling to enforce max 5 minutes session dynamically without refresh
    useEffect(() => {
        const interval = setInterval(() => {
            if (user && !getSession()) {
                setUser(null); // Force UI update if session randomly expires
                addToast('Your session has expired', 'error');
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [user, addToast]);

    const login = (email, password) => {
        const users = getStorageItem('snapshop_users') || [];
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const session = createSession(foundUser);
            setUser(session.user);
            addToast('Login successful! Welcome back.', 'success');
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (name, email, password) => {
        const users = getStorageItem('snapshop_users') || [];
        if (users.some(u => u.email === email)) {
            return { success: false, message: 'Email is already registered' };
        }
        // Generate simple id
        const newUser = { id: Date.now().toString(), name, email, password };
        users.push(newUser);
        setStorageItem('snapshop_users', users);
        return { success: true };
    };

    const logout = () => {
        clearSession();
        setUser(null);
        addToast('You have been logged out', 'info');
    };

    const updateProfile = (name, email, currentPassword, newPassword) => {
        const users = getStorageItem('snapshop_users') || [];
        const userIndex = users.findIndex(u => u.email === user.email);

        if (userIndex === -1) return { success: false, message: 'User not found' };

        if (users[userIndex].password !== currentPassword) {
            return { success: false, message: 'Current password is incorrect' };
        }

        if (email !== user.email && users.some(u => u.email === email)) {
            return { success: false, message: 'Email is already taken' };
        }

        users[userIndex].name = name;
        users[userIndex].email = email;
        if (newPassword) {
            users[userIndex].password = newPassword;
        }

        setStorageItem('snapshop_users', users);

        // Update session
        const updatedUser = { ...user, name, email };
        createSession({ ...users[userIndex] });
        setUser(updatedUser);

        addToast('Profile updated successfully', 'success');
        return { success: true };
    };

    // Prevent rendering components assuming user is loaded when it isn't during hydration
    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
