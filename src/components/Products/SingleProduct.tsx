import React from 'react'
import { useParams } from 'react-router-dom'
import { UseProductContext } from '../context/ProductContext'
function SingleProduct() {
  const { productData } = UseProductContext()
  const { productId } = useParams()

  const product = productData?.find(
    (producte: { id: any }) => String(producte.id) === productId,
  )

  return <div>{/* <h1 onClick={() => console.log(product)}>LOg</h1> */}</div>
}

export default SingleProduct
