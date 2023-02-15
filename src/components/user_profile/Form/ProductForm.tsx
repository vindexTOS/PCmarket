import React from 'react'
import TitleCard from './TitleCard'
import CategorysCard from './CategorysCard'
function ProductForm() {
  const style = {
    form: `flex flex-col w-[50%] h-[100vh]  `,
    formDiv: `flex flex-col w-[80%] bg-gray-200 h-[100%] gap-5`,
  }
  return (
    <form className={style.form}>
      <div className={style.formDiv}>
        <CategorysCard />
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
