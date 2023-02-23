import React from 'react'
import { Icons } from '../../utils/data/Photos'
import { UseFormContext } from '../context/FormContext'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import { Link } from 'react-router-dom'
function ProductCard({ val }: { val: any }) {
  const { lang, allUsers } = UseFormContext()
  const {
    title,
    price,
    priceCur,
    imgs,
    date,
    location,
    sallType,
    uid,
    id,
  } = val

  const user_name = allUsers?.filter((user: any) => {
    if (user.uid === uid) {
      return user.userName
    }
  })

  const style = {
    productCard: `bg-white w-[400px] h-[500px] rounded-[15px] boxShaddow flex items-center flex-col justify-between `,
    header: ` h-[70px] rounded-t-[15px] w-[100%]  border-b-[1px] cursor-pointer  hover:bg-blue-500 bg-blue-400 text-white flex items-center justify-center  text-[1.3rem] text-center  `,
    imgWrapper: `w-[340px] h-[50%] rounded-[15px] border-2 rounded-[20px] flex items-center justify-center`,
    img: `w-[340px] h-[250px] rounded-[15px] border-2 rounded-[20px] `,
    imgSpan: `hover:blurCs flex items-center justify-between opacity-0 hover:opacity-20 w-[380px] h-[250px] absolute    rounded-[15px] bg-gray-100  `,
    arrowIcons: `text-[3rem] cursor-pointer text-black hover:bg-black hover:text-gray-100 rounded-[50%]  z-10`,
    price: `bg-green-400 text-white text-[1.5rem] px-3  py-1 rounded-[8px] absolute mt-[22.2rem] mr-[12rem]`,
    bottomDiv: `w-[100%] h-[4rem] flex   items-center justify-center   `,
    date: `gap-2   flex items-start  justify-start  ml-5 text-gray-300 w-[100%]`,
    location: `gap-2 text-[10px]  flex items-start  justify-start  mt-20   text-gray-400  mr-[10rem] absolute`,

    userDiv: `flex w-[100%] ml-5 text-gray-300`,
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
      setImgIndex(0)
    }
    // console.log(imgs[imgIndex])
  }
  const typeLink = () => {
    let link = ''
    if ((val.category = 'Pre built' || val.category == 'Used Pc')) {
      link = 'desktop'
    }
    return link
  }
  return (
    <div key={id} className={style.productCard}>
      {/* <h1 onClick={() => console.log(location)}>LOg</h1> */}
      <Link to={`/${id}`} className={style.header}>
        {title.length >= 60 ? `${title.slice(0, 60)}...` : title}
      </Link>
      <p className={style.location}>
        <span className="text-gray-500">
          {lang ? 'Location:' : 'ადგილმდებარეობა:'}
        </span>
        {lang ? location.keyen : location.key}
      </p>
      {imgs ? (
        <div className={style.imgWrapper}>
          <img className={style.img} src={imgs[imgIndex]} />
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
