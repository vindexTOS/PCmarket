import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import PcSpecs from './PcSpecs'
import CPU from './CPU'
import GPU from './GPU'
import RAM from './RAM'
import MB from './MB'
import HARDDISK from './HARDDRIVE'
function SpecsMain() {
  const {
    specCheck,
    cputCheck,
    gputCheck,
    RAMCheck,
    MbCheck,
    DISKCheck,
  } = UseFormContext()
  return (
    <>
      {specCheck && <PcSpecs />}
      {cputCheck && <CPU />}
      {gputCheck && <GPU />}
      {RAMCheck && <RAM />}
      {MbCheck && <MB />}
      {DISKCheck && <HARDDISK />}
    </>
  )
}

export default SpecsMain
