import React, { useState, useReducer, Reducer } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { UseMainContext } from '../../context/MainContext'

type Action = {
  type: string | []
}
type State = {
  btn1: boolean
  btn2: boolean
}

function CategorysCard() {
  const [selectDown, setSelectDown] = useState<boolean>(false)

  const btnReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'btn1':
        return { btn1: state.btn1 = true, btn2: state.btn2 = false }
      case 'btn2':
        return { btn1: state.btn1 = false, btn2: state.btn2 = true }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer<Reducer<State, Action>>(btnReducer, {
    btn1: true,
    btn2: false,
  })

  const { lang, setLang } = UseMainContext()
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
    category: `flex flex-col items-center justify-center h-[250px] bg-white rounded-[19px] pb-5  max_sm:w-[100%]`,
    header: `w-[100%] text-start p-5 bolder pl-10`,
    detalesDiv: ` pl-10 mb-5 flex justify-start flex-col w-[100%] cursor-pointer`,
    btnDiv: `flex gap-3 justify-start w-[100%] pt-3`,
    btnSale: `w-[6rem] h-[2.4rem]  pb-1  flex items-center justify-center  rounded-[19px]  `,
    selectMainDiv: `w-[90%] h-[3rem] border-2 rounded-[17px] flex items-center justify-center `,
    selectDiv: `w-[90%] `,
    select: `w-[90%] cursor-pointer appearance-none border-0 outline-0 text-[15px]`,
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
            onClick={() => dispatch({ type: 'btn1' })}
            className={`${style.btnSale} ${
              state.btn1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {lang ? 'Sale' : 'გაყიდვა'}
          </div>
          <div
            onClick={() => dispatch({ type: 'btn2' })}
            className={`${style.btnSale} ${
              state.btn2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {lang ? 'Buy' : 'ყიდვა'}
          </div>
        </div>
      </div>
      <p className="text-[12px] bold text-gray-300 text-start w-[100%] pb-2 pl-10">
        {lang ? 'Choose category' : 'აირჩიე კატეგორია'}
      </p>
      <div className={style.selectMainDiv}>
        <select
          className={style.select}
          onClick={() => setSelectDown(!selectDown)}
        >
          {categorys?.map((val, i) => {
            return (
              <optgroup
                key={i}
                className="rounded-[12px]  w-[100%]"
                label={val?.title}
              >
                {val?.category.map((item, index) => {
                  return (
                    <option key={index} className="hover:bg-red-500">
                      {item.option}
                    </option>
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
