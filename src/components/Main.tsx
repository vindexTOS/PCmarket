import React from 'react'
import SideNav from './Navigation/sidenavigation/SideNav'
import { Outlet } from 'react-router-dom'
import Slider from '../Slider/Slider'
import { UseNavContext } from './context/NavContext'
import Mainfilter from './Navigation/filternavigation/Mainfilter'
function Main() {
  const style = {
    section: ` w-[100%] overflow-x-hidden flex flex-col items-center justify-between  mt-10 p-5 max_md2:justify-center`,
    sliderNav: `flex flex-row w-[95%] max_Xll:w-[85%]  max_md:w-[80%]`,
    filter: `pt-20 w-[100%] h-[100%] flex items-center justify-center`,
    outlet: ` `,
  }
  return (
    <section className={style.section}>
      <div className={style.sliderNav}>
        <SideNav />
        <Slider />
      </div>
      <div className={style.filter}>
        <Mainfilter />
      </div>
      <Outlet />
    </section>
  )
}

export default Main
