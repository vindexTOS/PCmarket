import React, { FC, useState, useEffect } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { UseFormContext } from '../../../components/context/FormContext'
import { UseProductContext } from '../../../components/context/ProductContext'
import {
  ramGBArray,
  ssdCapacities,
  ramDDRArray,
  powerSupplyWatts,
  AllPCGPU,
  motherboardSockets,
} from '../../../components/context/ContextUtils'

type SubStringType = {
  arr: string[]
  type: string
  en: string
  ge: string
  values: string
  typeunCheck: string
}

function FilterPCSpecs() {
  const { lang } = UseFormContext()
  const { filterDispatch, filterState, gridLayOut } = UseProductContext()

  const SubStringArray = [
    {
      arr: AllPCGPU,
      type: 'GPU',
      typeunCheck: 'GPUUNCHECK',
      en: 'GPU',
      ge: 'ვიდოე ბარათი',
      values: filterState.GPU,
    },
    {
      arr: motherboardSockets,
      type: 'MB',
      typeunCheck: 'MBUNCHECK',

      en: 'SOCKET',
      ge: 'დაფის სოკეტი',
      values: filterState.MB,
    },
    {
      arr: powerSupplyWatts,
      type: 'PSU',
      typeunCheck: 'PSUCHECK',
      en: 'PSU',
      ge: 'კვების ბლოკი',
      values: filterState.PSU,
    },
    {
      arr: ['i3', 'i5', 'i7', 'i9', 'Ryzen', 'FX', 'Phenom', 'Athlon'],
      type: 'CPU',
      typeunCheck: 'CPUUNCHECK',
      en: 'CPU type',
      ge: 'პროცესორის ტიპი',
      values: filterState.CPU,
    },
    {
      arr: ramGBArray,
      type: 'RAM',
      typeunCheck: 'RAMUNCHECK',
      en: 'RAM',
      ge: 'ოპერატიული',
      values: filterState.RAM,
    },
    {
      arr: ramDDRArray,
      type: 'DDR',
      typeunCheck: 'SSDUNCHECK',
      en: 'DDR',
      ge: 'დდრ',
      values: filterState.DDR,
    },

    {
      arr: ssdCapacities,
      type: 'ROM',
      typeunCheck: 'RAMUNCHECK',

      en: 'Size',
      ge: 'დისკის ზომა',
      values: filterState.ROM,
    },
    {
      arr: ['SSD', 'HDD'],
      type: 'SSD',
      typeunCheck: 'SSDUNCHECK',
      en: 'Disk type',
      ge: 'მყარი დისკი',
      values: filterState.SSD,
    },
  ]
  const style = {
    mainDiv: `w-[450px] h-[50px]  max_sm:w-[220px]   max_sm:h-[40px]  max_lg:w-[200px]    max_md:w-[180px] rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer`,
    arrowDiv: `flex w-[100%] justify-end`,
    linkDiv: `bg-white z-50 absolute border-[1px] max_sm:w-[220px] max_sm:items-center max_sm:justify-center  justify-center items-start w-[1000x]   rounded-[12px] boxShaddow flex  max_sm:flex-col      px-2 gap-1 `,
    cpudiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    ramdiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    hddsdddiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    ddr: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
  }

  const [subCategoryDropDown, setsubCategoryDropDown] = useState<boolean>(false)
  const [checkedValues, setCheckedValues] = useState<string[]>([])

  const SubString: FC<SubStringType> = ({
    arr,
    type,
    typeunCheck,
    en,
    ge,
    values,
  }): JSX.Element => {
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value

      if (e.target.checked) {
        filterDispatch({ type: type, payload: value })
        setCheckedValues([...checkedValues, value])
      } else {
        setCheckedValues(checkedValues.filter((item) => item !== value))
        filterDispatch({ type: typeunCheck })
        console.log(filterState.CPU)
      }
    } //
    return (
      <div
        key={type}
        className="flex flex-col items-center w-[8rem] justify-center bg-white gap-2 border-2 text-[14px] rounded-[12px]"
      >
        <p className="">{lang ? en : ge}</p>

        {arr.map((val) => (
          <label
            key={val}
            className="w-[5rem] flex items-center justify-between"
          >
            {' '}
            {val}
            <input
              value={val}
              checked={checkedValues.includes(val)}
              onChange={handleCheckBox}
              type="checkbox"
              className="cursor-pointer"
            />
          </label>
        ))}
      </div>
    )
  }

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
          {SubStringArray.map((val) => {
            const { arr, type, en, ge, values, typeunCheck } = val
            return (
              <SubString
                arr={arr}
                type={type}
                en={en}
                ge={ge}
                typeunCheck={typeunCheck}
                values={values ?? ''}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
export default React.memo(FilterPCSpecs)
