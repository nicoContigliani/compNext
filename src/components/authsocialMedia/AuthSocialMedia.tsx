import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';


const AuthSocialMedia = () => {
    const { loginWithRedirect, isAuthenticated,
        user, isLoading } = useAuth0<any>();

    // Manejo del estado de carga
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            AuthSocialMedia
        </div>

    )
}

export default AuthSocialMedia