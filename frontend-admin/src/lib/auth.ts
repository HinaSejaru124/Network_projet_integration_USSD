import type { User, LoginCredentials, RegisterCredentials } from '@/types';

/**
 * Sauvegarder le token d'authentification
 */
export const saveToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

/**
 * Récupérer le token d'authentification
 */
export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

/**
 * Supprimer le token d'authentification
 */
export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

/**
 * Sauvegarder les informations utilisateur
 */
export const saveUser = (user: User): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
    }
};

/**
 * Récupérer les informations utilisateur
 */
export const getUser = (): User | null => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
    }
    return null;
};

/**
 * Vérifier si l'utilisateur est authentifié
 */
export const isAuthenticated = (): boolean => {
    return getToken() !== null;
};

/**
 * Connexion utilisateur (simulation pour le moment)
 * TODO: Remplacer par un vrai appel API quand le backend auth sera prêt
 */
export const login = async (credentials: LoginCredentials): Promise<User> => {
    // Simulation d'une connexion
    // Dans une vraie application, vous appelleriez votre API backend ici
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Validation basique
            if (credentials.email && credentials.password) {
                const user: User = {
                    id: '1',
                    email: credentials.email,
                    name: 'Administrateur',
                    token: 'mock-jwt-token-' + Date.now(),
                };

                saveToken(user.token!);
                saveUser(user);
                resolve(user);
            } else {
                reject(new Error('Email ou mot de passe invalide'));
            }
        }, 1000);
    });
};

/**
 * Inscription utilisateur (simulation pour le moment)
 * TODO: Remplacer par un vrai appel API quand le backend auth sera prêt
 */
export const register = async (credentials: RegisterCredentials): Promise<User> => {
    // Simulation d'une inscription
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (
                credentials.email &&
                credentials.password &&
                credentials.password === credentials.confirmPassword
            ) {
                const user: User = {
                    id: '1',
                    email: credentials.email,
                    name: credentials.name,
                    token: 'mock-jwt-token-' + Date.now(),
                };

                saveToken(user.token!);
                saveUser(user);
                resolve(user);
            } else {
                reject(new Error('Données invalides'));
            }
        }, 1000);
    });
};

/**
 * Déconnexion utilisateur
 */
export const logout = (): void => {
    removeToken();
};
