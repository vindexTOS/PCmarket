import React from 'react'
import { Icons } from '../../../utils/data/Photos'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { UseNavContext } from '../../context/NavContext'
function SideNav() {
  const {} = UseNavContext()
  const links = [
    { titles: 'Dasktop', link: '/desktop', icon: Icons.gaming },
    { titles: 'Laptop', link: '', icon: Icons.laptop },
    { titles: 'Components', link: '', icon: Icons.fan },
    { titles: 'Phones', link: '', icon: Icons.phone },
    { titles: 'Electronics', link: '', icon: Icons.headphone },
  ]
  const style = {
    nav: `w-[280px] h-[600px] p-10 ml-3     bg-gray-100 rounded-l-[12px] z-20  bg-opacity-70`,
    linkDiv: `flex flex-col gap-5 w-[100%]`,
    link: `p-2 text-start text-[1.3rem] hover:bg-gray-500 text-red-600 hover:bg-opacity-30 hover:text-white cursor-pointer z-40 w-[100%] rounded-[15px] flex items-col items-center justify-center gap-2`,
    icon: `w-[20px] h-[20px] `,
  }

  return (
    <nav className={style.nav}>
      <div className={style.linkDiv}>
        {links.map((val) => {
          return (
            <Link key={val.titles} className={style.link} to={val.link}>
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
