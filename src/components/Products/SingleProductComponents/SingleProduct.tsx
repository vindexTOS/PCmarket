import React, { Reducer, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { UseProductContext } from '../../context/ProductContext'
import { motion as m } from 'framer-motion'

import { useNavigate } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import ImgSlider from './ImgSlider'
import MainInfo from './MainInfo'

function SingleProduct() {
  const { productData, location } = UseProductContext()
  const { lang } = UseFormContext()
  const { productId } = useParams()

  const product = productData?.find(
    (producte: { id: any }) => String(producte.id) === productId,
  )

  const {
    aditionalObj,
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
    mainDiv: ` pt-10 w-[100%] h-[100%] flex   justify-between`,
  }

  // navigate
  const navigate = useNavigate()
  if (product) {
    return (
      <div className={style.mainDiv}>
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
        />
      </div>
    )
  } else {
    return <div>LOADING</div>
  }
}

export default SingleProduct
