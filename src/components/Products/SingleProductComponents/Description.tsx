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
    mainDiv: `w-[85%] max_smm:w-[95vw] max_x:w-[95%] max-h-[2000px] pb-10 flex flex-col gap-40   items-center justify-start boxShaddow bg-white rounded-[16px]`,
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
    { val: chip, en: 'CPU', ge: '???????????????????????????' },

    { val: ramGb, en: 'RAM', ge: '??????????????????????????????' },
    { val: ddr, en: 'DDR', ge: '?????????' },
    { val: gpu, en: 'GPU', ge: '??????????????? ???????????????' },
    { val: mb, en: 'mb', ge: '???????????? ??????????????????' },
    { val: mbSocket, en: 'mbSocket', ge: '???????????? ????????????????????? ??????????????????' },
    { val: ramSlot, en: 'ramSlot', ge: '????????????????????????????????? ?????????????????? ???????????????????????????' },
    { val: harddrive, en: 'harddrive', ge: '??????????????? ?????????????????? ????????????' },
    { val: harddriveGB, en: 'harddriveGB', ge: '??????????????? ?????????????????? ????????????????????????' },
    { val: psu, en: 'psu', ge: '?????????????????? ???????????????' },
  ]
  const laptopObject = [
    { val: chip, en: 'CPU', ge: '???????????????????????????' },

    { val: ramGb, en: 'RAM', ge: '??????????????????????????????' },
    { val: ddr, en: 'DDR', ge: '?????????' },
    { val: gpu, en: 'GPU', ge: '??????????????? ???????????????' },
    { val: mb, en: 'mb', ge: '???????????? ??????????????????' },
    { val: mbSocket, en: 'mbSocket', ge: '???????????? ????????????????????? ??????????????????' },
    { val: ramSlot, en: 'ramSlot', ge: '????????????????????????????????? ?????????????????? ???????????????????????????' },
    { val: harddrive, en: 'harddrive', ge: '??????????????? ?????????????????? ????????????' },
    { val: harddriveGB, en: 'harddriveGB', ge: '??????????????? ?????????????????? ????????????????????????' },
    { val: screen, en: 'screen', ge: '????????????????????? ????????????' },
  ]

  const gpuObject = [
    { val: GPU, en: 'GPU', ge: '??????????????? ??????????????????' },
    { val: GPUCOMPANY, en: 'GPUCOMPANY', ge: '??????????????? ????????????????????? ?????????????????????????????????' },

    { val: GPUMHZ, en: 'GPUMHZ', ge: '?????????????????????' },
    { val: GPURAM, en: 'GPURAM', ge: '??????????????????????????????' },
  ]

  const cpuObject = [
    { val: CPU, en: 'CPU', ge: '???????????????????????????' },
    { val: CPUCOMPANY, en: 'CPUCOMPANY', ge: '?????????????????????????????????' },
    { val: CPUGHZ, en: 'CPUGHZ', ge: '???????????????' },
    { val: CPUCORES, en: 'CPUCORES', ge: '????????????????????????' },
  ]

  const ramObject = [
    { val: RAMGB, en: 'RAMGB', ge: '????????????????????????' },
    { val: RAMPLATFORM, en: 'RAMPLATFORM', ge: '???????????????????????????' },
    { val: RAMMHZ, en: 'RAMMHZ', ge: '???????????????' },
    { val: RAMDDR, en: 'RAMDDR', ge: '?????????' },
  ]

  const diskObject = [
    { val: DISKcapasity, en: 'DISKcapasity', ge: '?????????????????? ????????????????????????' },
    { val: DISKtype, en: 'DISKtype', ge: '???????????????v??? ????????????' },
    { val: DISKplatform, en: 'DISKplatform', ge: '???????????????????????????' },
  ]

  const phoneObject = [
    { val: PHONEcompany, en: 'PHONEcompany', ge: '?????????????????????????????????' },
    { val: PHONECPU, en: 'PHONECPU', ge: '???????????????????????????' },
    { val: PHONEscreen, en: 'PHONEscreen', ge: '????????????????????? ????????????' },
    { val: PHONEcamera, en: 'PHONEcamera', ge: '??????????????????' },
    { val: PHONEmodel, en: 'PHONEmodel', ge: '??????????????????' },
    { val: PHONEram, en: 'PHONEram', ge: '??????????????????????????????' },
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
          {lang ? 'Description' : '??????????????????????????? ??????????????????'}
        </h1>
        <p className="w-[70%] max_x:w-[90%] text-[15px] text-gray-400">
          {description}
        </p>
      </div>
      <div className={style.specificationsDiv}>
        <h1 className="text-[1.1rem] w-[14rem] font-bold ">
          {lang ? 'Specifications' : '??????????????????????????????????????????'}
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
