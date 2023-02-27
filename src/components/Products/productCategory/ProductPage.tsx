import React, { FC } from 'react'
import ProductCard from '../ProductCard'
import { UseProductContext } from '../../context/ProductContext'
import { UseFormContext } from '../../context/FormContext'
import ProductCardRow from '../ProductCardRow'

type ProductPageProps = {
  data: []
}

const ProductPage: FC<ProductPageProps> = ({ data }): JSX.Element => {
  const { gridLayOut } = UseProductContext()
  const style = {
    section: `    ${
      gridLayOut
        ? 'w-[100vw] h-[100%] mt-10 productGrid items-center justify-center  gap-10'
        : 'w-[100%] h-[100%] mt-10 productGridRow  items-center justify-start ml-[10rem] '
    }
         `,
  }
  const [reverseData, setReversData] = React.useState([])
  React.useEffect(() => {
    // val.category == 'Pre built' || val.category == 'Used Pc'
    setReversData(data?.reverse())
  }, [data])

  return (
    <section className={style.section}>
      {/* <h1 onClick={() => console.log(productData)}>LOg</h1> */}

      {reverseData?.map((val: any) => {
        return (
          <div className="w-[100vw] h-[100%]">
            {gridLayOut ? (
              <ProductCard key={val.id} val={val} />
            ) : (
              <ProductCardRow key={val.id} val={val} />
            )}
          </div>
        )
      })}
    </section>
  )
}

export default ProductPage
