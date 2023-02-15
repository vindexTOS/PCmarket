import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
function CategorysCard() {
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
    category: `flex flex-col items-center justify-center   h-[300px] bg-white rounded-[19px]`,
    selectMainDiv: `w-[90%] h-[3rem] border-2 rounded-[17px] flex items-center justify-center`,
    selectDiv: `w-[90%]`,
    select: `w-[90%] appearance-none border-0 outline-0`,
    opinion: ``,
  }
  const [grid, setGrid] = useState<boolean[]>(
    new Array(categorys.length).fill(false),
  )

  const [selectDown, setSelectDown] = useState<boolean>(false)
  const [opinion, setOpinion] = useState<boolean>(true)
  const selectHandle = (str: string | undefined, index: number) => {
    grid[index] = true
  }
  return (
    <div className={style.category}>
      <h1 onClick={() => console.log(grid)}>CLICKCLICK</h1>
      <div className={style.selectMainDiv}>
        <select
          className={style.select}
          onClick={() => setSelectDown(!selectDown)}
        >
          {categorys?.map((val) => {
            return (
              <optgroup className="rounded-[12px] w-[90px]" label={val?.title}>
                {val?.category.map((item) => {
                  return <option>{item.option}</option>
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
