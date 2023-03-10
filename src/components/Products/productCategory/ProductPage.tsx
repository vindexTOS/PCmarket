import React, { FC } from 'react'
import ProductCard from '../ProductCard'
import { UseProductContext } from '../../context/ProductContext'
import { UseFormContext } from '../../context/FormContext'
import ProductCardRow from '../ProductCardRow'
import MainLoadingGrid from '../loadingGrids/mainLoadingGrid'
type ProductPageProps = {
  data: []
}

const ProductPage: FC<ProductPageProps> = ({ data }): JSX.Element => {
  const { gridLayOut, search } = UseProductContext()
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
  const fakeArray = new Array(20).fill('val')
  if (data) {
    return (
      <section className={style.section}>
        {/* <h1 onClick={() => console.log(productData)}>LOg</h1> */}

        {reverseData
          ?.filter((val: any) => {
            if (search === '') {
              return val
            } else if (
              val.title.toLowerCase().includes(search.toLowerCase()) ||
              val.category.toLowerCase().includes(search.toLowerCase()) ||
              val.description.toLowerCase().includes(search.toLowerCase())
            ) {
              return val
            }
          })
          .map((val: any, index: number) => {
            return (
              <div key={val.id + index} className="w-[100vw] h-[100%]">
                {gridLayOut ? (
                  <ProductCard val={val} />
                ) : (
                  <ProductCardRow val={val} />
                )}
              </div>
            )
          })}
      </section>
    )
  } else {
    return (
      <section className={style.section}>
        {fakeArray.map((val: any) => {
          return (
            <div key={val}>
              <MainLoadingGrid />
            </div>
          )
        })}
      </section>
    )
  }
}

export default ProductPage
