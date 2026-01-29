'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';
import * as authLib from '@/lib/auth';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Charger l'utilisateur depuis le localStorage au montage
    useEffect(() => {
        const loadUser = () => {
            const savedUser = authLib.getUser();
            const token = authLib.getToken();

            if (savedUser && token) {
                setUser(savedUser);
            }
            setIsLoading(false);
        };

        loadUser();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const user = await authLib.login(credentials);
            setUser(user);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            const user = await authLib.register(credentials);
            setUser(user);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authLib.logout();
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
