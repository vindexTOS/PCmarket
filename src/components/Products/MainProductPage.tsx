import React from 'react'
import ProductCard from './ProductCard'
import ProductCardRow from './ProductCardRow'
import { UseProductContext } from '../context/ProductContext'
import { useParams } from 'react-router-dom'
import { UseFormContext } from '../context/FormContext'

function MainProductPage() {
  const {
    productData,
    gridLayOut,
    setGridLayOut,
    search,
    setSearch,
  } = UseProductContext()
  const { user } = UseFormContext()

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
    setReversData(
      productData?.sort(
        (a: any, b: any) => b.timestamp.seconds - a.timestamp.seconds,
      ),
    )
  }, [user, productData])

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
        .map((val: any) => {
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

export default MainProductPage

// [
//     {
//         "timestamp": {
//             "seconds": 1676816558,
//             "nanoseconds": 567000000
//         },
//         "category": "Used Pc",
//         "priceCur": "$",
//         "img": [
//             "https://firebasestorage.googleapis.com/v0/b/marketlisting-f4b50.appspot.com/o/imagesF1397Vz2DcXLbcihTkFBfg00yH3?alt=media&token=ca3f75ef-40eb-4c63-bb2f-a6a16eeed275",
//             "https://firebasestorage.googleapis.com/v0/b/marketlisting-f4b50.appspot.com/o/imagesF1397Vz2DcXLbcihTkFBfg00yH3?alt=media&token=ca3f75ef-40eb-4c63-bb2f-a6a16eeed275",
//             "https://firebasestorage.googleapis.com/v0/b/marketlisting-f4b50.appspot.com/o/imagesF1397Vz2DcXLbcihTkFBfg00yH3?alt=media&token=ca3f75ef-40eb-4c63-bb2f-a6a16eeed275"
//         ],
//         "price": "2000",
//         "date": "Sun Feb 19 2023 18:22:38 GMT+0400 (Georgia Standard Time)",
//         "number": "55991131",
//         "uid": "sF1397Vz2DcXLbcihTkFBfg00yH3",
//         "location": {
//             "keyen": "Tbilisi",
//             "key": "თბილისი"
//         },
//         "name": "david bowie",
//         "sallType": "buy",
//         "title": "Used gaming PC ",
//         "description": "\nOperating System: Windows 11 Home\n\nCase: iBUYPOWER HYTE Y60 RGB Gaming Case - Black\n\nProcessor: Intel® Core™ i9-13900KF CPU\n\nMemory: 32GB DDR4-3600 RGB RAM\n\nStorage: 2TB M.2 NVMe SSD\n\nVideo Card: GeForce RTX 3080 10GB\n\nMotherboard: Z690 DDR4 MB",
//         "id": "8neiIcebdOvIfYVaKjMv"
//     },
//     {
//         "imgs": [],
//         "number": "559223411",
//         "price": "299",
//         "uid": "sF1397Vz2DcXLbcihTkFBfg00yH3",
//         "priceCur": "$",
//         "timestamp": {
//             "seconds": 1676900794,
//             "nanoseconds": 99000000
//         },
//         "category": "CPU",
//         "name": "Giorga",
//         "sallType": "sale",
//         "description": "Based on the Ampere architecture and designed to handle the graphical demands of Full HD 1080p gaming, the MSI GeForce RTX 3050 VENTUS 2X OC Graphics Card brings the power of real-time ray tracing and AI to your PC games. The GPU features 8GB of GDDR6 VRAM and a 128-bit memory interface, offering improved performance and power efficiency over the previous Turing-based generation.\n\nThe front panel of the card features a variety of outputs, such as DisplayPort 1.4a and HDMI 2.1. HDMI 2.1 supports up to 48 Gb/s bandwidth and a range of higher resolutions and refresh rates, including 8K @ 60 fps, 4K @ 120 fps, and even up to 10K. The RTX 3050 is not just about high-resolution gaming. Computationally intensive programs can utilize the GPU's 2560 cores to accelerate tasks using CUDA and other APIs.\n\nFor cooling, MSI implemented dual TORX 4.0 fans, which maximize downward airflow and air dispersion to the heat sink below them. This GPU also utilizes MSI ZeroFrozr technology to eliminate fan noise by stopping the fans in low-load situations.",
//         "location": {
//             "keyen": "Tbilisi",
//             "key": "თბილისი"
//         },
//         "title": "MSI RTX3080",
//         "date": "Mon Feb 20 2023 17:46:35 GMT+0400 (Georgia Standard Time)",
//         "id": "B3yniRDd16gDt23B5kjW"
//     }
// ]
