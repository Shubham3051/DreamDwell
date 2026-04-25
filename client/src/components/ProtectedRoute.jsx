import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'; 

const ProtectedRoute = () => {
  const { user } = useUser();

  return (
    <div>
      user ? children : <Navigate to="/login" />
    </div>
  )
}

export default ProtectedRoute
