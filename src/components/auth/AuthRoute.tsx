import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Loader from '../styledComponents/Loader/StyledLoader'

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
        setLoading(false)
      }
    })
    return () => AuthCheck()
  }, [auth])

  if (loading) return <Loader />

  return <>{children}</>
}
