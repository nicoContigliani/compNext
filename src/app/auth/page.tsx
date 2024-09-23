'use client'

import AuthForm from '@/components/auth/AuthForm'
import { useState } from 'react'

const page = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    console.log("🚀 ~ Home ~ isAuthenticated:", isAuthenticated)
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <AuthForm
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
            />
        </div>
    )
}

export default page