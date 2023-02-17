import React, { useState } from 'react'
import { georgianCities } from './formData'
import { UseMainContext } from '../../context/MainContext'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
interface Georgia {
  cityge: string
  keyen: string
}

function Contact() {
  const { lang } = UseMainContext()

  const style = {
    mainDiv: `flex flex-col gap-5 items-center justify-center w-[100%] h-[200px] pb-20 pt-20 bg-white rounded-[19px]`,
    header: ``,
    regionCategory: `flex w-[100%] items-center justify-center `,
    inputDiv: `w-[90%] h-[3rem] border-[1px] flex items-center justify-between  rounded-[17px] `,
    input: ` outline-0 ml-2 w-[80%]`,
    arrowIcons: `text-[13px] text-gray-400`,
    iconWrapper: `flex items-center justify-center mr-5 cursor-pointer`,
    categoryDiv: `absolute overflow-y-scroll   w-[580px] mt-[16rem] h-[200px] bg-white boxShaddow rounded-[17px] flex flex-col items-center justify-center`,

    mapWrapper: `   w-[100%]  flex flex-col items-start  justify-start`,
    map: `text-[10px] p-2 text-gray-500 cursor-pointer hover:text-blue-400 hover:bg-gray-200 w-[100%]`,
    info: ``,
  }

  const [filterArr, setFiltterArr] = useState<{}[]>([])
  const [dropDown, setDropDown] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState(georgianCities)

  return (
    <div className={style.mainDiv}>
      <div className={style.header}>
        <h1 onClick={() => console.log(filterArr)}>Click</h1>

        <h1>{lang ? 'Contact Info' : 'საკონტაქტო ინფორმაცია'}</h1>
      </div>
      <div className={style.regionCategory}>
        <div onClick={() => setDropDown(!dropDown)} className={style.inputDiv}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setDropDown(!dropDown)}
            className={style.input}
            type="text"
          />
          <div
            className={style.iconWrapper}
            onClick={() => setDropDown(!dropDown)}
          >
            {dropDown ? (
              <IoIosArrowUp className={style.arrowIcons} />
            ) : (
              <IoIosArrowDown className={style.arrowIcons} />
            )}
          </div>
          {dropDown && (
            <div className={style.categoryDiv}>
              <div className={style.mapWrapper}>
                {data
                  .filter((val) => {
                    if (val.cityge === '' || val.keyen === '') {
                      return val
                    } else if (
                      val.cityge.includes(search) ||
                      val.keyen
                        .toLocaleLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return val
                    }
                  })
                  .map((val, index) => {
                    return (
                      <div className={style.map} key={val.cityge}>
                        {lang ? val.keyen : val.cityge}
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={style.info}></div>
    </div>
  )
}

export default Contact
