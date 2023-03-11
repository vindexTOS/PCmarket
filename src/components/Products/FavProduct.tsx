import React from 'react'
import { Link } from 'react-router-dom'
import { UseProductContext } from '../context/ProductContext'

const FavProduct = () => {
  const { favProducts, DeleteFav } = UseProductContext()
  const style = {
    section: `w-[100%] h-[100vh]  `,
    nav: `w-[100%] h-[60px] bg-white boxShaddow rounded-b-[10px]`,
    mainDiv: `flex items-center justify-start flex-col gap-2 mt-5 overflox-y-scroll scroll`,
    mapDiv: ` w-[20rem] bg-white flex  h-[5rem] items-center justify-center boxShaddow rounded-[30px] gap-3  `,
    img: `w-[50px] h-[50px] rounded-[20px] ml-3`,
  }
  return (
    <section className={style.section}>
      <nav className={style.nav}> </nav>
      <div className={style.mainDiv}>
        {favProducts?.map((val: any) => {
          return (
            <div className={style.mapDiv} key={val.id}>
              <img className={style.img} src={val.imgs[0]} />
              <div>
                <Link
                  to={`/${val.id}`}
                  className="w-[15rem] text-[14px] text-blue-400 hover:text-blue-300 underline"
                >
                  {val.title.slice(0, 25)}...
                </Link>
                <div className="flex gap-1">
                  <p className="bg-green-400 p-1 text-white rounded-[30px] text-center font-bold w-[5rem]">
                    {val.priceCur}
                    {val.price}
                  </p>
                  <button
                    onClick={() => DeleteFav(val.id)}
                    className="text-white w-[8rem] bg-red-500 hover:bg-red-600 p-1 rounded-[30px] font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FavProduct
