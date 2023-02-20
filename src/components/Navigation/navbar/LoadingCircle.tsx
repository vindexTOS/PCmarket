import React from 'react'
import { motion as m } from 'framer-motion'
function LoadingCircle() {
  const circleRotate = () => {
    let rotate: number[] = []
    for (let i = 0; i < 60; i++) {
      rotate.push(360, 180)
    }
    return rotate
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <m.div
        className="w-[60px] h-[60px] rounded-[50%] flex items-center justify-center "
        style={{
          borderRadius: '50%',
          background:
            'linear-gradient(90deg, rgba(255,168,110,1) 18%, rgba(255,244,155,1) 51%, rgba(0,212,255,1) 81%)',
        }}
        animate={{ rotate: circleRotate() }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[45px] h-[45px] rounded-[50%] bg-white"></div>
      </m.div>
      <div className="flex flex-col gap-2">
        <m.div
          className="w-[6rem] h-[1rem] rounded-[24px] bg-gray-200"
          animate={{ x: [5, 0, 5, 0, 5, 0, 5, 0, 5] }}
          transition={{ duration: 5, repeat: Infinity }}
        ></m.div>
        <m.div
          animate={{ x: [5, 0, 5, 0, 5, 0, 5, 0, 5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="w-[8rem] h-[1rem] rounded-[24px] bg-gray-200"
        ></m.div>
      </div>
    </div>
  )
}

export default LoadingCircle
