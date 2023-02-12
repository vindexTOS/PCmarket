import React from 'react'
import SideNav from './Navigation/sidenavigation/SideNav'
import { Outlet } from 'react-router-dom'
import Slider from './Slider'
function Main() {
  const style = {
    section: `overflow-hidden flex justify-between`,
  }
  return (
    <section className={style.section}>
      <SideNav />
      <Slider />
      <Outlet />
    </section>
  )
}

export default Main
