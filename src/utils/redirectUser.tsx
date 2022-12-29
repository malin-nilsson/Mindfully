import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/styledComponents/Loader/StyledLoader'

export interface IAuthRouteProps {
  children: React.ReactNode
}
export default function RedirectRoute(props: IAuthRouteProps) {
  const { children } = props
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
        navigate('/home')
      } else {
        setLoading(false)
        navigate('/')
      }
    })
    return () => AuthCheck()
  }, [auth])

  if (loading) return <Loader></Loader>

  return <>{children}</>
}
