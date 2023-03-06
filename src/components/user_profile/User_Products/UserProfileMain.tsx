import React from 'react'
import { useParams } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'
import UserNav from './UserNav'
import UserProduct from './UserProduct'

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

  const style = {
    mainDiv: `w-[100%] h-[100%]`,
    productDiv: `w-[100%] h-[100%]  items-center justify-center mt-10  productGrid`,
  }

  return (
    <div className={style.mainDiv}>
      {/* <button onClick={() => console.log(singleUser)}>PN</button> */}

      <UserNav imgUrl={imgUrl} userName={userName} singleUser={singleUser} />
      <div className={style.productDiv}>
        {' '}
        {singleUser?.map((val: any) => {
          const {
            location,
            date,
            id,
            imgs,
            price,
            priceCur,
            title,
            userName,
          } = val
          return (
            <UserProduct
              date={date}
              id={id}
              imgs={imgs}
              price={price}
              priceCur={priceCur}
              title={title}
              location={location}
              userName={userName}
            />
          )
        })}
      </div>
    </div>
  )
}

export default UserProfileMain
