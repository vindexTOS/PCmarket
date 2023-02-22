import React, { useContext, createContext } from 'react'

type Cell = {}

const ProfileContext = createContext<Cell | null>(null)

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ProfileContext.Provider value={{}}>{children}</ProfileContext.Provider>
  )
}

export const UseProfileContext = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('Provider is not wrapped on components')
  }
  return context
}
