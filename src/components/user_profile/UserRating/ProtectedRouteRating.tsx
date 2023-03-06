import React from 'react'
import { UseFormContext } from '../../context/FormContext'

const ProtectedRouteRating = ({ children }: { children: JSX.Element }) => {
  const { user, lang } = UseFormContext()
  if (user) {
    return children
  } else {
    return (
      <div>
        <p>
          {lang
            ? 'authorise or register if you want to access this page'
            : 'გაიარეთ ავტორიზაცია ან დარეგისტრიდით თუ გსურთ ამ გვერდზე წვდომა '}
        </p>
      </div>
    )
  }
}

export default ProtectedRouteRating
