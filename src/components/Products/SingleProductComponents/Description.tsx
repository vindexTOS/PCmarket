import React, { FC, useState, useEffect, useMemo } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'

type DescriptionProp = {
  description: string
  aditionalObj: {
    chip?: string
    ddr?: string
    ramGb?: string
    gpu?: string
    mb?: string
    mbSocket?: string
    ramSlot?: string
    harddrive?: string
    harddriveGB?: string
    screen?: string
    psu?: string
    GPU?: string
    GPUCOMPANY?: string
    GPUPLATFORM?: string
    GPUMHZ?: string
    GPURAM?: string
    CPU?: string
    CPUCOMPANY?: string
    CPUPLATFORM?: string
    CPUGHZ?: string
    CPUCORES?: string
    RAMGB?: string
    RAMPLATFORM?: string
    RAMMHZ?: string
    RAMDDR?: string
    //DISK
    DISKcapasity?: string
    DISKtype?: string
    DISKplatform?: string
    //phone
    PHONEcompany?: string
    PHONECPU?: string
    PHONEscreen?: string
    PHONEcamera?: string
    PHONEmodel?: string
    PHONEram?: string
  }
  category: string
}

type SpecsType = {
  val: string
  en: string
  ge: string
}

const Description: FC<DescriptionProp> = ({
  description,
  aditionalObj,
  category,
}) => {
  const { lang, location } = UseFormContext()
  const { productData, simularProRender } = UseProductContext()

  // aditionalObj descruction baased on category

  const style = {
    mainDiv: `w-[85%] max_smm:w-[100vw] max_x:w-[95%] max-h-[2000px] pb-10 flex flex-col gap-40   items-center justify-start boxShaddow bg-white rounded-[16px]`,
    descriptionDiv: `flex  gap-10 w-[90%] max_x:flex-col mt-10 `,
    specificationsDiv: `flex  gap-10 w-[90%] max_x:flex-col `,
  }

  // desctructuring different sub categorys
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
    psu,
    //GPU
    GPU,
    GPUCOMPANY,
    GPUPLATFORM,
    GPUMHZ,
    GPURAM,
    // CPU
    CPU,
    CPUCOMPANY,
    CPUPLATFORM,
    CPUGHZ,
    CPUCORES,
    //RAM
    RAMGB,
    RAMPLATFORM,
    RAMMHZ,
    RAMDDR,
    //disk
    DISKcapasity,
    DISKtype,
    DISKplatform,
    //phone
    PHONEcompany,
    PHONECPU,
    PHONEscreen,
    PHONEcamera,
    PHONEmodel,
    PHONEram,
  } = aditionalObj || {}
  // aditoinal information

  // spliting up objects based on there category
  const pcObject = [
    { val: chip, en: 'CPU', ge: 'პროცესორი' },

    { val: ramGb, en: 'RAM', ge: 'ოპერატიული' },
    { val: ddr, en: 'DDR', ge: 'დდრ' },
    { val: gpu, en: 'GPU', ge: 'ვიდეო ბარათ' },
    { val: mb, en: 'mb', ge: 'დედა ბარათი' },
    { val: mbSocket, en: 'mbSocket', ge: 'დედა ბარათის სოკეტი' },
    { val: ramSlot, en: 'ramSlot', ge: 'ოპერატიულის სლოტის რაოდენობა' },
    { val: harddrive, en: 'harddrive', ge: 'მყარი დისკის ტიპი' },
    { val: harddriveGB, en: 'harddriveGB', ge: 'მყარი დისკის მოცულობა' },
    { val: psu, en: 'psu', ge: 'კვების ბლოკი' },
  ]
  const laptopObject = [
    { val: chip, en: 'CPU', ge: 'პროცესორი' },

    { val: ramGb, en: 'RAM', ge: 'ოპერატიული' },
    { val: ddr, en: 'DDR', ge: 'დდრ' },
    { val: gpu, en: 'GPU', ge: 'ვიდეო ბარათ' },
    { val: mb, en: 'mb', ge: 'დედა ბარათი' },
    { val: mbSocket, en: 'mbSocket', ge: 'დედა ბარათის სოკეტი' },
    { val: ramSlot, en: 'ramSlot', ge: 'ოპერატიულის სლოტის რაოდენობა' },
    { val: harddrive, en: 'harddrive', ge: 'მყარი დისკის ტიპი' },
    { val: harddriveGB, en: 'harddriveGB', ge: 'მყარი დისკის მოცულობა' },
    { val: screen, en: 'screen', ge: 'ეკრანის ზომა' },
  ]

  const gpuObject = [
    { val: GPU, en: 'GPU', ge: 'ვიდეო ბარათი' },
    { val: GPUCOMPANY, en: 'GPUCOMPANY', ge: 'ვიდეო ბარათის მწარმოებელი' },

    { val: GPUMHZ, en: 'GPUMHZ', ge: 'ჰერცები' },
    { val: GPURAM, en: 'GPURAM', ge: 'ოპერატიული' },
  ]

  const cpuObject = [
    { val: CPU, en: 'CPU', ge: 'პროცესორი' },
    { val: CPUCOMPANY, en: 'CPUCOMPANY', ge: 'მწარმოებელი' },
    { val: CPUGHZ, en: 'CPUGHZ', ge: 'ჰერცი' },
    { val: CPUCORES, en: 'CPUCORES', ge: 'ბირთვები' },
  ]

  const ramObject = [
    { val: RAMGB, en: 'RAMGB', ge: 'მოცულობა' },
    { val: RAMPLATFORM, en: 'RAMPLATFORM', ge: 'პლატფორმა' },
    { val: RAMMHZ, en: 'RAMMHZ', ge: 'ჰერცი' },
    { val: RAMDDR, en: 'RAMDDR', ge: 'დდრ' },
  ]

  const diskObject = [
    { val: DISKcapasity, en: 'DISKcapasity', ge: 'დისკის მოცულობა' },
    { val: DISKtype, en: 'DISKtype', ge: 'დისკიvს ტიპი' },
    { val: DISKplatform, en: 'DISKplatform', ge: 'პლატფორმა' },
  ]

  const phoneObject = [
    { val: PHONEcompany, en: 'PHONEcompany', ge: 'მწარმოებელი' },
    { val: PHONECPU, en: 'PHONECPU', ge: 'პროცესორი' },
    { val: PHONEscreen, en: 'PHONEscreen', ge: 'ეკრანის ზომა' },
    { val: PHONEcamera, en: 'PHONEcamera', ge: 'კამერა' },
    { val: PHONEmodel, en: 'PHONEmodel', ge: 'მოდელი' },
    { val: PHONEram, en: 'PHONEram', ge: 'ოპერატიული' },
  ]
  // default state array of objects that changes based on with category we are on
  const [objectData, setObjectData] = useState<unknown | any>()

  // use effect checks products current category and changes objectData state accordingly
  useEffect(() => {
    if (category == 'New' || category == 'Used') {
      setObjectData(phoneObject)
    } else if (category == 'CPU') {
      setObjectData(cpuObject)
    } else if (category == 'GPU') {
      setObjectData(gpuObject)
    } else if (category == 'RAM') {
      setObjectData(ramObject)
    } else if (category == 'HDD/SSD') {
      setObjectData(diskObject)
    } else if (category == 'New Laptop' || category == 'Used Laptop') {
      setObjectData(laptopObject)
    } else if (category == 'Pre built' || category == 'Used Pc') {
      setObjectData(pcObject)
    }
  }, [productData, location, simularProRender])

  const Specs: FC<SpecsType> = ({ val, en, ge }): JSX.Element => {
    return (
      <div className="w-[100%] max_lg:items-center   max_lg:justify-center ">
        {val && (
          <div className="flex justify-between  max_x:w-[80%] w-[50%] ">
            <h1 className="text-gray-400  ">{lang ? en : ge}</h1>
            <h1>{val}</h1>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={style.mainDiv}>
      {/* <h1 onClick={() => console.log( )}>LOG</h1> */}
      <div className={style.descriptionDiv}>
        <h1 className="text-[1.1rem] w-[14rem] font-bold ">
          {lang ? 'Description' : 'პროდუქტის აღწერა'}
        </h1>
        <p className="w-[70%] max_x:w-[90%] text-[15px] text-gray-400">
          {description}
        </p>
      </div>
      <div className={style.specificationsDiv}>
        <h1 className="text-[1.1rem] w-[14rem] font-bold ">
          {lang ? 'Specifications' : 'სპეციფიკაციები'}
        </h1>
        <div className="flex flex-col gap-10 w-[100%]">
          {objectData?.map((val: any) => (
            <Specs val={val.val} en={val.en} ge={val.ge} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Description
