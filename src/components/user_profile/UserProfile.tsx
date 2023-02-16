import React from 'react'
import ProductForm from './Form/ProductForm'
import { UseMainContext } from '../context/MainContext'
import PramiryImg from './Form/PramiryImg'
function UserProfile() {
  const style = {
    section: `flex w-[100%] h-[100%] items-center justify-center p-0`,
  }
  return (
    <section className={style.section}>
      <ProductForm />
      <PramiryImg />
    </section>
  )
}

export default UserProfile
