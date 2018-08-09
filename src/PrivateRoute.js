import React from 'react'
import { Route } from 'react-router-dom'
import Login from './js/pages/Login'

export default function PrivateRoute ({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Login />
        )
      }
    />
  )
}
