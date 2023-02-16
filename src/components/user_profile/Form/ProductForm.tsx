import React from 'react'
import MainHeader from './MainHeader'
import TitleCard from './TitleCard'
import CategorysCard from './CategorysCard'
import ImgCard from './ImgCard'
import { UseMainContext } from '../../context/MainContext'

function ProductForm() {
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { lang } = context
  const style = {
    form: `flex flex-col items-center justify-center w-[60%] h-[100%] max_md:w-[80%]   max_sm:w-[80%]`,
    formDiv: `flex flex-col w-[80%] h-[100%] gap-5  mt-20 max_sm:w-[100%]`,
  }
  return (
    <form className={style.form}>
      <div className={style.formDiv}>
        <MainHeader />
        <CategorysCard />
        <ImgCard />
        <TitleCard />
      </div>
    </form>
  )
}

export default ProductForm

/* 
 1  = title
2 = category
3 disabled if category is not selected enabled 3 = sub categorys
4 decreption 
5 technical description
6 price
7 main img
8 other imgs
9 submit button

categorys{
    desktop:[Pre built,Used PC, Build your own ],
    laptop:[New Laptop, used laptops],
    componnets:[CPU,GPU,RAM,HDD/SSD,MotherBoards,PSU,Case,others],
    phones:[new , used ],
    electronics:[keyboard/mouse,audio,others]
}
*/
