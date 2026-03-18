"use client";

import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Laptop } from 'lucide-react';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return placeholder of roughly same size to prevent layout shift
        return <div style={{ width: '100px', height: '36px', padding: '0.25rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }} />;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.25rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <button 
                onClick={() => setTheme('light')}
                style={{
                    padding: '0.4rem', borderRadius: '8px', border: 'none', background: theme === 'light' ? 'var(--bg-primary)' : 'transparent', 
                    color: theme === 'light' ? 'var(--accent-light)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex'
                }}
                title="Light Mode"
            >
                <Sun size={16} />
            </button>
            <button 
                onClick={() => setTheme('system')}
                style={{
                    padding: '0.4rem', borderRadius: '8px', border: 'none', background: theme === 'system' ? 'var(--bg-primary)' : 'transparent', 
                    color: theme === 'system' ? 'var(--accent-light)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex'
                }}
                title="System Preference"
            >
                <Laptop size={16} />
            </button>
            <button 
                onClick={() => setTheme('dark')}
                style={{
                    padding: '0.4rem', borderRadius: '8px', border: 'none', background: theme === 'dark' ? 'var(--bg-primary)' : 'transparent', 
                    color: theme === 'dark' ? 'var(--accent-light)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex'
                }}
                title="Dark Mode"
            >
                <Moon size={16} />
            </button>
        </div>
    );
}
