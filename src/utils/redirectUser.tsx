import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export interface IAuthRouteProps {
  children: React.ReactNode
}
export default function RedirectRoute(props: IAuthRouteProps) {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home')
      } else {
        navigate('/')
      }
    })
    return () => AuthCheck()
  }, [auth])

  return <>{children}</>
}
