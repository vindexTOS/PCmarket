import React, { FC, useState, useEffect } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { UseFormContext } from '../../../components/context/FormContext'
import { UseProductContext } from '../../../components/context/ProductContext'
import {
  phoneCameraPixels,
  phoneCPUs,
  phoneCompanies,
  phoneScreenSizes,
} from '../../../components/context/ContextUtils'

type SubStringType = {
  arr: string[]

  en: string
  ge: string
  index: number
}
type PCFilterType = {
  aditionalObj: any
  category: string
}

function FilterPCSpecs() {
  const { lang } = UseFormContext()
  const { setPhoneData, productData } = UseProductContext()

  const SubStringArray = [
    {
      arr: phoneCompanies,

      en: 'Company',
      ge: 'მწარმოებელი',
    },
    {
      arr: phoneCameraPixels,

      en: 'Pixels',
      ge: 'კამერის პიქსელები',
    },
    {
      arr: phoneScreenSizes,

      en: 'Screen size',
      ge: 'ეკრანის ზომა ',
    },
    {
      arr: phoneCPUs,

      en: 'CPU type',
      ge: 'პროცესორის ტიპი',
    },
    {
      arr: ['2GB', '3GB', '4GB', '6GB', '8GB'],

      en: 'RAM',
      ge: 'ოპერატიული',
    },

    {
      arr: ['2GB', '4GB', '8GB', '16GB', '32GB', '64GB', '128GB', '256GB'],
      en: 'ROM',
      ge: 'შიდა მეხსიერება',
    },
  ]
  const style = {
    mainDiv: `w-[220px] h-[50px]   max_sm:h-[40px]  max_lg:w-[200px]       rounded-[16px] border-[1px] flex items-center justify-between  cursor-pointer`,
    arrowDiv: `flex w-[100%] justify-end`,
    linkDiv: `  z-50 absolute   max_sm:w-[220px] max_sm:items-center max_sm:justify-center  justify-center items-start max-w-[1000x]  flex-col  rounded-[12px]   flex  max_sm:flex-col      px-2 gap-1 `,
    cpudiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    ramdiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    hddsdddiv: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    ddr: `w-[140px] h-[50px] rounded-[9px] border-2 flex itesm-center justify-center flex-col cursor-pointer outline-none`,
    button: `bg-orange-400 w-[200px] h-[30px] text-white text-[1.3rem] rounded-[20px] hover:bg-yellow-400  `,
  }

  // const [unCheckData, setUnCheckData] = useState<[]>([])
  // filter for PC specs
  //stack saves values from checkbox input as an array
  const [stack, setStack] = useState<string[]>([])
  // filterDataPC saves filtered value based on stack
  const [filterDataPhone, setfilterDataPhone] = useState<any>([])
  // btn show
  const [btn, setBtn] = useState<boolean>(false)

  // filter button
  const Filter = () => {
    // filter productData
    productData?.filter((val: PCFilterType) => {
      //check if object is part of the PC category
      if (val.category == 'Used' || val.category == 'New') {
        if (
          //checking specs based on stack values
          val.aditionalObj.PHONECPU.includes(...stack) ||
          val.aditionalObj.PHONEcamera.includes(...stack) ||
          val.aditionalObj.PHONEcompany.includes(...stack) ||
          val.aditionalObj.PHONEmodel.includes(...stack) ||
          val.aditionalObj.PHONEram.includes(...stack) ||
          val.aditionalObj.PHONEscreen.includes(...stack)
        ) {
          // pushing filtered data to filterDataPC state
          filterDataPhone.push(val)
        }
      }
    })
    // adding filtered data and filtering  duplicat values
    if (stack.length > 0) {
      setPhoneData(
        filterDataPhone.filter((obj: { id: any }, index: any, self: any[]) => {
          return index === self.findIndex((t) => t.id === obj.id)
        }),
      )
    }
    setStack([])
  }

  const [dropDown, setDropDown] = useState<boolean[]>(
    new Array(SubStringArray?.length).fill(false),
  )
  const handleFilterDropDown = (index: number) => {
    let newValues = [...dropDown]
    newValues[index] = !newValues[index]
    setDropDown(newValues)
  }
  const [subCategoryDropDown, setsubCategoryDropDown] = useState<boolean>(false)
  const [checkedValues, setCheckedValues] = useState<string[]>([])
  const SubString: FC<SubStringType> = ({
    arr,
    index,
    en,
    ge,
  }): JSX.Element => {
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      let value = e.target.value

      let valuesStack = []
      valuesStack.push(value)
      if (e.target.checked) {
        setBtn(true)
        setCheckedValues([...checkedValues, value])
        setStack([value])
      } else {
        setCheckedValues(checkedValues.filter((item) => item !== value))
        setStack(stack.filter((item) => item !== value))
        setStack([...valuesStack])
      }
    } //
    return (
      <div
        key={ge}
        className="flex flex-col items-center max_sm:mr-5  w-[200px] justify-center bg-white gap-2  border-gray-100 border-2 border-yellow-400 text-[14px] rounded-[12px]"
      >
        <div
          className="cursor-pointer h-[30px] w-[100%] flex   items-center justify-betwneen text-gray-400 text-[1rem]"
          onClick={() => handleFilterDropDown(index)}
        >
          <p className="ml-2 w-[150px]">{lang ? en : ge}</p>
          {!dropDown[index] ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>

        {arr.map((val) => {
          if (dropDown[index]) {
            return (
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
            )
          }
        })}
      </div>
    )
  }

  return (
    <div>
      <div
        className={style.mainDiv}
        onClick={() => setsubCategoryDropDown(!subCategoryDropDown)}
      >
        <div className="  max_sm:ml-[3.5rem]   ">
          <p className="sm:ml-[4rem]">{lang ? 'Filter' : 'ფილტრი'}</p>
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
          {SubStringArray.map((val, index) => {
            const { arr, en, ge } = val
            return (
              <SubString key={index} arr={arr} en={en} ge={ge} index={index} />
            )
          })}
          {btn && (
            <button onClick={Filter} className={style.button}>
              {lang ? 'Filter' : 'გაფილტვრა'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
export default React.memo(FilterPCSpecs)
