import React, { useState } from 'react'
import { georgianCities } from './formData'
import { UseMainContext } from '../../context/MainContext'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
interface Georgia {
  cityge: string
  keyen: string
}

function Contact() {
  const { lang, register, LocationTrack, location } = UseMainContext()

  const style = {
    mainDiv: `flex flex-col gap-5 items-center justify-center w-[100%] h-[320px]  pb-20 pt-20 pt-20 bg-white rounded-[19px]`,
    header: `w-[90%] flex items-start justfiy-start p-2   text-[15px] font-bold`,
    regionCategory: `flex flex-col w-[100%] h-[250px] items-center justify-center `,
    inputDiv: `w-[90%] h-[3rem] border-[1px] flex items-center justify-between  rounded-[17px] `,
    input: ` outline-0 ml-2 w-[80%]`,
    arrowIcons: `text-[13px] text-gray-400`,
    iconWrapper: `flex items-center justify-center mr-5 cursor-pointer`,
    categoryDiv: `absolute overflow-y-scroll   w-[580px] mt-[16rem] max-h-[200px] bg-white boxShaddow rounded-[17px] flex flex-col items-center justify-center`,
    p: `text-[11px] text-gray-400 w-[90%] p-2 `,
    mapWrapper: `   w-[100%]  max-h-[200px]   flex flex-col items-start  justify-start`,
    map: `text-[10px] p-2 text-gray-500 cursor-pointer hover:text-blue-400 hover:bg-gray-200 w-[100%]`,
    info: `flex gap-5 w-[90%] `,
    infoDiv: `w-[100%]`,
    infoInput: `outline-0 border-[1px] w-[100%] h-[3rem] rounded-[17px]`,
  }

  const [filterArr, setFiltterArr] = useState<{}[]>([])
  const [dropDown, setDropDown] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [data, setData] = useState(georgianCities)

  return (
    <div className={style.mainDiv}>
      <div className={style.header}>
        <h1>{lang ? 'Contact Info' : 'საკონტაქტო ინფორმაცია'}</h1>
      </div>
      <div className={style.regionCategory}>
        <p className={style.p}>
          {lang ? 'Select a location' : 'აირჩიე ტერიტორია'}
        </p>
        <div onClick={() => setDropDown(!dropDown)} className={style.inputDiv}>
          <input
            placeholder={`${lang ? location?.keyen : location?.key}`}
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
                      <div
                        onClick={() => LocationTrack(val.cityge, val.keyen)}
                        className={style.map}
                        key={val.cityge}
                      >
                        {lang ? val.keyen : val.cityge}
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={style.info}>
        <div className={style.infoDiv}>
          <p className={style.p}>{lang ? 'Name' : 'სახელი'}</p>
          <input
            {...register('name')}
            type="text"
            className={style.infoInput}
          />
        </div>
        <div className={style.infoDiv}>
          <p className={style.p}>{lang ? 'Number' : 'ნომერი'}</p>
          <input
            {...register('number')}
            type="number"
            className={style.infoInput}
          />
        </div>
      </div>
    </div>
  )
}

export default Contact
