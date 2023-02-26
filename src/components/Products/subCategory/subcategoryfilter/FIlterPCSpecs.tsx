import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { UseFormContext } from '../../../context/FormContext'
import { UseProductContext } from '../../../context/ProductContext'
import {
  ramGBArray,
  ssdCapacities,
  ramDDRArray,
  powerSupplyWatts,
  AllPCGPU,
  motherboardSockets,
} from '../../../context/ContextUtils'

function FilterPCSpecs() {
  const { lang } = UseFormContext()
  const { filterDispatch } = UseProductContext()
  const style = {
    mainDiv: `w-[450px] h-[50px]  max_sm:w-[220px]   max_sm:h-[40px]  max_lg:w-[200px]    max_md:w-[180px] rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer`,
    arrowDiv: `flex w-[100%] justify-end`,
    linkDiv: `bg-white z-50 absolute border-[1px] max_sm:w-[220px] max_sm:items-center max_sm:justify-center  justify-center items-center   w-[220px] [30%] max-h-[600px] rounded-[12px] boxShaddow flex flex-wrap  px-2 gap-1 `,
    cpudiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    ramdiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    hddsdddiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    ddr: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
  }
  const cpuTypes = ['i3', 'i5', 'i7', 'i9', 'Ryzen', 'FX', 'Phenom', 'Athlon']
  const [subCategoryDropDown, setsubCategoryDropDown] = useState<boolean>(false)
  const [cpuType, setCpuType] = useState<boolean>(false)
  return (
    <div>
      <div
        className={style.mainDiv}
        onClick={() => setsubCategoryDropDown(!subCategoryDropDown)}
      >
        <div className="  max_sm:ml-[3.5rem]  ">
          <p>{lang ? 'Filter' : 'ფილტრი'}</p>
        </div>
        <div className={style.arrowDiv}>
          {!subCategoryDropDown ? (
            <IoIosArrowDown className="mr-2 text-gray-400" />
          ) : (
            <IoIosArrowUp className="mr-2 text-gray-400" />
          )}
        </div>
      </div>
      {subCategoryDropDown && (
        <div className={style.linkDiv}>
          <div className={style.cpudiv}>
            <p>{lang ? 'CPU type' : 'პროცესორის ტიპი'}</p>
            <select
              onChange={(e) =>
                filterDispatch({ type: 'CPU', payload: e.target.value })
              }
              className="rounded-[12px] cursor-pointer"
            >
              {cpuTypes.map((cpu) => (
                <option>{cpu}</option>
              ))}
            </select>
          </div>
          <div className={style.ramdiv}>
            <p>{lang ? 'RAM' : 'ოპერატიული'}</p>
            <select
              onChange={(e) =>
                filterDispatch({ type: 'RAM', payload: e.target.value })
              }
              className="rounded-[12px] cursor-pointer"
            >
              {ramGBArray.map((ram) => (
                <option>{ram}</option>
              ))}
            </select>
          </div>
          <div className={style.hddsdddiv}>
            <p>{lang ? 'ROM' : 'მყარი დისკი'}</p>
            <select
              onChange={(e) =>
                filterDispatch({ type: 'SSD', payload: e.target.value })
              }
              className="rounded-[12px] cursor-pointer"
            >
              <option>SSD</option>
              <option>HDD</option>
            </select>
          </div>
          <div className={style.hddsdddiv}>
            <p>{lang ? 'Size' : 'დისკის ზომა'}</p>
            <select
              onChange={(e) =>
                filterDispatch({ type: 'ROM', payload: e.target.value })
              }
              className="rounded-[12px] cursor-pointer"
            >
              {ssdCapacities.map((hdd) => (
                <option>{hdd}</option>
              ))}
            </select>
          </div>
          <div className={style.ddr}>
            <p>{lang ? 'DDR' : 'დდრ'}</p>
            <select
              onChange={(e) =>
                filterDispatch({ type: 'DDR', payload: e.target.value })
              }
              className="rounded-[12px] cursor-pointer"
            >
              {ramDDRArray.map((ddr) => (
                <option>{ddr}</option>
              ))}
            </select>
          </div>
          <div className={style.ddr}>
            <p>{lang ? 'GPU' : 'ვიდოე ბარათი'}</p>
            <select
              onChange={(e) =>
                filterDispatch({ type: 'GPU', payload: e.target.value })
              }
              className="rounded-[12px] cursor-pointer"
            >
              {AllPCGPU.map((GPU) => (
                <option>{GPU}</option>
              ))}
            </select>
          </div>
          <div className={style.ddr}>
            <p>{lang ? 'SOCKET' : 'დაფის სოკეტი'}</p>
            <select
              onChange={(e) =>
                filterDispatch({ type: 'MB', payload: e.target.value })
              }
              className="rounded-[12px] cursor-pointer"
            >
              {motherboardSockets.map((socket) => (
                <option>{socket}</option>
              ))}
            </select>
          </div>
          <div className={style.ddr}>
            <p>{lang ? 'PSU' : 'კვების ბლოკი'}</p>
            <select
              onChange={(e) =>
                filterDispatch({ type: 'PSU', payload: e.target.value })
              }
              className="rounded-[12px] cursor-pointer"
            >
              {powerSupplyWatts.map((PSU) => (
                <option>{PSU}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
export default FilterPCSpecs
