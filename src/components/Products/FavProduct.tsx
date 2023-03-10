import React from 'react'
import { UseProductContext } from '../context/ProductContext'

const FavProduct = () => {
  const { favProducts } = UseProductContext()
  return (
    <div>
      {favProducts?.map((val: any) => {
        return <h1>{val.title}</h1>
      })}
    </div>
  )
}

export default FavProduct
