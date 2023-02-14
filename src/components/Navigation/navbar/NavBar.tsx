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
  const { user, handleLogOut } = context
  const style = {
    nav: `w-[100vw] h-[70px] bg-gray-300 flex items-center justify-between flex-row p-5 `,
    searchDiv: `bg-white w-[300px] h-[2rem] rounded-[20px] flex items-center justify-center gap-2 border-2 border-red-600`,
    searchInput: `w-[80%]  outline-none`,
    icon: `w-[70px] h-[70px] `,
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
      <button onClick={handleLogOut}>Log Out</button>

      {user ? (
        <button onClick={handleLogOut}>Log Out</button>
      ) : (
        <div className="text-white text-[1rem] flex gap-4">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar
