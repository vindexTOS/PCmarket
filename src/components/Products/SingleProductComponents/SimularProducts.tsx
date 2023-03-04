import React, { FC, useEffect, useState } from 'react'
import { UseFormContext } from '../../context/FormContext'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import CardSimularProduct from './CardSimularProduct'
import { UseProductContext } from '../../context/ProductContext'
type SimularProProps = {
  category: string
}
const SimularProducts: FC<SimularProProps> = ({ category }): JSX.Element => {
  const { lang, location } = UseFormContext()
  const { productData } = UseProductContext()

  // filtering values based on category for simula products

  const [simularData, setSimularData] = useState<[]>([])

  useEffect(() => {
    let newSimularVal = productData?.filter((val: any) => {
      if (val.category === category) {
        return val
      }
    })

    setSimularData(newSimularVal)
  }, [productData, location])

  const style = {
    mainDiv: `w-[85%] max_smm:w-[100vw] max_x:w-[95%] h-[400px] bg-white rounded-[20px] boxShaddow mt-10`,
    headerAndArrows: `w-[100%] flex justify-between px-10 py-5`,
    header: `text-[1.2rem] font-bold`,
    arrowDiv: `flex  gap-5 text-[1.5rem] font-bold`,
    arrow: `bg-yellow-300 text-white rounded-[50%] w-[2rem] h-[2rem] flex items-center justify-center hover:bg-yellow-200 cursor-pointer`,
    cardMap: `flex gap-2 overflow-x-scroll `,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.headerAndArrows}>
        {/* <h1 onClick={() => console.log(simularData)}>Logg</h1> */}
        <h1 className={style.header}>
          {lang ? 'Simular Products' : 'მსგავსი პროდუქცია'}
        </h1>
        <div className={style.arrowDiv}>
          <p className={style.arrow}>
            <MdOutlineKeyboardArrowLeft />
          </p>
          <p className={style.arrow}>
            <MdOutlineKeyboardArrowRight />
          </p>
        </div>
      </div>
      <div className={style.cardMap}>
        {' '}
        {simularData?.map((val: any) => {
          const { imgs, price, priceCur, title } = val
          return (
            <CardSimularProduct
              title={title}
              imgs={imgs}
              price={price}
              priceCur={priceCur}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SimularProducts
