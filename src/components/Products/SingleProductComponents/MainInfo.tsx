import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
import { BsTelephoneFill } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { AiOutlineMessage } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { UseProfileContext } from '../../context/ProfileContext'
type MainInfoProps = {
  category: string
  date: string
  title: string
  name: string
  id: string
  price: string
  priceCur: string
  sallType: string
  userid: string
  number: string
  location: { keyen: string; key: string }
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
  userid,
  number,
  location,
}): JSX.Element => {
  const { lang, userData, user, allUsers } = UseFormContext()
  const { DirectMessage } = UseProfileContext()
  const { productData } = UseProductContext()
  const [UserProfileMain, setUserProfileMain] = React.useState([])
  const userInfo = allUsers?.filter((user: any) => {
    if (user.uid === userid) {
      return user
    }
  })

  const { uid, userName, imgUrl } = userInfo[0]

  // UserProfileMain
  React.useEffect(() => {
    let newVal = productData?.filter((val: any) => {
      if (val.uid === uid) {
        return val
      }
    })

    setUserProfileMain(newVal)
  }, [productData])
  // state to show hidden number

  const [showNum, setShowNum] = React.useState<boolean>(false)
  const style = {
    mainInfoDiv: `  w-[50%] bg-red    max_smm:w-[95vw]    h-[90%] p-2 flex flex-col justify-between  max_xl:w-[100%]  max_xl:items-center `,
    unitedFirst: `pb-20 flex gap-2 flex-col w-[90%]`,
    subInfo: ` flex gap-5 border-2 p-1 rounded-[12px] w-[100%]    max_xl:justify-center    max_xl:w-[100%]  `,
    pSubInfo: `text-[12px] max_xl:text-[10px] max_smm:flex max_smm:flex-col max_smm:items-center max_smm:justify-center text-gray-400`,
    price: `w-[90%]  max_xl:w-[90%] max_smm:h-[90px] max_smm:w-[100%]  max_xl:w-[500px] h-[120px] boxShaddow rounded-[30px]  flex items-center justify-center`,
    user: `flex    max_smm:h-[120px] max_smm:w-[100%] max_x:justify-start items-center  justify-start gap-4 max_xl:gap-1 w-[90%]  max_xl:w-[90%] max_smm1:justify-between   max_xl:justify-center max_xl:w-[500px]  h-[120px]  boxShaddow  rounded-[30px]`,
    userAvatar: `w-[70px] h-[70px] rounded-[50%] mx-3  `,
    userAvatarName: ``,
    priceAndUserInfo: 'flex flex-col   h-[350px] gap-5   max_xl:w-[100%]  ',
    phoneDiv: `flex  items-center max_xl:p-0 gap-3 border-2 py-1 px-2 w-[12rem] h-[3rem] rounded-[12px] hover:bg-gray-200 cursor-pointer  max_x:w-[9rem]  `,
  }

  return (
    <div className={style.mainInfoDiv}>
      {/* <button onClick={() => console.log(userInfo)}>ON CLICK</button> */}
      <div className={style.unitedFirst}>
        <div className={style.subInfo}>
          <p className={style.pSubInfo}>
            <span className="font-bold text-gray-500">
              {lang ? 'Category ' : 'კატეგორია '}:
            </span>
            {category}
          </p>
          <p className={style.pSubInfo}>
            <span className="font-bold text-gray-500">
              {lang ? 'Date ' : 'თარიღი'} :{' '}
            </span>
            {date.slice(0, 21)}
          </p>
          <p className={style.pSubInfo}>
            <span className="font-bold text-gray-500">
              {lang ? 'User ' : 'მომხარებლი '}:{' '}
            </span>
            <Link to={`/user/${userid}`}>
              <span className="text-blue-300 hover:underline">{userName}</span>
            </Link>
          </p>
        </div>
        {/* ID div */}
        <h1>
          <span className="text-[10px]  ">
            {lang ? 'Product ID' : 'განცადების ID '} :
          </span>
          <span className="text-[10px] text-gray-400"> {id} </span>
        </h1>
        {/* title  */}
        <h1 className="text-[1.5rem] max_xl:text-[1rem]   ">{title}</h1>
      </div>
      {/* price and  userInfo  */}
      <div className={style.priceAndUserInfo}>
        <div className={style.price}>
          <div className="h-[80%] w-[60%] bg-gray-200 flex items-center justify-center  rounded-[12px]  mx-5">
            <h1 className="text-[3rem]  text-green-400">
              {priceCur}
              {price}
            </h1>
          </div>
          <div
            className={` w-[30%] h-[80%] flex items-center justify-center text-white  bg-red-400  text-[3rem] mx-5 rounded-[12px]`}
          >
            <h1>{sallType}</h1>
          </div>
        </div>
        {/* wrapper */}
        <div>
          <div className={style.user}>
            <img className={style.userAvatar} src={imgUrl} />{' '}
            <Link to={`/user/${userid}`}>
              <div className="flex flex-col gap-2 mr-5 ">
                <h1 className="text-blue-600 hover:text-blue-400 hover:underline cursor-pointer">
                  {userName}
                </h1>
                <h1 className="text-[10px] max_xl:text-[8px]  text-gray-500 text-center cursor-pointer">
                  {UserProfileMain?.length}{' '}
                  {lang ? 'advertisement' : 'განცხადება'}
                </h1>{' '}
              </div>{' '}
            </Link>
            {/* phone number */}
            <div className="flex  max_smm1:flex-col   max_smm:gap-1 gap-4">
              <div
                className={style.phoneDiv}
                onClick={() => setShowNum(!showNum)}
              >
                <BsTelephoneFill className="text-green-300 max_xl:text-[14px] ml-2 " />

                {/* showNum,setShowNum */}
                <div className="flex  items-center gap-1 ">
                  {showNum ? (
                    <p className="max_xl:text-[11px]">
                      <span className="text-gray-400 max_xl:text-[10px]">
                        (+995){' '}
                      </span>
                      {number.slice(0, 9)}
                    </p>
                  ) : (
                    <p className="max_xl:text-[10px]">
                      {' '}
                      {number.slice(0, 5)}** **
                    </p>
                  )}
                  <p
                    className={` w-[40px]  text-[12px] text-blue-400 ml-2 ${
                      showNum && 'hidden'
                    } `}
                  >
                    {lang ? 'Show Number' : 'ნომრის ჩვენება'}
                  </p>
                </div>
              </div>
              {/* location  */}
              <div className="flex gap-1   ">
                <div className="flex  items-center max_x:justify-center  gap-3 border-2 py-1 px-2  w-[7rem] h-[3rem] rounded-[12px]  max_smm:w-[5rem]    cursor-pointer">
                  <GoLocation className="mt-1" />
                  <p className="text-[14px] text-gray-400">
                    {lang ? location.keyen : location.key}
                  </p>
                </div>
                {/* message */}
                <div
                  onClick={() => DirectMessage(userid)}
                  className="flex  items-center justify-center gap-3 border-2 py-1 px-2  max_xl:mr-5 w-[3.2rem] h-[3rem]   rounded-[12px] text-gray-500 hover:text-black hover:bg-gray-200 cursor-pointer"
                >
                  <AiOutlineMessage className="text-[1.2rem] " />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* wrapper */}
      </div>
    </div>
  )
}

export default MainInfo
