import React, { Reducer, useReducer, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { UseProductContext } from '../../context/ProductContext'
import { motion as m } from 'framer-motion'

import { useNavigate, useLocation } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import ImgSlider from './ImgSlider'
import MainInfo from './MainInfo'
import Description from './Description'
import SimularProducts from './SimularProducts'
function SingleProduct() {
  const { productData } = UseProductContext()
  const { lang } = UseFormContext()
  const { productId } = useParams()
  const local = useLocation()

  const [reLoadData, setReLoadData] = React.useState(productData)
  const topScrollRef = useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    setReLoadData(product)
    const element = topScrollRef.current as HTMLDivElement
    element?.scrollIntoView({ behavior: 'smooth' })
  }, [local])
  const product = productData?.find(
    (producte: { id: any }) => String(producte.id) === productId,
  )
  const {
    aditionalObj,
    location,
    category,
    date,
    description,
    id,
    name,
    imgs,
    number,
    price,
    priceCur,
    priceNegotiation,
    sallType,
    title,
    uid,
  } = product || {}

  const style = {
    mainDiv: ` pt-10  px-10  z-20 max_x:px-0 max_x:w-[100%]  w-[100vw] h-[100%] flex  justify-between max_xml:flex-col gap-5   `,
  }

  if (product) {
    return (
      <div className="flex items-center justify-center flex-col">
        <span ref={topScrollRef}></span>
        <div className={style.mainDiv}>
          {' '}
          <ImgSlider imgs={imgs} />
          <MainInfo
            date={date}
            title={title}
            category={category}
            name={name}
            id={id}
            price={price}
            priceCur={priceCur}
            sallType={sallType}
            userid={uid}
            number={number}
            location={location}
          />
        </div>
        {/* <h1 onClick={() => console.log(product)}>LOG</h1> */}{' '}
        <Description
          description={description}
          aditionalObj={aditionalObj}
          category={category}
        />
        <SimularProducts category={category} />
      </div>
    )
  } else {
    return <div>LOADING</div>
  }
}

export default SingleProduct
