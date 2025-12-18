import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { PublicNavigation } from './PublicNavigation';
import { PrivateNavigation } from './PrivateNavigation';
import { useAuth } from '../context/AuthContext';

export default function AppNavigation() {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            BootSplash.hide({ fade: true });
        }
    }, [isLoading]);

    // Pendant le chargement de l'état d'authentification,
    // on laisse l'écran de splash s'afficher.
    if (isLoading) {
        return null;
    }

    // Navigation privée pour les utilisateurs authentifiés,
    // navigation publique sinon.
    return isAuthenticated ? <PrivateNavigation /> : <PublicNavigation />;
}