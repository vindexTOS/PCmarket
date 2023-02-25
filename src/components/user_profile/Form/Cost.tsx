import React, { useState, useReducer, Reducer } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import { UseFormContext } from '../../context/FormContext'

function Cost() {
  const [dropDown, setDropDown] = useState<boolean>(false)

  const {
    lang,
    getPrice,
    setGetPrice,
    register,
    priceCur,
    setPrice,
    pricestate,
    dispatchprice,
  } = UseFormContext()
  const style = {
    mainDiv: `flex flex-col gap-5 items-center justify-center w-[100%] h-[270px] bg-white rounded-[19px] `,
    header: `w-[90%] flex items-center justify-start font-bold`,
    priceDiv: `flex  gap-2   justify-start flex-col w-[90%]`,
    PriceSelector: `flex items-center justify-start flex-row`,
    priceinputDiv: `w-[14rem] h-[3rem]  border-[1px] rounded-l-[14px] flex items-center justify-center hover:border-blue-300`,
    priceinputOverLay: `w-[14rem] h-[3rem]  border-[1px] rounded-l-[14px]  bg-gray-100`,
    priceinput: `outline-0 88%`,
    priceDrop: `w-[7rem] h-[3rem] flex items-center justify-end gap-5 cursor-pointer border-[1px] rounded-r-[14px] hover:border-blue-300`,
    icon: `text-[13px] text-gray-400 mr-5`,
    dropDownDiv: `absolute w-[7rem] h-[6rem] flex items-center flex-col justify-center bg-white rounded-[14px] border-[1px] mt-40  boxShaddow ${
      !dropDown ? 'hidden' : ''
    }`,
    priceP: `h-[50%] w-[100%] hover:bg-gray-200 rounded-[14px] text-center flex items-center justify-center cursor-pointer`,
    btnDiv: `flex flex-row gap-3 w-[90%] items-center justify-start`,
    btn: `w-[10rem] h-[2.4rem] bg-gray-100 rounded-[20px]  cursor-pointer text-[13px] flex items-center justify-center `,
  }

  return (
    <div className={style.mainDiv}>
      <h1 className={style.header}>{lang ? 'Price' : 'ფასი'}</h1>
      <div className={style.priceDiv}>
        <p className="text-[12px] text-gray-400 ml-2">
          {lang ? 'Indicate the price of the item' : 'მიუთითე ფასი'}
        </p>
        <div className={style.PriceSelector}>
          {!pricestate.negotiation ? (
            <div className={style.priceinputDiv}>
              <input
                {...register('price')}
                onChange={(e) => setGetPrice(e.target.valueAsNumber)}
                value={pricestate.negotiation ? 0 : getPrice}
                type="number"
                className={style.priceinput}
                placeholder=" 0"
              />
            </div>
          ) : (
            <span className={style.priceinputOverLay}> </span>
          )}
          <div
            onClick={() => setDropDown(!dropDown)}
            className={style.priceDrop}
          >
            {priceCur}
            {dropDown ? (
              <IoIosArrowUp className={style.icon} />
            ) : (
              <IoIosArrowDown className={style.icon} />
            )}
            <div className={style.dropDownDiv}>
              <p onClick={() => setPrice('₾')} className={style.priceP}>
                {lang ? 'Lari' : 'ლარი'}
              </p>
              <p onClick={() => setPrice('$')} className={style.priceP}>
                {lang ? 'Dollar' : 'დოლარი'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.btnDiv}>
        <p
          onClick={() => dispatchprice({ type: 'price' })}
          className={`${style.btn} ${
            pricestate.price ? 'bg-green-500 text-white' : ''
          }`}
        >
          {lang ? 'Price quote' : 'ფასიშ შეთავაზება'}
        </p>
        <p
          onClick={() => dispatchprice({ type: 'negotiation' })}
          className={`${style.btn} ${
            pricestate.negotiation ? 'bg-green-500 text-white' : ''
          }`}
        >
          {lang ? 'Price negotiable' : 'ფაში შეთანხმებით'}
        </p>
      </div>
    </div>
  )
}

export default Cost
