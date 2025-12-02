import { useEffect } from 'react';
import { PublicNavigation } from './PublicNavigation'
import BootSplash from "react-native-bootsplash";

export default function AppNavigation() {
    useEffect(() => {
        BootSplash.hide({ fade: true });
    }, []);
    return <PublicNavigation />
}