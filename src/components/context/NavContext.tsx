import React, {
  useContext,
  createContext,
  useReducer,
  Reducer,
  useState,
  useEffect,
} from 'react'
import { useLocation } from 'react-router-dom'

type Cell = {
  dropDownSideNav: boolean
  setDropDownSideNav: React.Dispatch<React.SetStateAction<boolean>>

  searchBarIcon: boolean
  setsearchBarIcon: React.Dispatch<React.SetStateAction<boolean>>

  searchBarShow: boolean
  setSearchBarShow: React.Dispatch<React.SetStateAction<boolean>>
}

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
  const location = useLocation()
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
  // drop down menu side navigation
  const [dropDownSideNav, setDropDownSideNav] = useState<boolean>(false)
  useEffect(() => {
    setDropDownSideNav(false)
  }, [location])
  // rssizing of to make filter nav reapear after 900px

  // search bar responsive
  const [searchBarIcon, setsearchBarIcon] = useState<boolean>(false)
  // search bar drop on responsivnes
  const [searchBarShow, setSearchBarShow] = useState<boolean>(false)
  const [windoWith, setWindowWidth] = useState<any>({
    width: window.innerWidth,
  })

  useEffect(() => {
    function handleResize() {
      setWindowWidth({ width: window.innerWidth })

      if (windoWith.width > 898) {
        setsearchBarIcon(true)
        setSearchBarShow(false)
      } else {
        setsearchBarIcon(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windoWith])

  return (
    <NavContext.Provider
      value={{
        dropDownSideNav,
        setDropDownSideNav,

        searchBarIcon,
        setsearchBarIcon,
        searchBarShow,
        setSearchBarShow,
      }}
    >
      {children}
    </NavContext.Provider>
  )
}

export const UseNavContext = () => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error('Provider is not wrapped on components')
  }
  return context
}
