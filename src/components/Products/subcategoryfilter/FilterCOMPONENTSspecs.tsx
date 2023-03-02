import React, { FC, useState, useEffect } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { UseFormContext } from '../../../components/context/FormContext'
import { UseProductContext } from '../../../components/context/ProductContext'
import {
  CPUGHZ,
  GPUMHZ,
  ramGBArray,
  ramDDRArray,
  ramMHZArray,
} from '../../../components/context/ContextUtils'

type SubStringType = {
  arr: string[]

  en: string
  ge: string
}
type PCFilterType = {
  aditionalObj: any
  category: string
}

function FilterPCSpecs() {
  const { lang } = UseFormContext()
  const {
    setComponentsData,
    productData,
    location,
    setComponentssubCategory,
    setComponentsCategory,
  } = UseProductContext()

  const SubStringArrayCPU = [
    {
      arr: ['2', '4', '6', '8', '10', '12', '14', '16'],

      en: 'CORES',
      ge: 'ბირთვები',
    },
    {
      arr: CPUGHZ,

      en: 'GHZ',
      ge: 'ჰერცები',
    },
    {
      arr: ['AMD', 'Intel'],

      en: 'Model',
      ge: 'მწარმოებელი',
    },
    {
      arr: ['i3', 'i5', 'i7', 'i9', 'Ryzen', 'FX', 'Phenom', 'Athlon'],

      en: 'CPU type',
      ge: 'პროცესორის ტიპი',
    },
    {
      arr: ['PC', 'Laptop'],

      en: 'System',
      ge: 'სისტემა',
    },
  ]

  const SubStringArrayGPU = [
    {
      arr: ['2Gb', '4Gb', '6Gb', '8Gb', '12Gb', '16Gb'],

      en: 'GPU RAM',
      ge: 'ოპერატიული ',
    },
    {
      arr: GPUMHZ,

      en: 'MHZ',
      ge: 'ჰერცები',
    },
    {
      arr: ['AMD', 'Nvidia'],

      en: 'Model',
      ge: 'მწარმოებელი',
    },
    {
      arr: ['GTX', 'RTX', 'Radeon'],

      en: 'GPU type',
      ge: 'მოდელი',
    },
    {
      arr: ['PC', 'Laptop'],

      en: 'System',
      ge: 'სისტემა',
    },
  ]

  const SubSTringArrayRAM = [
    {
      arr: ramGBArray,

      en: 'RAM GB',
      ge: 'ოპერატიული',
    },
    {
      arr: ramDDRArray,

      en: 'DDR',
      ge: 'დდრ',
    },
    {
      arr: ramMHZArray,

      en: 'MHZ',
      ge: 'მეგაჰერცი',
    },
    {
      arr: ['PC', 'Laptop'],

      en: 'MHZ',
      ge: 'მეგაჰერცი',
    },
  ]
  const style = {
    mainDiv: `w-[450px] h-[50px]  max_sm:w-[220px]   max_sm:h-[40px]  max_lg:w-[200px]    max_md:w-[180px] rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer`,
    arrowDiv: `flex w-[100%] justify-end`,
    linkDiv: `bg-white z-50 absolute border-[1px] max_sm:w-[220px] max_sm:items-center max_sm:justify-center  justify-center items-start max-w-[1000x]  flex-wrap  rounded-[12px] boxShaddow flex  max_sm:flex-col      px-2 gap-1 `,
    cpudiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    ramdiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    hddsdddiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    ddr: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
  }

  // state to store sub category data
  const [subData, setSubData] = useState(SubStringArrayCPU)

  // use effect to change fillter values based on different sub categorys

  useEffect(() => {
    if (location.pathname === '/components/cpu') {
      setComponentsCategory(true)
      setSubData(SubStringArrayCPU)
    } else if (location.pathname === '/components/gpu') {
      setComponentsCategory(true)
      setSubData(SubStringArrayGPU)
    } else if (location.pathname === '/components/ram') {
      // setComponentsCategory(false)
      setSubData(SubSTringArrayRAM)
    }
  }, [location, productData])

  // const [unCheckData, setUnCheckData] = useState<[]>([])
  // filter for PC specs
  //stack saves values from checkbox input as an array
  const [stack, setStack] = useState<string[]>([])
  // filterDataPC saves filtered value based on stack
  const [filterDataComponents, setfilterdDataComponents] = useState<any>([])
  useEffect(() => {
    // filter productData
    productData?.filter((val: PCFilterType) => {
      //check if object is part of the PC category
      if (val.category === 'CPU') {
        if (
          //checking specs based on stack values
          val.aditionalObj.CPU.includes(...stack) ||
          val.aditionalObj.CPUCOMPANY.includes(...stack) ||
          val.aditionalObj.CPUCORES.includes(...stack) ||
          val.aditionalObj.CPUGHZ.includes(...stack) ||
          val.aditionalObj.CPUPLATFORM.includes(...stack)
        ) {
          // pushing filtered data to filterDataPC state
          filterDataComponents.push(val)
        }
      } else if (val.category === 'GPU') {
        if (
          //checking specs based on stack values
          val.aditionalObj.GPU.includes(...stack) ||
          val.aditionalObj.GPUCOMPANY.includes(...stack) ||
          val.aditionalObj.GPUMHZ.includes(...stack) ||
          val.aditionalObj.GPUPLATFORM.includes(...stack) ||
          val.aditionalObj.GPURAM.includes(...stack)
        ) {
          // pushing filtered data to filterDataPC state
          filterDataComponents.push(val)
        }
      } else if (val.category === 'RAM') {
        if (
          val.aditionalObj.RAMDDR.includes(...stack) ||
          val.aditionalObj.RAMGB.includes(...stack) ||
          val.aditionalObj.RAMMHZ.includes(...stack) ||
          val.aditionalObj.RAMPLATFORM.includes(...stack)
        ) {
          filterDataComponents.push(val)
        }
      }
    })
    // adding filtered data and filtering  duplicat values
    if (stack.length > 0) {
      setComponentsData(
        filterDataComponents.filter(
          (obj: { id: any }, index: any, self: any[]) => {
            return index === self.findIndex((t) => t.id === obj.id)
          },
        ),
      )
    }
  }, [stack]) // use effect re triggers every time new value is passed to stack

  const [subCategoryDropDown, setsubCategoryDropDown] = useState<boolean>(false)
  const [checkedValues, setCheckedValues] = useState<string[]>([])
  const SubString: FC<SubStringType> = ({
    arr,

    en,
    ge,
  }): JSX.Element => {
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value
      let valuesStack = []
      valuesStack.push(value)
      if (e.target.checked) {
        setCheckedValues([...checkedValues, value])
        setStack([value])
      } else {
        setCheckedValues(checkedValues.filter((item) => item !== value))
        setStack(stack.filter((item) => item !== value))
        setStack([...valuesStack])
        console.log('unchecked')
      }
    } //
    return (
      <div
        key={ge}
        className="flex flex-col items-center w-[8rem] justify-center bg-white gap-2  border-gray-100 border-2 text-[14px] rounded-[12px]"
      >
        <p className="">{lang ? en : ge}</p>

        {arr.map((val) => (
          <label
            key={val}
            className="w-[5rem]  flex items-center justify-between labelStyle"
          >
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
          {subData.map((val) => {
            const { arr, en, ge } = val
            return <SubString arr={arr} en={en} ge={ge} />
          })}
        </div>
      )}
    </div>
  )
}
export default React.memo(FilterPCSpecs)
