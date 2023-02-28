import React, { FC, useState } from 'react'
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
}

function FilterPCSpecs() {
  const { lang } = UseFormContext()
  const { filterDispatch, filterState } = UseProductContext()
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
  const [checkedValues, setCheckedValues] = useState<string[]>([])

  const SubString: FC<SubStringType> = ({
    arr,
    type,
    en,
    ge,
    values,
  }): JSX.Element => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value

      if (e.target.value) {
        filterDispatch({ type: type, payload: value })
        setCheckedValues([...checkedValues, value])
      } else {
        setCheckedValues(checkedValues.filter((item) => item !== value))
      }
    }
    return (
      <div>
        <p>{lang ? en : ge}</p>

        {arr.map((val) => (
          <label key={val}>
            {val}
            <input
              value={val}
              checked={checkedValues.includes(val)}
              onChange={handleCheckBox}
              type="checkbox"
            />
          </label>
        ))}
      </div>
    )
  }

  const SubStringArray = [
    {
      arr: cpuTypes,
      type: 'CPU',
      en: 'CPU type',
      ge: 'პროცესორის ტიპი',
      values: filterState.CPU,
    },
    {
      arr: ramGBArray,
      type: 'RAM',
      en: 'RAM',
      ge: 'ოპერატიული',
      values: filterState.RAM,
    },
    {
      arr: ['SSD', 'HDD'],
      type: 'SSD',
      en: 'Disk type',
      ge: 'მყარი დისკი',
      values: filterState.SSD,
    },
    {
      arr: ssdCapacities,
      type: 'ROM',
      en: 'Size',
      ge: 'დისკის ზომა',
      values: filterState.ROM,
    },
    {
      arr: ramDDRArray,
      type: 'DDR',
      en: 'DDR',
      ge: 'დდრ',
      values: filterState.DDR,
    },
    {
      arr: AllPCGPU,
      type: 'GPU',
      en: 'GPU',
      ge: 'ვიდოე ბარათი',
      values: filterState.GPU,
    },
    {
      arr: motherboardSockets,
      type: 'MB',
      en: 'SOCKET',
      ge: 'დაფის სოკეტი',
      values: filterState.MB,
    },
    {
      arr: powerSupplyWatts,
      type: 'PSU',
      en: 'PSU',
      ge: 'კვების ბლოკი',
      values: filterState.PSU,
    },
  ]
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
            const { arr, type, en, ge, values } = val
            return (
              <SubString
                arr={arr}
                type={type}
                en={en}
                ge={ge}
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
