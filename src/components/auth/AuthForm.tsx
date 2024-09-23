'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import styles from './AuthForm.module.css'

type FormData = {
    email: string
    password: string
    username?: string
}

type AuthFormProps = {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isLogin: boolean) => void; // Variable para saber si el usuario está autenticado
}

export default function AuthForm({ isLogin, setIsLogin, isAuthenticated, setIsAuthenticated }: AuthFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    // const [isRegister, setIsRegister] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')  // Redirige a la página de inicio si está autenticado
        }
    }, [isAuthenticated, router])

    const onSubmit = (data: any) => {
        setIsAuthenticated(true)
        // console.log(data,"esto esta en data")
        // Aquí típicamente manejarías la lógica de autenticación
        // Por ejemplo: login(data) o register(data)
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formContainer}>
                    <div className={styles.formContent}>
                        <h2 className={styles.title}>
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <div className={styles.toggleWrapper}>
                            <button
                                className={`${styles.toggleButton} ${isLogin ? styles.activeButton : ''}`}
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </button>
                            <button
                                className={`${styles.toggleButton} ${!isLogin ? styles.activeButton : ''}`}
                                onClick={() => setIsLogin(false)}
                            >
                                Register
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            {!isLogin && (
                                <div className={styles.inputGroup}>
                                    <label htmlFor="username" className={styles.label}>
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        {...register('username', { required: !isLogin })}
                                        className={styles.input}
                                        placeholder="Username"
                                    />
                                    {errors.username && <p className={styles.errorMessage}>Username is required</p>}
                                </div>
                            )}
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                    className={styles.input}
                                    placeholder="Email"
                                />
                                {errors.email && <p className={styles.errorMessage}>Valid email is required</p>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.label}>
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    {...register('password', { required: true, minLength: 6 })}
                                    className={styles.input}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <p className={styles.errorMessage}>
                                        {errors.password.type === 'required'
                                            ? 'Password is required'
                                            : 'Password must be at least 6 characters'}
                                    </p>
                                )}
                            </div>
                            <button type="submit" className={styles.submitButton}>
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
