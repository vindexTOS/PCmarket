import React from 'react'
import ProductForm from './Form/ProductForm'
function UserProfile() {
  const style = {
    section: `flex w-[100%] h-[100%] items-center justify-center`,
  }
  return (
    <section className={style.section}>
      <ProductForm />
    </section>
  )
}

export default UserProfile
