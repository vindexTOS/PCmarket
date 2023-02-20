import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Icons } from '../../../utils/data/Photos'
import { UseMainContext } from '../../context/MainContext'
import UserSettings from './UserSettings'
import LoadingCircle from './LoadingCircle'
import LoginRegister from './LoginRegister'
function NavBar() {
  const {
    userAuth,
    handleLogOut,
    user,
    loadingRegister,
    setLang,
    lang,
    userData,
    navigate,
  } = UseMainContext()
  const style = {
    nav: `w-[100vw] h-[90px] bg-[#ffffff] flex items-center justify-between flex-row p-5 `,
    searchDiv: `bg-white w-[300px] h-[2rem] rounded-[20px] flex items-center justify-center gap-2 border-2 border-red-600`,
    searchInput: `w-[80%]  outline-none`,
    icon: `w-[70px] h-[70px] `,
    divImg: `w-[60px] h-[60px] flex items-center justify-center cursor-pointer  border-[3px] border-yellow-300 rounded-[50%]`,
    img: `w-[45px] h-[45px] rounded-[50%]`,
    langIcon: `w-[40px] h-[40px]`,
  }
  const [dropDown, setDropDown] = React.useState<boolean>(false)
  return (
    <nav className={style.nav}>
      <button onClick={() => navigate('home')} type="button">
        <img className={style.icon} src={Icons.Chip} />
      </button>

      <div className={style.searchDiv}>
        <BiSearchAlt />
        <div className="h-[60%] w-[1px] bg-gray-300"></div>
        <input className={style.searchInput} />
      </div>

      <div
        className={` 
          text-white text-[1rem] flex gap-4 s
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
                  {' '}
                  <img
                    className={style.img}
                    src={userData ? userData[0]?.imgUrl : Icons.Picture}
                  />
                </div>{' '}
                <div className="flex flex-col">
                  {' '}
                  <p className="text-gray-400">
                    {userData && userData[0]?.userName}
                  </p>
                  <Link to="/myproduct" className="text-gray-600 text-[12px]">
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
