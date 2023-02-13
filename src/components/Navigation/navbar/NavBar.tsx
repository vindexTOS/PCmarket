import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
function NavBar() {
  const style = {
    nav: `w-[100vw] h-[70px] bg-black flex items-center justify-between flex-row p-5 `,
    searchDiv: `bg-white w-[300px] h-[2rem] rounded-[20px] flex items-center justify-center gap-2 border-2 border-red-600`,
    searchInput: `w-[80%]  outline-none`,
  }
  return (
    <nav className={style.nav}>
      <h1 className="text-white text-[2rem]">LOGO</h1>
      <div className={style.searchDiv}>
        <BiSearchAlt />
        <div className="h-[60%] w-[1px] bg-gray-300"></div>
        <input className={style.searchInput} />
      </div>
      <div className="text-white text-[1rem]">Register / Login</div>
    </nav>
  )
}

export default NavBar
