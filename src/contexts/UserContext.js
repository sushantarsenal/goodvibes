import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'
import { get, omit } from 'lodash'
import { isLogin, customFetch } from 'utils'
import { Redirect } from 'react-router-dom'
import ErrorPage from 'commons/ErrorBoundary/ErrorPage'
import cookie from 'utils/cookie'

const UserContext = createContext()

// Use this wherever current user data is required eg const {currentUser, loading} = useContext(UserContext)
const UserProvider = ({ history, children }) => {
  const [currentUser, setCurrentUser] = useState({}),
    [metrics, setMetrics] = useState({}),
    [loading, setLoading] = useState(false)

  // // setLoading(true)
  // useEffect(async () => {
  //   const token = cookie.getToken()

  //   const [response, headers] = await customFetch('v1/users/present_user', 'GET', {}, { Authorization: `Bearer ${token}` })

  //   if (response.email) {
  //     currentUser = response
  //   } else {
  //     setLoading(false)
  //     return <ErrorPage />
  //   }
  // }, [])



  const fetchUser = async () => {
    setLoading(true)
    const token = cookie.getToken()
    const [response, headers] = await customFetch('admin/users/present_user', 'GET', {}, { Authorization: `Bearer ${token}` })
    if (response.current_user.email) {
      const user = response.current_user,
        numbers = omit(response, ['current_user'])
      setCurrentUser(user)
      setMetrics(numbers)
    } else {
      setLoading(false)
      return <ErrorPage />
    }
    setLoading(false)
  }

  useEffect(() => {
    isLogin() && fetchUser()
  }, [history.location.pathname])

  if (loading) return <div>Loading...</div>

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser,
        metrics: metrics,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node,
}

export { UserProvider, UserContext }
