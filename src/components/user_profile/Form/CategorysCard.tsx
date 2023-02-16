import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { UseMainContext } from '../../context/MainContext'
function CategorysCard() {
  const [selectDown, setSelectDown] = useState<boolean>(false)
  const [btnColor, setbtnColor] = useState<boolean>(true)
  const context = UseMainContext()
  if (!context) {
    return null
  }
  const { lang, setLang } = context
  const categorys = [
    {
      title: 'Personal Computer',
      category: [
        { option: 'Pre built' },
        { option: 'Used Pc' },
        { option: 'Build Your Own' },
      ],
    },
    {
      title: 'Laptop',
      category: [{ option: 'New Laptop' }, { option: 'Used Laptop' }],
    },

    ,
    {
      title: 'PC components',
      category: [
        { option: 'CPU' },
        { option: 'GPU' },
        { option: 'RAM' },
        { option: 'HDD/SSD' },
        { option: 'Mother Board' },
        { option: 'PSU' },
        { option: 'Cases' },
        { option: 'Others' },
      ],
    },
    { title: 'Phones', category: [{ option: 'New' }, { option: 'Used' }] },
    {
      title: 'Electronics',
      category: [
        { option: 'Audio' },
        { option: 'Keyboard/mouse' },
        { option: 'Others' },
      ],
    },
  ]
  const style = {
    category: `flex flex-col items-center justify-center h-[250px] bg-white rounded-[19px] max_sm:w-[100%]`,
    header: `w-[100%] text-start p-5 bolder pl-10`,
    detalesDiv: ` pl-10 mb-5 flex justify-start flex-col w-[100%]`,
    btnDiv: `flex gap-3 justify-start w-[100%] pt-3`,
    btnSale: `w-[6rem]   pb-1  flex items-center justify-center  rounded-[15px]  `,
    selectMainDiv: `w-[90%] h-[3rem] border-2 rounded-[17px] flex items-center justify-center`,
    selectDiv: `w-[90%]`,
    select: `w-[90%] appearance-none border-0 outline-0`,
    opinion: ``,
  }

  return (
    <div className={style.category}>
      <h1 className={style.header}>
        {lang ? 'Details' : 'განცხადების დეტალები'}
      </h1>
      <div className={style.detalesDiv}>
        <h1 className="text-[10px] bold text-gray-300">
          {lang ? 'Product Detales' : 'განცხადების ტიპი'}
        </h1>
        <div className={style.btnDiv}>
          <div
            className={`${style.btnSale} ${
              btnColor ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {lang ? 'Sale' : 'გაყიდვა'}
          </div>
          <div
            className={`${style.btnSale} ${
              !btnColor ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {lang ? 'Looking for' : 'ვეძებ'}
          </div>
        </div>
      </div>
      <p className="text-[12px] bold text-gray-300 text-start w-[100%] pb-2 pl-10">
        {' '}
        {lang ? 'Choose category' : 'აირჩიე კატეგორია'}
      </p>
      <div className={style.selectMainDiv}>
        <select
          className={style.select}
          onClick={() => setSelectDown(!selectDown)}
        >
          <p>{lang ? 'choose category' : 'აირჩიე კატეგორია'}</p>
          {categorys?.map((val) => {
            return (
              <optgroup className="rounded-[12px]  w-[100%]" label={val?.title}>
                {val?.category.map((item) => {
                  return (
                    <option className="hover:bg-red-500">{item.option}</option>
                  )
                })}
              </optgroup>
            )
          })}
        </select>{' '}
        {selectDown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </div>
  )
}

export default CategorysCard
/* 
 
categorys{
    desktop:[Pre built,Used PC, Build your own ],
    laptop:[New Laptop, used laptops],
    componnets:[CPU,GPU,RAM,HDD/SSD,MotherBoards,PSU,Case,others],
    phones:[new , used ],
    electronics:[keyboard/mouse,audio,others]
}
*/
