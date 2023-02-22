import React from 'react'
import { UseFormContext } from '../../../context/FormContext'
import PcSpecs from './PcSpecs'
import CPU from './CPU'
function SpecsMain() {
  const { specCheck, cputCheck } = UseFormContext()
  return (
    <>
      {specCheck && <PcSpecs />}
      {cputCheck && <CPU />}
    </>
  )
}

export default SpecsMain
