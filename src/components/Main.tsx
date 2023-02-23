import React from 'react'
import SideNav from './Navigation/sidenavigation/SideNav'
import { Outlet } from 'react-router-dom'
import Slider from '../Slider/Slider'
import { UseNavContext } from './context/NavContext'
function Main() {
  const style = {
    section: ` w-[100%] flex flex-col items-center justify-center  mt-10 p-5 `,
    sliderNav: `flex flex-row w-[85%]`,
  }
  return (
    <section className={style.section}>
      <div className={style.sliderNav}>
        <SideNav />
        <Slider />
      </div>
      <Outlet />
    </section>
  )
}

export default Main
