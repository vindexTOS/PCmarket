import React, { useContext, createContext, useReducer, Reducer } from 'react'

type Cell = {}

// type SubCategoryState = {
//   desktop?: boolean
//   laptop?: boolean
//   components?: boolean
//   phones?: boolean
//   electronics?: boolean
//   MAINBLOCK?: boolean
// }
// type SubCategoryAction = {
//   type: string
//   payload?: string
// }
const NavContext = createContext<Cell | null>(null)

export const NavContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // sub category navigation reducer
  //   const subReducer = (
  //     state: SubCategoryState,
  //     action: SubCategoryAction,
  //   ): SubCategoryState => {
  //     switch (action.type) {
  //       case 'DESKTOP':
  //         return {
  //           MAINBLOCK: state.MAINBLOCK = true,
  //           desktop: state.desktop = true,
  //         }
  //       case 'DESKTOP_LEAVE':
  //         return {
  //           MAINBLOCK: state.MAINBLOCK = false,
  //           desktop: state.desktop = true,
  //         }
  //       default:
  //         return state
  //     }
  //   }
  //   const [subState, subDispatch] = useReducer<
  //     Reducer<SubCategoryState, SubCategoryAction>
  //   >(subReducer, {
  //     MAINBLOCK: false,
  //     desktop: false,
  //     laptop: false,
  //     components: false,
  //     phones: false,
  //     electronics: false,
  //   })

  return <NavContext.Provider value={{}}>{children}</NavContext.Provider>
}

export const UseNavContext = () => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error('Provider is not wrapped on components')
  }
  return context
}
