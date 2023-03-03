import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'

type MainInfoProps = {
  category: string
  date: string
  title: string
  name: string
  id: string
  price: string
  priceCur: string
  sallType: string
}

const MainInfo: FC<MainInfoProps> = ({
  category,
  date,
  title,
  name,
  id,
  price,
  priceCur,
  sallType,
}): JSX.Element => {
  const { lang, userData } = UseFormContext()

  const style = {
    mainInfoDiv: `   w-[60%] h-[90%] p-2 flex flex-col justify-start  `,
    subInfo: ` flex  gap-5 border-2 p-1 rounded-[12px]`,
    price: `w-[90%] h-[150px] boxShaddow rounded-[30px] flex items-center justify-between`,
  }
  return (
    <div className={style.mainInfoDiv}>
      <div className={style.subInfo}>
        <p className="text-[12px] text-gray-400 ">
          <span className="font-bold text-gray-500">
            {lang ? 'Category ' : 'კატეგორია '}:
          </span>
          {category}
        </p>
        <p className="text-[12px] text-gray-400 ">
          <span className="font-bold text-gray-500">
            {lang ? 'Date ' : 'თარიღი'} :{' '}
          </span>
          {date.slice(0, 21)}
        </p>
        <p className="text-[12px] text-gray-400 ">
          <span className="font-bold text-gray-500">
            {lang ? 'User ' : 'მომხარებლი '}:{' '}
          </span>
          <span className="text-blue-300">
            {userData && userData[0]?.userName}
          </span>
        </p>
      </div>
      <h1>
        <span className="text-[10px] text-gray-500">
          {' '}
          {lang ? 'Product ID' : 'განცადების ID '} :
        </span>
        <span className="text-[10px] text-gray-400"> {id} </span>
      </h1>
      <h1 className="text-[2rem]">{title}</h1>
      <div className={style.price}>
        <div className="h-[80%] w-[60%] bg-green-400 flex items-center justify-center rounded-[55px] mx-5">
          <h1 className="text-[3rem]  text-white">
            {priceCur}
            {price}
          </h1>
        </div>
        <div
          className={` w-[30%] h-[80%] flex items-center justify-center text-white  bg-red-400  text-[3rem] mx-5 rounded-[55px]`}
        >
          <h1>{sallType}</h1>
        </div>
      </div>
    </div>
  )
}

export default MainInfo
