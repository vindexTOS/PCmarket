import React, { Reducer, useReducer, useState } from 'react'
import { TbBold, TbItalic, TbUnderline } from 'react-icons/tb'
import { UseMainContext } from '../../context/MainContext'
import { TfiHandPointDown } from 'react-icons/tfi'

type State = {
  bold: boolean
  italic: boolean
  underline: boolean
}
type Action = {
  type: string | []
}
function TitleCard() {
  const lineStyleReducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'bold':
        return { ...state, bold: !state.bold }
      case 'italic':
        return { ...state, italic: !state.italic }
      case 'underline':
        return { ...state, underline: !state.underline }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    lineStyleReducer,
    {
      bold: false,
      italic: false,
      underline: false,
    },
  )

  const { lang } = UseMainContext()

  const style = {
    title: `flex flex-col gap-5 items-center justify-center w-[100%] h-[490px] pb-20 pt-20 bg-white rounded-[19px]`,
    textAreaDiv: `w-[90%]   h-[12rem]  rounded-[17px] border-[1px] flex flex-col items-center justify-center gap-1`,
    textarea: `outline-0 h-[80%]  resize-none w-[95%] ${
      state.bold ? 'font-bold' : 'font-normal'
    } ${state.italic ? 'italic' : 'not-italic	'}  ${
      state.underline ? 'underline' : 'no-underline'
    } `,
    lineStyle: `h-[20%]  w-[90%] gap-1 flex flex-row items-center   justify-start`,
  }

  return (
    <div className={style.title}>
      <h1 className="w-[90%] text-[14px] ml-2 flex items-start justify-start font-bold">
        {lang ? 'Main characteristics' : 'ძირითადი მახასიათებლები'}
      </h1>
      <div className="flex flex-row items-center justify-center gap-5 p-5 w-[90%] h-[3rem] bg-gray-100 rounded-[17px] max_lg:pl-2 ">
        <p className="w-[2rem] h-[2rem] mr-10 bg-white rounded-[50%] flex items-center justify-center">
          <TfiHandPointDown className="text-orange-300 " />
        </p>
        <p className="text-[13px] pr-38 mr-10   ">
          {lang
            ? 'Add a suitable title and description'
            : 'დაამატე შესაფერისი სათაური და აღწერა'}
        </p>
      </div>
      <div className="w-[90%] gap-2 flex flex-col items-start justify-center  ">
        <p className="text-gray-400 text-[12px] ml-2">
          {lang ? 'Title' : 'სათაური'}
        </p>
        <input className=" w-[100%] h-[2.4rem] border-2 rounded-[17px]" />
      </div>
      <div className="w-[100%] flex flex-col items-center justify-center gap-3">
        <p className="text-gray-400 text-[12px] ml-2 w-[90%] flex items-start justify-start">
          {lang ? 'Description' : 'აღწერა'}
        </p>
        <div className={style.textAreaDiv}>
          <div className={style.lineStyle}>
            <TbBold
              className={`${
                state.bold ? 'text-black' : 'text-gray-400'
              } cursor-pointer`}
              onClick={() => dispatch({ type: 'bold' })}
            />{' '}
            <TbItalic
              className={`${
                state.italic ? 'text-black' : 'text-gray-400'
              } cursor-pointer`}
              onClick={() => dispatch({ type: 'italic' })}
            />{' '}
            <TbUnderline
              className={`${
                state.underline ? 'text-black' : 'text-gray-400'
              } cursor-pointer`}
              onClick={() => dispatch({ type: 'underline' })}
            />
          </div>
          <div className="w-[95%] h-[0.2px] bg-gray-400"></div>
          <textarea className={`${style.textarea} `}></textarea>
        </div>
      </div>
    </div>
  )
}

export default TitleCard
