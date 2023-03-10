import React from 'react'
import { motion as m } from 'framer-motion'
import { Utils } from '../../../utils/data/Photos'
const MainLoadingGrid = () => {
  const style = {
    productCard: ` bg-white w-[400px] h-[500px] max_sm:w-[350px] max_smm:ml-5 rounded-[15px] boxShaddow flex items-center flex-col justify-between `,
    header: ` h-[70px] rounded-t-[15px] w-[100%]  border-b-[1px]   flex items-center justify-start       `,
    imgWrapper: `w-[340px] h-[50%] rounded-[15px]    rounded-[20px] flex items-center justify-start`,
    arrowIcons: `text-[3rem] cursor-pointer text-black hover:bg-black hover:text-gray-100 rounded-[50%]  z-10`,
    price: ` h-[50px] absolute mt-[22.2rem] mr-[12rem] rounded-[30px]`,
    bottomDiv: `w-[90%] h-[4rem] rounded-[30px] flex  gap-2    `,
    date: `gap-2  rounded-[30px]  flex items-start  justify-start  w-[40%] ml-5 text-gray-300  h-[20px] max_md:text-[14px]`,
    location: ` h-[14px] w-[150px]  rounded-[30px]  flex items-start  justify-start  mt-20  mr-[10rem] absolute`,

    userDiv: `flex h-[20px] rounded-[30px] w-[40%]  ml-5 text-gray-300 max_md:text-[14px]`,
  }

  return (
    <div className={style.productCard}>
      {/* <h1 onClick={() => console.log(location)}>LOg</h1> */}
      <div className={style.header}>
        <m.div
          className="rounded-[30px] ml-4 h-[90%]"
          animate={{
            paddingRight: [
              '200px',
              '250px',
              '320px',
              '350px',
              '370px',
              '350px',
            ],

            backgroundColor: [
              'rgba(255,228,69,1)',
              'rgba(255,253,40,1)',
              'rgba(255,251,106,1)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, type: 'spring' }}
        ></m.div>
      </div>
      <m.p
        animate={{
          backgroundColor: [
            'rgba(255,228,69,1)',
            'rgba(255,253,40,1)',
            'rgba(255,251,106,1)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, type: 'spring' }}
        className={style.location}
      >
        <m.div></m.div>
      </m.p>

      <div className={style.imgWrapper}>
        <m.div
          className="rounded-[30px]   h-[90%]"
          animate={{
            paddingRight: ['300px', '310px', '320px', '330px'],

            backgroundColor: [
              'rgba(255,228,69,1)',
              'rgba(255,253,40,1)',
              'rgba(255,251,106,1)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, type: 'spring' }}
        ></m.div>
      </div>

      <m.p
        animate={{
          backgroundColor: [
            'rgba(69,255,131,1)',
            'rgba(55,255,40,1)',
            'rgba(127,255,106,1)',
          ],
          width: ['60px', '70px', '80px', '100px', '120px', '140px', '160px'],
        }}
        transition={{ duration: 2, repeat: Infinity, type: 'spring' }}
        className={style.price}
      ></m.p>
      <div className={style.bottomDiv}>
        <m.div
          animate={{
            backgroundColor: [
              'rgba(255,228,69,1)',
              'rgba(255,253,40,1)',
              'rgba(255,251,106,1)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, type: 'spring' }}
          className={style.date}
        >
          <p> </p>
          <p className="text-gray-400"> </p>
        </m.div>
        <m.div
          animate={{
            backgroundColor: [
              'rgba(255,228,69,1)',
              'rgba(255,253,40,1)',
              'rgba(255,251,106,1)',
            ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className={style.userDiv}
        >
          <p> </p>
          <p className="text-gray-400 ml-1"> </p>
        </m.div>
      </div>
    </div>
  )
}

export default MainLoadingGrid
