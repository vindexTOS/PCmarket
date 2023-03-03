import React, { Reducer, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { UseProductContext } from '../context/ProductContext'
import { motion as m } from 'framer-motion'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
type State = {
  index: number
}
type Action = {
  type?: string
  payload?: any
}

function SingleProduct() {
  const { productData } = UseProductContext()
  const { productId } = useParams()

  const product = productData?.find(
    (producte: { id: any }) => String(producte.id) === productId,
  )

  const {
    aditionalObj,
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
  } = product || {}

  const style = {
    mainDiv: `w-[100%] h-[100%] flex items-center justify-between`,
    imgDiv: `flex  items-center justify-center gap-2  `,

    imgMapDiv: `flex  flex-col  gap-2`,
    imgMapSingle: `w-[90px] h-[90px] outline outline-1 cursor-pointer hover:outline-blue-400  `,
    imgMain: 'w-[520px] h-[500px] flex items-center justify-center',
    arrowDiv: `text-[4rem] absolute flex  w-[520px] items-cneter justify-between   text-opacity-50 `,
    arrow: `hover:text-opacity-90 cursor-pointer flex   text-center  text-opacity-50 text-gray-300 hover:bg-gray-400 hover:bg-opacity-50 rounded-[50%]`,
  }
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'IMG':
        return { index: state.index = action.payload }
      case 'INC':
        return {
          index: state.index >= imgs.length - 1 ? 0 : state.index + 1,
        }
      case 'DEC':
        return {
          index: state.index !== 0 ? state.index - 1 : imgs.length - 1,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    index: 0,
  })
  if (product) {
    return (
      <div className={style.mainDiv}>
        <div className={style.imgDiv}>
          <div className={style.imgMapDiv}>
            {imgs?.map((img: string, index: number) => {
              return (
                <img
                  style={{ userSelect: 'none' }}
                  className={style.imgMapSingle}
                  src={img}
                  onMouseOver={() => dispatch({ type: 'IMG', payload: index })}
                />
              )
            })}
          </div>
          <div className={style.imgMain}>
            <div className={style.arrowDiv}>
              <MdOutlineKeyboardArrowLeft
                onClick={() => dispatch({ type: 'DEC' })}
                className={style.arrow}
              />
              <MdOutlineKeyboardArrowRight
                onClick={() => dispatch({ type: 'INC' })}
                className={style.arrow}
              />
            </div>
            <img
              style={{ userSelect: 'none' }}
              className="h-[500px] w-[520px]"
              src={imgs[state.index]}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return <div>LOADING</div>
  }
}

export default SingleProduct

// {date: 'Fri Mar 03 2023 18:36:44 GMT+0400 (Georgia Standard Time)', imgs: Array(3), name: 'Gio', description: 'Condition:\t\nUsed: An item that has been used previ…rage Capacity:\t\n64 GB\nCamera Resolution:\t\n12.0 MP', timestamp: nt, …}
// aditionalObj
// :
// {PHONEcamera: '12 MP', PHONEscreen: '6.1 in', PHONEmodel: ' iPhone XR ', PHONEcompany: 'Apple', PHONECPU: 'Apple A14 Bionic', …}
// category
// :
// "Used"
// date
// :
// "Fri Mar 03 2023 18:36:44 GMT+0400 (Georgia Standard Time)"
// description
// :
// "Condition:\t\nUsed: An item that has been used previously. The item may have some signs of cosmetic wear, but is ... Read moreabout the condition\t\nUPC:\t\n0190198776402\nProcessor:\t\nHexa Core\t\nScreen Size:\t\n6.1 in\nColor:\t\nBlack\t\nMemory Card Type:\t\nBuilt-In Memory\nMPN:\t\nMRYR2LL/A\t\nModel Number:\t\nA1984 (CDMA + GSM)\nBrand:\t\nApple\t\nNetwork:\t\nUnlocked\nModel:\t\nApple iPhone XR\t\nConnectivity:\t\nBluetooth, 4G, Wi-Fi, Lightning, NFC\nStyle:\t\nBar\t\nOperating System:\t\niOS\nFeatures:\t\nAssistivetouch, Proximity Sensor, Truedepth Camera, Facial Recognition, Accelerometer, Smart Hdr, Ambient Light Sensor, Barometer, Wireless Charging, Fast Charge, Neural Engine, Three‑Axis Gyro\t\nStorage Capacity:\t\n64 GB\nCamera Resolution:\t\n12.0 MP"
// id
// :
// "EzH9q80JGAkvVl0oTouN"
// imgs
// :
// (3) ['https://firebasestorage.googleapis.com/v0/b/market…=media&token=01451754-3056-4bcb-9e0e-882f54c3c6c2', 'https://firebasestorage.googleapis.com/v0/b/market…=media&token=08b957e2-9bc2-4c84-b764-290ee1017e63', 'https://firebasestorage.googleapis.com/v0/b/market…=media&token=cdee74ea-b33c-42c6-a536-5da504f89a20']
// location
// :
// {keyen: 'Sagarejo', key: 'საგარეჯო'}
// name
// :
// "Gio"
// number
// :
// "8889998889"
// price
// :
// "255.00"
// priceCur
// :
// "$"
// priceNegotiation
// :
// "fixed"
// sallType
// :
// "sale"
// timestamp
// :
// nt {seconds: 1677854205, nanoseconds: 338000000}
// title
// :
// "Apple iPhone XR - 64GB - Black (Unlocked) A1984 (CDMA + GSM)"
// uid
// :
// "sF1397Vz2DcXLbcihTkFBfg00yH3"
