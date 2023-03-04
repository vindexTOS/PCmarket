import React, { FC } from 'react'
type SimularProductCardProps = {
  imgs: string[]
  price: string
  priceCur: string

  title: string
}

const CardSimularProduct: FC<SimularProductCardProps> = ({
  imgs,
  price,
  priceCur,

  title,
}): JSX.Element => {
  const style = {
    mainDiv: `w-[240px] h-[300px] border-2  `,
  }

  return <div className={style.mainDiv}></div>
}

export default CardSimularProduct
