'use client'

import AuthForm from "@/components/auth/AuthForm";
import { redden } from "@/services/storage.services";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  useEffect(() => {
    const data = redden({ email: 'nico.contigliani' })
  }, [])

  // const [isLogin, setIsLogin] = useState(true)
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  // console.log("🚀 ~ Home ~ isAuthenticated:", isAuthenticated)

  // // Simula el proceso de autenticación
  // const authenticateUser = (data: any) => {
  //   // Aquí se manejaría la autenticación real
  //   // Si la autenticación es exitosa:
  //   setIsAuthenticated(true)
  // }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* <AuthForm 
      isLogin={isLogin} 
      setIsLogin={setIsLogin} 
      isAuthenticated={isAuthenticated} 
      setIsAuthenticated={setIsAuthenticated}
    /> */}
      <h1>Home</h1>
    </div>
  );
}