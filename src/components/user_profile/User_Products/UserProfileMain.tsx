import React from 'react'
import { useParams } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
import UserNav from './UserNav'
function UserProfileMain() {
  const { UserProfileMainId } = useParams()

  const { lang, userData, user, allUsers } = UseFormContext()
  const { productData } = UseProductContext()

  const singleUser = productData?.filter(
    (val: any) => val.uid === UserProfileMainId,
  )

  const singleUserInfo = allUsers?.find(
    (val: any) => val.uid === UserProfileMainId,
  )
  const { imgUrl, userName } = singleUserInfo || {}
  const {
    aditionalObj,
    location,
    category,
    date,
    description,
    id,
    name,
    imgs,
    number,
    price,
    priceCur,
    priceNegotiation,
    sallType,
    title,
    uid,
  } = singleUser || {}

  const style = { mainDiv: `w-[100vw] h-[100vh]` }

  return (
    <div className={style.mainDiv}>
      <UserNav imgUrl={imgUrl} userName={userName} singleUser={singleUser} />
      <button onClick={() => console.log(singleUser[0].number)}>PN</button>
    </div>
  )
}

export default UserProfileMain
