import React from 'react'
import SideNav from './Navigation/sidenavigation/SideNav'
import { Outlet } from 'react-router-dom'
import Slider from '../Slider/Slider'
import { UseNavContext } from './context/NavContext'
import Mainfilter from './Navigation/filternavigation/Mainfilter'
function Main() {
  const style = {
    section: ` w-[100%] flex flex-col items-center justify-between  mt-10 p-5 `,
    sliderNav: `flex flex-row w-[95%]`,
    filter: `pt-20 w-[100%] h-[100%] flex items-center justify-center`,
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
