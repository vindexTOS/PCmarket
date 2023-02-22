import React from 'react'
import { UseFormContext } from '../../context/FormContext'
import { Link } from 'react-router-dom'

function UserSettings() {
  const {
    userAuth,
    handleLogOut,
    user,
    loadingRegister,
    setLang,
    lang,
    userData,
  } = UseFormContext()
  const style = {
    mainDiv: `absolute w-[350px] h-[310px]     bg-white z-40 mt-5 rounded-[15px] boxShaddow`,
    img: `w-[70px] h-[70px] rounded-[50%]`,
    pDiv: `w-[100%] flex flex-col items-start p-5 justify-center border-b-[1px]`,
    edits: `w-[350px] h-[50%] `,
  }
  return (
    <div className={style.mainDiv}>
      {' '}
      <div className="flex flex-col  ">
        <div className={style.pDiv}>
          <p className="text-[1.2rem]  text-gray-600 font-bold">
            {user?.email}
          </p>
          <p className="text-[11px] text-gray-400">{user?.uid}</p>
        </div>

        <div className={style.edits}>
          <Link to="/myproduct">
            <div className="text-[1.2rem] hover:bg-gray-300 text-gray-500 w-[345px] h-[3rem] pl-2  flex items-center justify-start ">
              {lang ? 'Add Product' : 'დაამატეთ პროდუქტი'}
            </div>
          </Link>
        </div>

        <button className="bg-red-600" type="submit" onClick={handleLogOut}>
          {lang ? 'Log Out' : 'გასვლა'}
        </button>
      </div>
    </div>
  )
}

export default UserSettings
