import React, { FC, useState, useEffect, useMemo } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'

type DescriptionProp = {
  description: string
  aditionalObj: {
    chip: string
    ddr: string
    ramGb: string
    gpu: string
    mb: string
    mbSocket: string
    ramSlot: string
    harddrive: string
    harddriveGB: string
    screen: string
  }
  category: string
}

const Description: FC<DescriptionProp> = ({
  description,
  aditionalObj,
  category,
}) => {
  const { lang } = UseFormContext()
  const { productData } = UseProductContext()

  // aditionalObj descruction baased on category
  const [aditionalSpecs, setAditionalSpecs] = useState<object>({})

  useEffect(() => {
    const LaptopVal = () => {
      if (category == 'Used Laptop') {
        const {
          chip,
          ddr,
          ramGb,
          gpu,
          mb,
          mbSocket,
          ramSlot,
          harddrive,
          harddriveGB,
          screen,
        } = aditionalObj || {}
        return {
          chip,
          ddr,
          ramGb,
          gpu,
          mb,
          mbSocket,
          ramSlot,
          harddrive,
          harddriveGB,
          screen,
        }
      }
    }

    setAditionalSpecs(LaptopVal)
  }, [productData])

  const style = {
    mainDiv: `w-[85%] max_x:w-[95%] h-[900px] flex items-center justify-center  boxShaddow bg-white rounded-[16px]`,
    descriptionDiv: `flex gap-10 w-[90%] max_x:flex-col `,
    specificationsDiv: ``,
  }

  return (
    <div className={style.mainDiv}>
      <h1 onClick={() => console.log(aditionalSpecs)}>LOG</h1>
      <div className={style.descriptionDiv}>
        <h1 className="text-[1.1rem] w-[14rem] font-bold ">
          {lang ? 'Description' : 'პროდუქტის აღწერა'}
        </h1>
        <p className="w-[70%] max_x:w-[90%] text-[15px] text-gray-400">
          {description}
        </p>
      </div>
      <div className={style.specificationsDiv}></div>
    </div>
  )
}

export default Description
