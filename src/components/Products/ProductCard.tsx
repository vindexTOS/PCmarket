import React from 'react'
import { Icons } from '../../utils/data/Photos'
import { UseMainContext } from '../context/MainContext'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
function ProductCard({ val }: { val: any }) {
  const { lang, allUsers } = UseMainContext()
  const { title, price, priceCur, imgs, date, location, sallType, uid } = val

  const user_name = allUsers?.filter((user: any) => {
    if (user.uid === uid) {
      return user.userName
    }
  })

  const style = {
    productCard: `bg-white w-[400px] h-[500px] rounded-[15px] boxShaddow flex items-center flex-col justify-between `,
    header: ` h-[70px] rounded-t-[15px] w-[100%]  border-b-[1px] cursor-pointer  hover:bg-blue-500 bg-blue-400 text-white flex items-center justify-center  text-[1.3rem] text-center  `,
    imgWrapper: `w-[95%] h-[50%] rounded-[15px] border-2 rounded-[20px] flex items-center justify-center`,
    img: `w-[380px] h-[250px] rounded-[15px] border-2 rounded-[20px] `,
    imgSpan: `hover:blurCs flex items-center justify-between opacity-0 hover:opacity-50 w-[380px] h-[250px] absolute    rounded-[15px] bg-gray-100  `,
    arrowIcons: `text-[3rem] cursor-pointer text-black hover:bg-black hover:text-gray-100 rounded-[50%]  z-10`,
    price: `bg-green-400 text-white text-[1.5rem] px-3 py-1 rounded-[8px] absolute mt-40`,
    bottomDiv: `w-[100%] h-[4rem] flex   items-center justify-center   `,
    date: `gap-2   flex items-start  justify-start  ml-5 text-gray-300 w-[100%]`,

    userDiv: `flex w-[100%] ml-5 text-gray-300`,
  }
  const [imgIndex, setImgIndex] = React.useState<number>(0)
  const slideIncrese = () => {
    if (imgIndex !== imgs.length) {
      setImgIndex(imgIndex + 1)
    } else {
      setImgIndex(0)
    }
    console.log(imgs[imgIndex])
  }
  const slideDec = () => {
    if (imgIndex !== 0) {
      setImgIndex(imgIndex - 1)
    } else {
      setImgIndex(0)
    }
    console.log(imgs[imgIndex])
  }
  return (
    <div className={style.productCard}>
      {/* <h1 onClick={() => console.log()}>LOg</h1> */}
      <h1 className={style.header}>{title}</h1>
      <button onClick={slideIncrese}>Right</button>
      {imgs ? (
        <div className={style.imgWrapper}>
          <img className={style.img} src={imgs[imgIndex]} />
          <span className={style.imgSpan}>
            {' '}
            <IoMdArrowDropleft
              onClick={slideDec}
              className={`${style.arrowIcons} ml-2`}
            />{' '}
            <IoMdArrowDropright
              onClick={slideIncrese}
              className={`${style.arrowIcons} mr-2`}
            />
          </span>
        </div>
      ) : (
        <img className={style.img} src={Icons.UK} />
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
          <p>{lang ? 'User' : 'ავტორი'}: </p>
          <p className="text-gray-400 ml-1"> {user_name[0]?.userName}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
