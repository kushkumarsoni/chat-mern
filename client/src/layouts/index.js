import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div>
        <div>Logo</div>
        {/* children */}
    
        { children }
    </div>
  )
}

export default AuthLayout