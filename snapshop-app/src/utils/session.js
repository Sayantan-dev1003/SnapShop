import { getStorageItem, setStorageItem, removeStorageItem } from './storage';

export const SESSION_KEY = 'snapshop_session';
export const SESSION_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export const createSession = (user) => {
    const loginTime = Date.now();
    const expiryTime = loginTime + SESSION_DURATION_MS;

    // Clean the user object (remove password if exists)
    const safeUser = { ...user };
    delete safeUser.password;

    const sessionData = {
        user: safeUser,
        loginTime,
        expiryTime
    };
    setStorageItem(SESSION_KEY, sessionData);
    return sessionData;
};

export const getSession = () => {
    const session = getStorageItem(SESSION_KEY);
    if (!session) return null;

    // Check if expired
    if (Date.now() > session.expiryTime) {
        clearSession();
        return null;
    }
    return session;
};

export const clearSession = () => {
    removeStorageItem(SESSION_KEY);
};

export const getRemainingTime = () => {
    const session = getStorageItem(SESSION_KEY);
    if (!session) return 0;
    const remaining = session.expiryTime - Date.now();
    return remaining > 0 ? remaining : 0;
};
