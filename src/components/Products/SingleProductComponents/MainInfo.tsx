import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
import { BsTelephoneFill } from 'react-icons/bs'
type MainInfoProps = {
  category: string
  date: string
  title: string
  name: string
  id: string
  price: string
  priceCur: string
  sallType: string
  uid: string
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
  uid,
  number,
  location,
}): JSX.Element => {
  const { lang, userData } = UseFormContext()
  const { productData } = UseProductContext()
  const [userProduct, setUserProduct] = React.useState([])
  React.useEffect(() => {
    let newVal = productData?.filter((val: any) => {
      if (val.uid === userData[0].uid) {
        return val
      }
    })

    setUserProduct(newVal)
  }, [productData])
  // state to show hidden number
  const [showNum, setShowNum] = React.useState<boolean>(false)
  const style = {
    mainInfoDiv: `  w-[40%] h-[90%] p-2 flex flex-col justify-between    `,
    subInfo: ` flex gap-5 border-2 p-1 rounded-[12px]`,
    unitedFirst: `pb-20 flex gap-2 flex-col`,
    price: `w-[90%] h-[120px] boxShaddow rounded-[30px]  flex items-center justify-center`,
    user: `flex items-center justify-start gap-2 w-[90%]  h-[120px]  boxShaddow  rounded-[30px]`,
    userAvatar: `w-[70px] h-[70px] rounded-[50%] mx-5 cursor-pointer`,
    userAvatarName: ``,
    priceAndUserInfo: 'flex flex-col   h-[350px] gap-5    ',
    phoneDiv: `flex  items-center gap-3 border-2 py-1 px-2 w-[12rem] h-[3rem] rounded-[12px] hover:bg-gray-200 cursor-pointer`,
  }
  return (
    <div className={style.mainInfoDiv}>
      <div className={style.unitedFirst}>
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
        {/* ID div */}
        <h1>
          <span className="text-[10px] text-gray-500">
            {lang ? 'Product ID' : 'განცადების ID '} :
          </span>
          <span className="text-[10px] text-gray-400"> {id} </span>
        </h1>
        {/* title  */}
        <h1 className="text-[2rem]">{title}</h1>
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
            <img className={style.userAvatar} src={userData[0].imgUrl} />
            <div className="flex flex-col gap-2  ">
              <h1 className="text-blue-600 hover:text-blue-400 hover:underline cursor-pointer">
                {userData[0].userName}
              </h1>
              <h1 className="text-[10px] text-gray-500 text-center cursor-pointer">
                {userProduct?.length} {lang ? 'advertisement' : 'განცხადება'}
              </h1>
            </div>
            {/* phone number */}
            <div
              className={style.phoneDiv}
              onClick={() => setShowNum(!showNum)}
            >
              <BsTelephoneFill className="text-green-300" />

              {/* showNum,setShowNum */}
              <div className="flex items-center gap-1 ">
                {showNum ? (
                  <p>
                    <span className="text-gray-400">(+995) </span>
                    {number.slice(0, 9)}
                  </p>
                ) : (
                  <p> {number.slice(0, 5)}** **</p>
                )}
                <p
                  className={` w-[40px] text-[12px] text-blue-400 ml-2 ${
                    showNum && 'hidden'
                  } `}
                >
                  {lang ? 'Show Number' : 'ნომრის ჩვენება'}
                </p>
              </div>
              {/* location  */}
              <div>{lang ? location.keyen : location.key}</div>
            </div>
          </div>
        </div>
        {/* wrapper */}
      </div>
    </div>
  )
}

export default MainInfo
