import React from 'react'
import { Icons } from '../../../utils/data/Photos'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { UseNavContext } from '../../context/NavContext'
import { UseProductContext } from '../../context/ProductContext'
function SideNav() {
  const {} = UseNavContext()
  const {} = UseProductContext()
  const links = [
    { titles: 'Dasktop', link: '/desktop', icon: Icons.gaming },
    { titles: 'Laptop', link: '/laptop', icon: Icons.laptop },
    { titles: 'Components', link: '/components', icon: Icons.fan },
    { titles: 'Phones', link: '/phone', icon: Icons.phone },
    { titles: 'Electronics', link: '/electronics', icon: Icons.headphone },
  ]
  const style = {
    nav: `w-[90%] h-[400px] mt-[32rem]  absolute flex items-start justify-start   bg-white sidenavshaddow rounded-[12px] z-50     `,
    linkDiv: `flex flex-col text-start items-start justify-start   w-[100%]`,
    link: `p-2 text-start text-[1.9rem]  py-4  hover:bg-gray-300 text-yellow-500  cursor-pointer z-40 w-[100%] border-t-[1px] rounded-[12px] border-blue-300 flex items-col items-center justify-start gap-2`,
    icon: `w-[20px] h-[20px] text-start `,
  }

  return (
    <nav className={style.nav}>
      <div className={style.linkDiv}>
        {links.map((val) => {
          return (
            <Link key={val.titles} className={style.link} to={val.link}>
              {val.icon}

              <h1 className="w-[7rem]">{val.titles}</h1>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default SideNav
