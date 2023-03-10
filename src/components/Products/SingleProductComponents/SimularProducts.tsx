import React, { FC, useEffect, useState, useRef } from 'react'
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

  // scroll button logic
  const scrollRef = useRef(null)
  const handleScroll = (direction: 'left' | 'right') => {
    const scrollDistance = 257
    const element = (scrollRef.current as unknown) as HTMLDivElement

    if (element) {
      if (direction === 'left') {
        element.scrollBy({
          left: -scrollDistance,
          behavior: 'smooth',
        })
      } else if (direction === 'right') {
        element.scrollBy({
          left: scrollDistance,
          behavior: 'smooth',
        })
      }
    }
  }

  const style = {
    // mainDiv: `w-[85%] relative max_smm:w-[100vw] max_x:w-[95%] h-[400px]  bg-white rounded-[20px] boxShaddow mt-10 overflox-x-hidden `,
    mainDiv: `w-[85%] max_smm:w-[95vw] max_x:w-[95%] h-[400px] rounded-[20px] mt-10  flex-col  `,
    headerAndArrows: `w-[100%] flex justify-between  py-5`,
    header: `text-[1.2rem] font-bold`,
    arrowDiv: `flex  gap-5 text-[1.5rem] font-bold`,
    arrow: `bg-yellow-300 text-white rounded-[50%] w-[2.5rem] h-[2.5rem] flex items-center justify-center hover:bg-yellow-200 cursor-pointer `,
    cardMap: ` w-[85%] h-[450px] flex flex-row  gap-1 max_x:w-[95%]  max_lg:w-[95%]   rounded-[7px]  absolute scroll`,
    cardMapWrapper: ``,
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
            <MdOutlineKeyboardArrowLeft onClick={() => handleScroll('left')} />
          </p>
          <p className={style.arrow}>
            <MdOutlineKeyboardArrowRight
              onClick={() => handleScroll('right')}
            />
          </p>
        </div>
      </div>
      <div
        className={style.cardMap}
        ref={scrollRef}
        style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}
      >
        {simularData?.map((val: any) => {
          const {
            imgs,
            price,
            priceCur,
            title,
            description,
            id,
            sallType,
          } = val
          return (
            <CardSimularProduct
              key={id}
              title={title}
              imgs={imgs}
              price={price}
              priceCur={priceCur}
              description={description}
              name={sallType}
              id={id}
              val={val}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SimularProducts
