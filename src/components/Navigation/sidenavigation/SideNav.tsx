import React from 'react'
import { Icons } from '../../../utils/data/Photos'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { UseNavContext } from '../../context/NavContext'
import { UseProductContext } from '../../context/ProductContext'
function SideNav() {
  const {} = UseNavContext()
  const { location } = UseProductContext()
  const links = [
    { titles: 'Dasktop', link: '/desktop', icon: Icons.gaming },
    { titles: 'Laptop', link: '/laptop', icon: Icons.laptop },
    { titles: 'Components', link: '/components', icon: Icons.fan },
    { titles: 'Phones', link: '/phone', icon: Icons.phone },
    { titles: 'Electronics', link: '/electronics', icon: Icons.headphone },
  ]
  const style = {
    nav: `w-[280px] h-[600px] pt-10 ml-3     bg-white  sidenavshaddow rounded-l-[12px] z-40  bg-opacity-70 max_md2:hidden`,
    linkDiv: `flex flex-col   w-[100%] items-center justify-center  gap-5 `,
    link: `p-2 w-[100%] text-start text-[1.3rem] hover:bg-gray-300 text-blue-300 hover:bg-opacity-30 hover:text-blue-400 cursor-pointer z-40 w-[100%] rounded-[7px] flex   items-center justify-center gap-2 `,
    icon: `w-[20px] h-[20px] `,
  }

  return (
    <nav className={style.nav}>
      <div className={style.linkDiv}>
        {/* <h1 onClick={() => console.log(location)}>LOG</h1> */}
        {links.map((val, index) => {
          return (
            <Link
              key={val.titles}
              className={`${style.link}${
                location.pathname === val.link
                  ? 'outline-2 outline outline-yellow-300'
                  : 'hover:outline-1 hover:outline hover:outline-yellow-200'
              }`}
              to={val.link}
            >
              {val.icon}

              <h1 className="w-[7rem]">{val.titles}</h1>
              <IoIosArrowForward />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default SideNav
