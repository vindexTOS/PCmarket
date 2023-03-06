import React from 'react'
import { useParams } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'

function UserProduct() {
  const { productData } = UseProductContext()
  const { userData } = UseFormContext()
  const { userproductId } = useParams()
  const [userProduct, setUserProduct] = React.useState([])

  React.useEffect(() => {
    let newVal = productData?.filter((val: any) => {
      if (val.uid === userData[0].uid) {
        return val
      }
    })

    setUserProduct(newVal)
  }, [productData])
  const user = userProduct?.find(
    (producte: { uid: any }) => String(producte.uid) === userproductId,
  )
  return (
    <div>
      <button onClick={() => console.log(userProduct)}>click</button>
    </div>
  )
}

export default UserProduct
