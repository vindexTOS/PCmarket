import { Reducer, useReducer } from 'react'
import {
  AMDChips,
  AMDGPU,
  ddr,
  IntelChips,
  motherboardCompanies,
  motherboardSockets,
  nvidiaGPU,
  powerSupplyWatts,
  RAMGB,
  ssdCapacities,
  laptopNVIDiAGPU,
  laptopAMDGPU,
  laptopINTELCPU,
  laptopAMDCPU,
  laptopScreenSizes,
} from '../../../context/ContextUtils'

import { UseFormContext } from '../../../context/FormContext'
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
    register,
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
    // laptop chack
    laptopChack,
  } = UseFormContext()

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
    CPUoption: `w-[100%] cursor-pointer  outline-0 border-l-2`,
    GPURAM: `w-[90%] max_lg:text-[12px] flex max_sm:h-[7rem] max_sm:w-[160%]   max_sm:text-[1rem] max_sm:gap-2 max_sm:flex-col h-[3rem]  items-center justify-between  gap-10`,
    RAM: `w-[40%] flex  h-[3rem] max_lg:w-[50%]  items-center justify-center rounded-[12px] border-2  gap-10`,
    GPU: `w-[50%] flex  h-[3rem] max_lg:w-[50%] text  items-center justify-between rounded-[12px] border-2  `,
    sections: `outline-0 cursor-pointer max_xl:text-[12px]    max_sm:w-[5rem] max_lg:w-[3rem]  `,
    MB: `w-[90%] flex  h-[3rem]  items-center justify-between rounded-[12px] border-2  gap-10`,
    SSDPSU: `w-[90%] max_lg:text-[12px] flex max_sm:h-[7rem] max_sm:w-[160%]   max_sm:text-[1rem] max_sm:gap-2 max_sm:flex-col h-[3rem]  items-center justify-between  gap-10`,
    SSD: `w-[50%] flex  h-[3rem] max_lg:w-[50%] text  items-center justify-center gap-10 rounded-[12px] border-2 `,
    PSU: `w-[50%] flex  h-[3rem] max_lg:w-[50%] text  items-center justify-center rounded-[12px] border-2 `,
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
        <div className="flex items-center justify-center flex-col">
          <p className="text-[10px] ml-5 text-gray-500  ">
            {lang ? 'manufacturer' : 'მწარმოებელი'}
          </p>
          <select
            className="outline-0 cursor-pointer"
            onChange={(e) => setCPUModel(e.target.value)}
          >
            <option>Intel</option>
            <option>Amd</option>
          </select>
        </div>

        {!inputCPU ? (
          <>
            {CPUcompany ? (
              <div className="flex items-center justify-center w-[40%] flex-col">
                <p className="text-[10px] text-gray-500  ">
                  {lang ? 'Model' : 'მოდელი'}
                </p>
                <select
                  {...register('chip')}
                  className={style.CPUoption}
                  onChange={(e) =>
                    DispatchSpec({ type: 'CPUModel', payload: e.target.value })
                  }
                >
                  {laptopChack ? (
                    <>
                      {' '}
                      {laptopINTELCPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      {' '}
                      {IntelChips.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col">
                <p className="text-[10px] text-gray-500  ">
                  {lang ? 'Model' : 'მოდელი'}
                </p>
                <select
                  {...register('chip')}
                  className={style.CPUoption}
                  onChange={(e) =>
                    DispatchSpec({ type: 'CPUModel', payload: e.target.value })
                  }
                >
                  {laptopChack ? (
                    <>
                      {laptopAMDCPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      {AMDChips.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            )}
          </>
        ) : (
          <input
            {...register('chip')}
            type="text"
            className=" outline-0 border-l-2  w-[40%] "
            placeholder={lang ? ' Model Name' : ' მოდელის დასახელება'}
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
          <div className="flex items-center justify-center flex-col  ">
            <p className="text-[10px] text-gray-500  "> DRAM</p>
            <select
              {...register('ddr')}
              className={`w-[8rem] flex items-cente justify-center`}
            >
              {ddr.map((ddr) => (
                <option key={ddr}>{ddr}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center flex-col  ">
            <p className="text-[10px] text-gray-500  ">
              {lang ? 'Capacity' : 'ტევადობა'}
            </p>
            <select {...register('ramGb')} className={style.sections}>
              {RAMGB.map((gb) => (
                <option key={gb}>{gb}</option>
              ))}
            </select>
          </div>
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
                <select
                  {...register('gpu')}
                  className={`${style.sections} w-[6rem]`}
                >
                  {laptopChack ? (
                    <>
                      {' '}
                      {laptopAMDGPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      {' '}
                      {AMDGPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  )}
                </select>
              ) : (
                <select
                  {...register('gpu')}
                  className={`${style.sections} w-[6rem]`}
                >
                  {laptopChack ? (
                    <>
                      {' '}
                      {laptopNVIDiAGPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      {' '}
                      {nvidiaGPU.map((chip) => (
                        <option key={chip}>{chip}</option>
                      ))}
                    </>
                  )}
                </select>
              )}
            </>
          ) : (
            <input
              {...register('gpu')}
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
      <div className={style.MB}>
        <div className="flex items-center  justify-center flex-col">
          <p className="text-[10px] text-gray-500">
            {lang ? 'Manufacturer' : 'მწარმოებელი'}
          </p>
          <select {...register('mb')}>
            {motherboardCompanies.map((companie) => (
              <option>{companie}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center flex-col">
          <p className="text-[10px] text-gray-500">
            {lang ? 'Socket' : 'სოკეტი'}
          </p>
          <select {...register('mbSocket')}>
            {motherboardSockets.map((socket) => (
              <option key={socket}>{socket}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center flex-col">
          <p className="text-[10px] text-gray-500  ">
            {lang ? 'RAM Slots' : 'ოპერატიულის სლოტი'}
          </p>
          <select {...register('ramSlot')}>
            <option>2</option>
            <option>4</option>
            <option>8</option>
            <option>8+</option>
          </select>
        </div>
      </div>
      {/* SSD/HDD/PSU DIV */}
      <div className={style.SSDPSU}>
        {/* SSD/HDD */}
        <div className={style.SSD}>
          <div className="flex items-center justify-center flex-col  ">
            <p className="text-[10px] text-gray-500  ">
              {' '}
              {lang ? 'Drive' : 'დისკის ტიპი'}
            </p>
            <select {...register('harddrive')}>
              <option>HDD</option>
              <option>SDD</option>
            </select>{' '}
          </div>
          <div className="flex items-center justify-center flex-col  ">
            <p className="text-[10px] text-gray-500  ">
              {lang ? 'Capacity' : 'მოცულობა'}
            </p>{' '}
            <select {...register('harddriveGB')}>
              {ssdCapacities.map((ssd) => (
                <option>{ssd}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Power supply */}
        <div className={style.PSU}>
          <div className="flex items-center justify-center flex-col  ">
            {laptopChack ? (
              <p className="text-[10px] text-gray-500  ">
                {lang ? 'Screen size' : 'ეკრანის ზომა'}
              </p>
            ) : (
              <p className="text-[10px] text-gray-500  ">
                {lang ? 'Power Supply Wattage' : 'კვების ბლოკი ვატობა'}
              </p>
            )}
            <select {...register(`${laptopChack ? 'screen' : 'psu'}`)}>
              {laptopChack ? (
                <>
                  {laptopScreenSizes.map((screen) => (
                    <option>{screen}</option>
                  ))}
                </>
              ) : (
                <>
                  {powerSupplyWatts.map((pow) => (
                    <option>{pow}</option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PcSpecs
