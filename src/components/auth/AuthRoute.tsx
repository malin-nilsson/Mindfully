import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export interface IAuthRouteProps {
  children: React.ReactNode
}
export default function AuthRoute(props: IAuthRouteProps) {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
      } else {
        navigate('/')
      }
    })
    return () => AuthCheck()
  }, [auth])

  if (loading) return <p>Loading...</p>

  return <>{children}</>
}
