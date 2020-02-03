import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'
import { get } from 'lodash'
import { isLogin, customFetch } from 'utils'
import { Redirect } from 'react-router-dom'
import ErrorPage from 'commons/ErrorBoundary/ErrorPage'
import cookie from 'utils/cookie'

const UserContext = createContext()

// Use this wherever current user data is required eg const {currentUser, loading} = useContext(UserContext)
const UserProvider = ({ history, children }) => {
  let currentUser = {}
  const [loading, setLoading] = useState(false)

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
    const token = cookie.getToken()
    const fetchData = async () => {
      const [response, headers] = await customFetch('v1/users/present_user', 'GET', {}, { Authorization: `Bearer ${token}` })
      if (response.email) {
        currentUser = response
      } else {
        setLoading(false)
        return <ErrorPage />
      }
    };
    await fetchData();
    setLoading(false)
  }

  useEffect(() => {
    fetchUser()
  }, [history.location.pathname])



  if (loading) return <div>Loading...</div>

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser,
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
