import React, { FC } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import { BsStar } from 'react-icons/bs'

type AllRatingProps = {
  userId?: string
}
const AllRatingsPage: FC<AllRatingProps> = ({ userId }) => {
  const { reviewsData } = UseProfileContext()
  const { allUsers } = UseFormContext()

  const style = {
    mainDiv: `flex flex-col items-center gap-3   w-[80%] bg-white rounded-b-[12px]   pb-4   scroll overflow-y-scroll`,
    commentDiv: `flex gap-2   `,
    img: `rounded-[50%]   w-[40px] h-[40px] max_smm:w-[30px] max_smm:h-[30px]`,
    p: ` w-[700px]  max_x:w-[600px] max_lg:w-[550px] max_md2:w-[500px]   max_sm8:max-w-[300px] max_sm8:min-w-[200px]  max_smm:w-[120px] px-2  max-h-[700px] border-[1px] rounded-[12px] flex flex-col items-start justify-center `,
    starDiv: `flex text-yellow-300 gap-1`,
  }
  return (
    <div className={style.mainDiv}>
      {/* <button onClick={() => console.log(reviewsData)}>iinfoo</button> */}
      {reviewsData
        .filter((val: any) => String(userId) === String(val.sellerUser))
        .map((val: any, index: number) => {
          const findSomething = allUsers.find(
            (user: any) => user.uid === val.userCommentFrom,
          )
          const { imgUrl, userName } = findSomething

          const newArr = []
          for (let i = 0; i < val.rate; i++) {
            newArr.push('val')
          }

          return (
            <div key={val.sellerUser + index} className={style.commentDiv}>
              {/* <button onClick={() => console.log(findSomething)}>CLIC</button> */}
              <img className={style.img} src={imgUrl} />
              <p className={style.p}>
                <div className={style.starDiv}>
                  {newArr.map((val: any, index: number) => (
                    <BsStar key={val + index} />
                  ))}
                </div>
                {val.comment}
              </p>
            </div>
          )
        })}
    </div>
  )
}

export default AllRatingsPage
