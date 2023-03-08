import React, { FC } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { Icons } from '../../../utils/data/Photos'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
import { motion as m } from 'framer-motion'
type UserProductProps = {
  location: { key: string; keyen: string }

  date: string

  id: string

  imgs: string[]

  price: string
  priceCur: string

  title: string
  userName: string
  index: number
  deleteCheck: (index: number, check: string) => void
  deleteIndex: boolean[]
  setDeleteIndex: React.Dispatch<React.SetStateAction<boolean[]>>
}

const UserProduct: FC<UserProductProps> = ({
  location,

  date,

  id,

  imgs,

  price,
  priceCur,

  title,
  userName,
  index,
  deleteCheck,
  deleteIndex,
  setDeleteIndex,
}) => {
  const { lang, user } = UseFormContext()
  const { deleteProduct, setMakeSureCheck, makeSureCheck } = UseProductContext()
  const style = {
    productCard: ` bg-white w-[400px] h-[500px] max_sm:w-[350px] max_smm:ml-5 rounded-[15px] boxShaddow flex items-center flex-col justify-between `,
    header: ` h-[70px] rounded-t-[15px] w-[100%]  border-b-[1px] cursor-pointer  hover:bg-yellow-300 bg-yellow-400 text-white flex items-center justify-center  text-[1.3rem] text-center   max_md:text-[1rem]`,
    imgWrapper: `w-[340px] h-[50%] rounded-[15px] border-2 rounded-[20px] flex items-center justify-center`,
    img: `w-[340px] h-[250px] rounded-[15px] border-2 rounded-[20px] `,
    imgSpan: `hover:blurCs flex items-center justify-between opacity-0 hover:opacity-20 w-[380px] h-[250px] absolute    rounded-[15px] bg-gray-100  `,
    arrowIcons: `text-[3rem] cursor-pointer text-black hover:bg-black hover:text-gray-100 rounded-[50%]  z-10`,
    price: `bg-green-400 text-white text-[1.5rem] px-3  py-1 rounded-[8px] absolute mt-[22.2rem] mr-[12rem]`,
    bottomDiv: `w-[100%] h-[4rem] flex   items-center justify-center   `,
    date: `gap-2   flex items-start  justify-start  ml-5 text-gray-300 w-[100%] max_md:text-[14px]`,
    location: `gap-2 text-[10px]  flex items-start  justify-start  mt-20   text-gray-400  mr-[10rem] absolute`,

    userDiv: `flex w-[100%] ml-5 text-gray-300 max_md:text-[14px]`,
  }
  const [imgIndex, setImgIndex] = React.useState<number>(0)
  const slideIncrese = () => {
    if (imgIndex !== imgs.length - 1) {
      setImgIndex(imgIndex + 1)
    } else if (imgIndex == imgs.length - 1) {
      setImgIndex(0)
    }
    // console.log(imgs[imgIndex])
  }
  const slideDec = () => {
    if (imgIndex !== 0) {
      setImgIndex(imgIndex - 1)
    } else {
      setImgIndex(imgs.length - 1)
    }
    // console.log(imgs[imgIndex])
  }

  const { UserProfileMainId } = useParams()

  const checkUserProfile = user?.uid === UserProfileMainId
  return (
    <div key={id} className={style.productCard}>
      {/* <h1 onClick={() => console.log(checkUserProfile)}>LOg</h1> */}
      <Link to={`/${id}`} className={style.header}>
        {title?.length >= 60 ? `${title.slice(0, 60)}...` : title}
      </Link>
      <p className={style.location}>
        <span className="text-gray-500">
          {lang ? 'Location:' : 'ადგილმდებარეობა:'}
        </span>
        {lang ? location.keyen : location.key}
      </p>

      {imgs ? (
        <div className={style.imgWrapper}>
          <img
            style={{ userSelect: 'none' }}
            className={style.img}
            src={imgs[imgIndex]}
          />
          <span className={style.imgSpan}>
            {' '}
            <IoMdArrowDropleft
              onClick={slideDec}
              className={`${style.arrowIcons} ml-6`}
            />{' '}
            <IoMdArrowDropright
              onClick={slideIncrese}
              className={`${style.arrowIcons} mr-6`}
            />
          </span>
        </div>
      ) : (
        <img
          style={{ userSelect: 'none' }}
          className={style.img}
          src={Icons.UK}
        />
      )}
      <p className={style.price}>
        {priceCur}
        {price}
      </p>
      <div className={style.bottomDiv}>
        <div className={style.date}>
          <p> {lang ? 'Date' : 'თარიღი'}:</p>
          <p className="text-gray-400"> {date.slice(4, 16)}</p>
        </div>
        <div className={style.userDiv}>
          {checkUserProfile ? (
            <div
              onClick={() => deleteCheck(index, 'true')}
              className=" cursor-pointer bg-red-500 hover:bg-red-600 rounded-[30px] w-[9rem] h-[2.3rem] flex items-center justify-center text-[1.2rem] text-white"
            >
              <h1>{lang ? 'Delete' : 'წაშლა'}</h1>
              {deleteIndex[index] && (
                <m.div
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  className="absolute mt-[15rem] mr-[11.5rem] z-40   bg-white boxShaddow w-[400px] max_sm:w-[350px]  h-[11rem] rounded-[30px] flex flex-col items-center justify-center gap-8 "
                >
                  <h1 className="text-gray-400 text-center ">
                    {lang
                      ? 'Are you sure that you want to delete this item ? '
                      : 'დარწმუნებული ხართ რომ გსურთ პროდუქტის წაშლა ?'}
                  </h1>
                  <div className="flex gap-5">
                    <button
                      className="w-[9rem]  h-[2.3rem] bg-red-600 hover:bg-red-500 rounded-[30px]"
                      onClick={() => deleteProduct(id)}
                    >
                      {lang ? 'Yes' : 'დიახ'}
                    </button>
                    <button
                      className=" w-[9rem] h-[2.3rem] bg-green-400 hover:bg-green-300 rounded-[30px]"
                      onClick={() => deleteCheck(index, 'false')}
                    >
                      {lang ? 'No' : 'არა'}
                    </button>
                  </div>
                </m.div>
              )}
            </div>
          ) : (
            <>
              {' '}
              <p>{lang ? 'User' : 'ავტორი'}: </p>
              <p className="text-gray-400 ml-1"> {userName}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProduct
