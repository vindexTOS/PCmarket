import React from 'react'
import { motion as m } from 'framer-motion'
const UserNavLoadings = () => {
  const style = {
    navDiv: `w-[100%] h-[250px] mt-1 bg-white flex items-center justify-center gap-20 max_md2:flex-col max_md2:h-[320px]  max_md2:pb-5`,
    ball: `w-[100px] h-[100px] bg-yellow-400 rounded-[50%]`,
  }
  return (
    <div className={style.navDiv}>
      <m.div
        animate={{
          y: [
            -40,
            0,
            40,
            0,
            -40,
            0,
            40,
            0,
            -40,
            0,
            40,
            0,
            -40,
            0,
            40,
            0,
            -40,
            0,
            40,
            0,
          ],
          backgroundColor: [
            'rgba(255,228,69,1)',
            'rgba(255,253,40,1)',
            'rgba(255,251,106,1)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className={style.ball}
      ></m.div>
      <m.div
        animate={{
          y: [
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
          ],
          backgroundColor: [
            'rgba(255,228,69,1)',
            'rgba(255,253,40,1)',
            'rgba(255,251,106,1)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className={style.ball}
      ></m.div>
      <m.div
        animate={{
          y: [
            -90,
            0,
            90,
            0,
            -90,
            0,
            90,
            0,
            -90,
            0,
            90,
            0,
            -90,
            0,
            90,
            0,
            -90,
            0,
            90,
            0,
          ],
          backgroundColor: [
            'rgba(255,228,69,1)',
            'rgba(255,253,40,1)',
            'rgba(255,251,106,1)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className={style.ball}
      ></m.div>
      <m.div
        animate={{
          y: [
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
          ],
          backgroundColor: [
            'rgba(255,228,69,1)',
            'rgba(255,253,40,1)',
            'rgba(255,251,106,1)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className={style.ball}
      ></m.div>
      <m.div
        animate={{
          y: [
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
            -60,
            0,
            60,
            0,
          ],
          backgroundColor: [
            'rgba(255,228,69,1)',
            'rgba(255,253,40,1)',
            'rgba(255,251,106,1)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className={style.ball}
      ></m.div>
    </div>
  )
}

export default UserNavLoadings
