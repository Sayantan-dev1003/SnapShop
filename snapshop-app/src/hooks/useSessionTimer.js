import { useState, useEffect } from 'react';
import { getRemainingTime } from '../utils/session';

export const useSessionTimer = () => {
    const [timeLeft, setTimeLeft] = useState(getRemainingTime());

    useEffect(() => {
        // Update timer every second
        const interval = setInterval(() => {
            setTimeLeft(getRemainingTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (ms) => {
        if (ms <= 0) return '00:00';
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        formattedTime: formatTime(timeLeft),
        isExpired: timeLeft <= 0
    };
};
