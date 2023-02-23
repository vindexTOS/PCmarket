import React from 'react'
import ProductCard from '../ProductCard'
import { UseProductContext } from '../../context/ProductContext'
import { useParams } from 'react-router-dom'
function PC() {
  const { productData } = UseProductContext()

  const style = {
    section: `w-[100vw] h-[100%] mt-10 flex flex-wrap items-center justify-center  gap-10`,
  }

  const [reverseData, setReversData] = React.useState([])
  React.useEffect(() => {
    setReversData(productData?.reverse())
  }, [productData])

  return (
    <section className={style.section}>
      <h1 onClick={() => console.log(productData)}>LOg</h1>

      {reverseData
        ?.filter(
          (val: any) =>
            val.category == 'Pre built' || val.category == 'Used Pc',
        )
        .map((val: any) => {
          return <ProductCard val={val} />
        })}
    </section>
  )
}

export default PC
