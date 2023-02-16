import React from 'react'
import TitleCard from './TitleCard'
import CategorysCard from './CategorysCard'
import ImgCard from './ImgCard'
function ProductForm() {
  const style = {
    form: `flex flex-col items-center justify-center w-[50%] h-[100%] max_md:w-[80%]   max_sm:w-[80%]`,
    formDiv: `flex flex-col w-[80%] bg-gray-200 h-[100%] gap-5  max_sm:w-[100%]`,
  }
  return (
    <form className={style.form}>
      <h1>განცხადების დამატება / add new product </h1>
      <div className={style.formDiv}>
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
