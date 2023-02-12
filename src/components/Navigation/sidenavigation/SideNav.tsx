import React from 'react'
import { Link } from 'react-router-dom'
function SideNav() {
  const links = [
    { titles: 'Dasktop', link: '' },
    { titles: 'Laptop', link: '' },
    { titles: 'Components', link: '' },
    { titles: 'Phones', link: '' },
    { titles: 'Electronics', link: '' },
  ]
  const style = {
    nav: `w-[280px] h-[600px] p-10 ml-3   bg-gray-200    bg-opacity-95`,
    linkDiv: `flex flex-col gap-5`,
    link: `p-3 hover:bg-gray-400 hover:bg-opacity-40 hover:text-blue-500 cursor-pointer z-40`,
  }
  return (
    <nav className={style.nav}>
      <div className={style.linkDiv}>
        {links.map((val) => {
          return (
            <Link className={style.link} to={val.link}>
              {val.titles}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default SideNav
