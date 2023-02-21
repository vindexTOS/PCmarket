import React, { useState, useReducer, Reducer } from 'react'
import {
  IntelChips,
  AMDChips,
  RAMGB,
  ddr,
  AMDGPU,
  nvidiaGPU,
} from '../../context/ContextUtils'

import { UseMainContext } from '../../context/MainContext'
type SpecState = {
  CPU?: boolean
  dropDown?: boolean
  company?: string
  CPUmodel?: string
  CPUinputBool?: boolean
}
type SpecAction = {
  type: 'INTEL' | 'AMD' | 'DROPDOWN' | 'CPUModel'
  payload?: string
}

function PcSpecs() {
  const {
    CPUmodel,
    setCPUModel,
    CPUcompany,
    inputCPU,
    setInputCPU,
    lang,
    // GPU sstates
    GPUmodel,
    GPUcompany,
    inputGPU,
    setInputGPU,
    setGPUModel,
  } = UseMainContext()

  const specReducer = (state: SpecState, action: SpecAction): SpecState => {
    switch (action.type) {
      case 'INTEL':
        return {
          CPU: state.CPU = true,
          company: state.company = action.payload,
        }
      case 'AMD':
        return {
          CPU: state.CPU = false,
          company: state.company = action.payload,
        }
      case 'DROPDOWN':
        return { dropDown: state.dropDown = true }
      case 'CPUModel':
        return state.CPUmodel === 'Other'
          ? {
              CPUmodel: state.CPUmodel = action.payload,
              CPUinputBool: state.CPUinputBool = true,
            }
          : {
              CPUmodel: state.CPUmodel = action.payload,
              CPUinputBool: state.CPUinputBool = false,
            }

      default:
        return state
    }
  }
  const style = {
    mainDiv: `flex flex-col gap-5 items-center justify-center w-[100%] h-[320px]    bg-white rounded-[19px]`,
    CPU: `w-[90%] flex  h-[3rem]  items-center justify-between rounded-[12px] border-2  gap-10`,
    CPUoption: `w-[40%] cursor-pointer  outline-0 border-l-2`,
    GPURAM: `w-[90%] max_lg:text-[12px] flex max_sm:h-[7rem] max_sm:w-[160%]   max_sm:text-[1rem] max_sm:gap-2 max_sm:flex-col h-[3rem]  items-center justify-between  gap-10`,
    RAM: `w-[40%] flex  h-[3rem]  items-center justify-center rounded-[12px] border-2  gap-10`,
    GPU: `w-[50%] flex  h-[3rem]  items-center justify-between rounded-[12px] border-2  `,
    sections: `outline-0 cursor-pointer max_xl:text-[12px]   max_sm:w-[5rem] max_lg:w-[3rem]  `,
  }
  const [specState, DispatchSpec] = useReducer<Reducer<SpecState, SpecAction>>(
    specReducer,
    {
      CPU: true,
      dropDown: false,
      company: 'Intel',
      CPUmodel: 'model',
      CPUinputBool: false,
    },
  )
  return (
    <div className={style.mainDiv}>
      {/* <h1 onClick={() => console.log(specState.CPUmodel)}>ON CLICK </h1> */}
      {/* CPU DIV */}
      <div className={style.CPU}>
        <select
          className="outline-0 cursor-pointer"
          onChange={(e) => setCPUModel(e.target.value)}
        >
          <option>Intel</option>
          <option>Amd</option>
        </select>

        {!inputCPU ? (
          <>
            {CPUcompany ? (
              <select
                className={style.CPUoption}
                onChange={(e) =>
                  DispatchSpec({ type: 'CPUModel', payload: e.target.value })
                }
              >
                {IntelChips.map((chip) => (
                  <option key={chip}>{chip}</option>
                ))}
              </select>
            ) : (
              <select
                className={style.CPUoption}
                onChange={(e) =>
                  DispatchSpec({ type: 'CPUModel', payload: e.target.value })
                }
              >
                {AMDChips.map((chip) => (
                  <option key={chip}>{chip}</option>
                ))}
              </select>
            )}
          </>
        ) : (
          <input
            type="text"
            className=" outline-0 border-l-2  w-[40%] "
            placeholder=" Model name"
          />
        )}
        <p
          className="cursor-pointer h-[100%] w-[5rem] border-l-2  rounded-r-[9px]  flex items-center justify-center text-white bg-blue-400 hover:bg-blue-500 "
          onClick={() => setInputCPU(!inputCPU)}
        >
          {lang ? 'Other' : 'სხვა'}
        </p>
      </div>

      {/* GPU and RAM Div */}
      <div className={style.GPURAM}>
        {/* RAM DIV */}
        <div className={style.RAM}>
          <select className={style.sections}>
            {ddr.map((ddr) => (
              <option key={ddr}>{ddr}</option>
            ))}
          </select>
          <select className={style.sections}>
            {RAMGB.map((gb) => (
              <option key={gb}>{gb}</option>
            ))}
          </select>
        </div>
        {/* GPU */}
        <div className={style.GPU}>
          <select
            className={`${style.sections} w-[5rem]`}
            onChange={(e) => setGPUModel(e.target.value)}
          >
            <option>Nvidia</option>
            <option>AMD</option>
          </select>
          {inputGPU ? (
            <>
              {' '}
              {!GPUcompany ? (
                <select className={`${style.sections} w-[6rem]`}>
                  {AMDGPU.map((gpu) => (
                    <option key={gpu}>{gpu}</option>
                  ))}
                </select>
              ) : (
                <select className={`${style.sections} w-[6rem]`}>
                  {nvidiaGPU.map((gpu) => (
                    <option key={gpu}>{gpu}</option>
                  ))}
                </select>
              )}
            </>
          ) : (
            <input
              type="text"
              className=" outline-0 border-l-2   w-[40%]  "
              placeholder=" Model name"
            />
          )}

          <h1
            onClick={() => setInputGPU(!inputGPU)}
            className="h-[100%] w-[3rem] rounded-r-[10px] bg-blue-400 text-white flex items-center justify-center cursor-pointer hover:bg-blue-500"
          >
            {lang ? 'Other' : 'სხვა'}
          </h1>
        </div>
      </div>
      {/* MotherBoard */}
      <div>{/* chipset, ddr slot, company */}</div>
      {/* SSD/HDD */}
      <div>{/* eaither SSD/HDD , GB  */}</div>
      <div>{/* PSU how many W  */}</div>
    </div>
  )
}

export default PcSpecs
