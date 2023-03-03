import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Icons } from '../../../utils/data/Photos'
import { UseFormContext } from '../../context/FormContext'
import UserSettings from './UserSettings'
import LoadingCircle from './LoadingCircle'
import LoginRegister from './LoginRegister'
import { UseNavContext } from '../../context/NavContext'
import DropdownSideNav from '../sidenavigation/DropdownSideNav'
import { FaBars } from 'react-icons/fa'
import { BsFilter } from 'react-icons/bs'
import { UseProductContext } from '../../context/ProductContext'
import { motion as m } from 'framer-motion'
function NavBar() {
  const {
    userAuth,

    loadingRegister,
    setLang,
    lang,
    userData,
  } = UseFormContext()
  const { search, setSearch } = UseProductContext()
  const {
    dropDownSideNav,
    setDropDownSideNav,

    searchBarIcon,
    searchBarShow,
    setSearchBarShow,
  } = UseNavContext()
  const style = {
    nav: `w-[100%] h-[90px] bg-[#ffffff] flex items-center justify-between flex-row p-5 max_sm:p-0  border-b-2  `,
    searchDiv: `bg-white  max_lg:w-[400px] max_md2:hidden w-[500px] h-[40px] max_sm:hidden h-[2rem] rounded-[20px] flex items-center justify-center gap-2 border-[1px] border-yellow-400`,
    searchShowInResponsive: `bg-white  absolute     w-[300px] h-[40px]     rounded-[20px] flex items-center justify-center gap-2 border-[1px] border-yellow-400`,
    searchInput: `w-[80%]  outline-none`,
    icon: `w-[70px] h-[70px] max_sm:hidden  text-yellow-400`,
    divImg: `w-[60px] h-[60px] flex items-center justify-center cursor-pointer  border-[3px] border-yellow-300 rounded-[50%] ${
      searchBarShow && 'ml-[7rem]'
    } `,
    img: `w-[45px] h-[45px] rounded-[50%]`,
    langIcon: `w-[40px] h-[40px] max_sm:hidden`,
    dropDownWrapper: `flex items-center justify-between  gap-20 mr-[10rem] `,
    dropDownNavigationBars: ` text-[3rem] text-yellow-500    cursor-pointer   mdxl:hidden ${
      searchBarShow && 'hidden'
    } `,
    dropDownFilter: `text-[3rem] text-yellow-500 cursor-pointer   mdxl:hidden `,
  }
  const [dropDown, setDropDown] = React.useState<boolean>(false)
  return (
    <nav className={style.nav}>
      <div className={style.dropDownWrapper}>
        {/* this drops down main menu  */}
        <FaBars
          onClick={() => setDropDownSideNav(!dropDownSideNav)}
          className={style.dropDownNavigationBars}
        />
        <BiSearchAlt
          onClick={() => setSearchBarShow(!searchBarShow)}
          className={` ${
            searchBarIcon
              ? 'hidden '
              : 'text-yellow-400 text-[2rem] mdxl:hidden  cursor-pointer hover:text-yellow-300 '
          } `}
        />
      </div>
      {dropDownSideNav && <DropdownSideNav />}
      <div className={style.searchDiv}>
        <BiSearchAlt className="text-yellow-400 text-[1.2rem]  " />
        <div className="h-[60%] w-[1px] bg-yellow-400"></div>
        <input
          className={style.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {searchBarShow && (
        <m.div
          className={style.searchShowInResponsive}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
        >
          <BiSearchAlt
            className="text-yellow-400 text-[1.2rem] hover:text-yellow-300  cursor-pointer  "
            onClick={() => setSearchBarShow(!searchBarShow)}
          />
          <div className="h-[60%] w-[1px] bg-yellow-400"></div>
          <input
            className={style.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </m.div>
      )}
      <div
        className={` 
          text-white text-[1rem] flex gap-4 
        `}
      >
        {userAuth && (
          <div>
            {!loadingRegister ? (
              <div className="flex  gap-2">
                <div
                  className={style.divImg}
                  onClick={() => setDropDown(!dropDown)}
                >
                  <img
                    className={style.img}
                    src={userData ? userData[0]?.imgUrl : Icons.Picture}
                  />
                </div>
                <div className="flex flex-col max_sm:hidden">
                  <p className="text-gray-400">
                    {userData && userData[0]?.userName}
                  </p>
                  <Link
                    to="/myproduct"
                    className="text-gray-600 max_sm:hidden text-[12px]"
                  >
                    {lang ? 'My Product' : 'ჩემი პროდუქტი'}
                  </Link>
                </div>
              </div>
            ) : (
              <LoadingCircle />
            )}
            {dropDown && <UserSettings />}
          </div>
        )}
        {!userAuth && <LoginRegister />}
      </div>

      <div className="mr-10 cursor-pointer" onClick={() => setLang(!lang)}>
        {lang ? (
          <img className={style.langIcon} src={Icons.georgia} />
        ) : (
          <img className={style.langIcon} src={Icons.UK} />
        )}
      </div>
    </nav>
  )
}

export default NavBar
