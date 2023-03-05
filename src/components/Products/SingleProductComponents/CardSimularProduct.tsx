import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { MdFavoriteBorder } from 'react-icons/md'
type SimularProductCardProps = {
  imgs: string[]
  price: string
  priceCur: string
  description: string
  title: string
  name: string
}

const CardSimularProduct: FC<SimularProductCardProps> = ({
  imgs,
  price,
  priceCur,
  name,
  title,
  description,
}): JSX.Element => {
  const style = {
    mainDiv: `rounded-[7px]  bg-white   w-[255px] h-[310px] flex flex-col items-center  gap-3 select-none `,
    img: `w-[230px] h-[150px] rounded-[7px] mt-3`,
    user: `flex gap-2 items-center justify-start w-[230px]`,
    header: `flex flex-col `,
    price: `flex items-start justify-between w-[230px] h-[40px] mb-2 `,
  }

  return (
    <Link to={'/'}>
      <div className={style.mainDiv}>
        <img className={style.img} src={imgs[0]} />
        <div className={style.user}>
          <FaUserCircle className="text-[1rem] text-gray-400" />
          <h1 className="text-[10px] text-gray-400">{name}</h1>
        </div>
        <div className={style.header}>
          <h1 className="text-[14px] w-[230px]   text-gray-500">
            {title.slice(0, 30)}...
          </h1>
          <p className="text-[11px] w-[230px]  text-gray-400">
            {description.slice(0, 30)}..
          </p>
        </div>
        <div className="w-[230px] h-[1px] bg-gray-200"></div>
        <div className={style.price}>
          <h1>
            {priceCur}
            {price}
          </h1>
          <p className="rounded-[8px] bg-gray-200 w-[30px] h-[30px] flex items-center justify-center hover:bg-yellow-300  hover:text-white ">
            <MdFavoriteBorder className="text-[1.4rem]" />
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CardSimularProduct
