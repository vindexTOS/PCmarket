import React from 'react'
import ProductCard from '../ProductCard'
import { UseProductContext } from '../../context/ProductContext'
import { UseFormContext } from '../../context/FormContext'
function PC() {
  const { PCData } = UseProductContext()
  const style = {
    section: `w-[100vw] h-[100%] mt-10 flex flex-wrap items-center justify-center  gap-10`,
  }
  const [reverseData, setReversData] = React.useState([])
  React.useEffect(() => {
    // val.category == 'Pre built' || val.category == 'Used Pc'
    setReversData(PCData?.reverse())
  }, [PCData])

  return (
    <section className={style.section}>
      {/* <h1 onClick={() => console.log(PCData)}>LOg</h1> */}

      {reverseData?.map((val: any) => {
        return <ProductCard val={val} />
      })}
    </section>
  )
}

export default PC
