import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'

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
}): JSX.Element => {
  const { lang, userData } = UseFormContext()
  const { productData, location } = UseProductContext()
  const [userProduct, setUserProduct] = React.useState([])
  React.useEffect(() => {
    let newVal = productData?.filter((val: any) => {
      if (val.uid === userData[0].uid) {
        return val
      }
    })

    setUserProduct(newVal)
  }, [productData])
  const style = {
    mainInfoDiv: `  w-[40%] h-[90%] p-2 flex flex-col justify-between     `,
    subInfo: ` flex gap-5 border-2 p-1 rounded-[12px]`,
    unitedFirst: `pb-20 flex gap-2 flex-col`,
    price: `w-[90%] h-[120px] boxShaddow rounded-[30px]  flex items-center justify-center`,
    user: `flex items-center justify-start gap-2 w-[90%]  h-[120px]  boxShaddow  rounded-[30px]`,
    userAvatar: `w-[70px] h-[70px] rounded-[50%] mx-5 cursor-pointer`,
    userAvatarName: ``,
    priceAndUserInfo: 'flex flex-col   h-[350px] gap-5    ',
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainInfo
