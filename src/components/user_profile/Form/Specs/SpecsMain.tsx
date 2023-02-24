import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import PcSpecs from './PcSpecs'
import CPU from './CPU'
import GPU from './GPU'
import RAM from './RAM'
import MB from './MB'
import HARDDISK from './HARDDRIVE'
import Phone from './Phone'
function SpecsMain() {
  const {
    specCheck,
    cputCheck,
    gputCheck,
    RAMCheck,
    MbCheck,
    DISKCheck,
    PhoneCheck,
  } = UseFormContext()
  return (
    <>
      {specCheck && <PcSpecs />}
      {cputCheck && <CPU />}
      {gputCheck && <GPU />}
      {RAMCheck && <RAM />}
      {MbCheck && <MB />}
      {DISKCheck && <HARDDISK />}
      {PhoneCheck && <Phone />}
    </>
  )
}

export default SpecsMain
