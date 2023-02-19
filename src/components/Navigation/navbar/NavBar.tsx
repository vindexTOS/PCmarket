import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Icons } from '../../../utils/data/Photos'
import { UseMainContext } from '../../context/MainContext'
function NavBar() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const {
    userAuth,
    handleLogOut,
    user,
    loadingRegister,
    setLang,
    lang,
    userData,
  } = context
  const style = {
    nav: `w-[100vw] h-[70px] bg-[#ffffff] flex items-center justify-between flex-row p-5 `,
    searchDiv: `bg-white w-[300px] h-[2rem] rounded-[20px] flex items-center justify-center gap-2 border-2 border-red-600`,
    searchInput: `w-[80%]  outline-none`,
    icon: `w-[70px] h-[70px] `,
    img: `w-[70px] h-[70px] rounded-[50%]`,
  }
  return (
    <nav className={style.nav}>
      <Link to="/">
        <img className={style.icon} src={Icons.Chip} />
      </Link>
      <div className={style.searchDiv}>
        <BiSearchAlt />
        <div className="h-[60%] w-[1px] bg-gray-300"></div>
        <input className={style.searchInput} />
      </div>
      {!userAuth ? (
        <div
          className={` 
          text-white text-[1rem] flex gap-4 s
        `}
        >
          {loadingRegister ? (
            <div className="bg-red-600">Loading</div>
          ) : (
            <div>
              {' '}
              <Link to="/register" className="text-black z-50">
                Register
              </Link>
              <Link className="text-black z-50" to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <p>{user?.email}</p>
          <img
            className={style.img}
            src={userData ? userData[0]?.imgUrl : Icons.Picture}
          />

          <Link to="/myproduct">Add Product</Link>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      )}
      <button onClick={() => setLang(!lang)}>Lang</button>
    </nav>
  )
}

export default NavBar
