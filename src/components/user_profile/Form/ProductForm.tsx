import React from 'react'
import MainHeader from './MainHeader'
import TitleCard from './TitleCard'
import CategorysCard from './CategorysCard'
import ImgCard from './ImgCard'
import { UseFormContext } from '../../context/FormContext'
import Cost from './Cost'
import Contact from './Contact'
import PcSpecs from './Specs/PcSpecs'
import SpecsMain from './Specs/SpecsMain'
function ProductForm() {
  const { lang, handleFormSubmit, handleSubmit, specCheck } = UseFormContext()
  const style = {
    form: `flex flex-col items-center justify-center w-[53%] h-[100%] max_md:w-[80%]   max_sm:w-[80%]`,
    formDiv: `flex flex-col w-[80%] h-[100%] gap-5 max_lg:w-[100%]    sm:w-[110%]  max_md2:w-[120%] max_Xl:w-[120%] mt-20 max_sm:w-[100%]`,
  }
  return (
    <form
      className={style.form}
      onSubmit={(e) => handleFormSubmit(e, handleSubmit)}
    >
      <div className={style.formDiv}>
        <MainHeader />
        <CategorysCard />
        <SpecsMain />

        <ImgCard />
        <TitleCard />
        <Cost />
        <Contact />
        <button type="submit">submit</button>
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
