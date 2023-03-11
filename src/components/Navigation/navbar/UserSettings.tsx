import React from 'react'
import { UseFormContext } from '../../context/FormContext'
import { IoMdAddCircle } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineMessage } from 'react-icons/ai'
import { UseProfileContext } from '../../context/ProfileContext'
import { MdFavorite } from 'react-icons/md'
import { motion as m } from 'framer-motion'
import { UseNavContext } from '../../context/NavContext'
function UserSettings() {
  const {
    handleLogOut,
    user,

    lang,
  } = UseFormContext()
  const { resivedMessages } = UseProfileContext()
  const { dropDown, setDropDown } = UseNavContext()
  const refClick = React.useRef<HTMLDivElement>(null)
  const handler = (e: MouseEvent) => {
    if (refClick.current && !refClick.current.contains(e.target as Node)) {
      setTimeout(() => {
        setDropDown(false)
      }, 100)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [handler])
  const style = {
    mainDiv: `absolute w-[350px] h-[310px]  max_lg:right-4    bg-white z-40 mt-5 rounded-[15px] boxShaddow`,
    img: `w-[70px] h-[70px] rounded-[50%]`,
    pDiv: `w-[100%] flex flex-col items-start p-5 justify-center border-b-[1px]`,
    edits: `w-[350px] h-[50%] `,
  }
  const userNot = resivedMessages?.filter(
    (val: any) => user?.uid === val.resiverUid,
  )
  const [userNotification, setUserNotification] = React.useState(userNot)
  return (
    <div className={style.mainDiv} ref={refClick}>
      <div className="flex flex-col  ">
        <div className={style.pDiv}>
          <p className="text-[1.2rem]  text-gray-600 font-bold">
            {user?.email}
          </p>
          <p className="text-[11px] text-gray-400">{user?.uid}</p>
        </div>
        <div className={style.edits}>
          <Link to="/myproduct">
            <div className=" text-[1.2rem] hover:bg-gray-100 text-gray-500 w-[345px] h-[3rem] pl-2 gap-2  hover:text-yellow-400 flex items-center justify-start ">
              <IoMdAddCircle className=" w-[2rem] text-[1.4rem] mt-1 text-yellow-400 hover:text-green-300  " />{' '}
              {lang ? 'Add Product' : 'დაამატეთ პროდუქტი'}
            </div>
          </Link>
        </div>
        <Link to={`/user/${user?.uid}`}>
          <div className="text-[1.2rem] hover:bg-gray-100 text-gray-500 w-[345px] h-[3rem] pl-2 gap-2  hover:text-yellow-400 flex items-center justify-start ">
            <FaRegUserCircle className=" w-[2rem] mt-1 text-yellow-400 hover:text-green-300  " />{' '}
            {lang ? 'Products And Profile' : 'პროდუქტი და პროფილი'}
          </div>
        </Link>
        <Link to={`/messages/${user?.uid}`}>
          <div
            onClick={() => setUserNotification([])}
            className="text-[1.2rem] hover:bg-gray-100 text-gray-500 w-[345px] h-[3rem] pl-2 gap-2  hover:text-yellow-400 flex items-center justify-start "
          >
            <AiOutlineMessage className=" w-[2rem] mt-1 text-yellow-400 hover:text-green-300  " />{' '}
            {lang ? 'Messages' : 'შეტყობინებები'}
            {userNotification?.length > 0 && (
              <m.div
                animate={{ y: [2, 0, 2, 0, 2, 0, 2, 0, 2] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-red-500 w-[10px] h-[10px] rounded-[50%]   ml-[1rem] absolute"
              ></m.div>
            )}
          </div>
        </Link>
        <Link to="/favourite">
          <div className="text-[1.2rem] hover:bg-gray-100 text-gray-500 w-[345px] h-[3rem] pl-2 gap-2  hover:text-yellow-400 flex items-center justify-start ">
            <MdFavorite className=" w-[2rem] mt-1 text-yellow-400 hover:text-green-300  " />{' '}
            {lang ? 'Favorites' : 'ფავორიტი პროდუქტი'}
          </div>
        </Link>
        <button
          className="bg-red-600 h-[2rem] rounded-b-[10px]"
          type="submit"
          onClick={handleLogOut}
        >
          {lang ? 'Log Out' : 'გასვლა'}
        </button>
      </div>
    </div>
  )
}

export default UserSettings
