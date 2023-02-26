import React from 'react'
import ProductCard from '../ProductCard'
import { UseProductContext } from '../../context/ProductContext'
import { UseFormContext } from '../../context/FormContext'
import { Outlet } from 'react-router-dom'
import ProductCardRow from '../ProductCardRow'
function PC() {
  const { PCData, gridLayOut, location } = UseProductContext()
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
    setReversData(PCData?.reverse())
    console.log(PCData)
  }, [PCData])
  if (location.pathname === '/desktop/used-pc') {
    return <Outlet />
  }
  return (
    <section className={style.section}>
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

export default PC
