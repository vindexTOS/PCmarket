import React, { FC, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProductContext } from '../../context/ProductContext'

function PCfilter() {
  const { lang } = UseFormContext()
  const { location, dropDownFilter } = UseProductContext()
  const style = {
    mainDiv: ` w-[270px]    h-[50px]   max_md:h-[40px]  max_sm:h-[40px]   rounded-[16px] border-[1px] flex items-center justify-between cursor-pointer`,
    arrowDiv: `flex w-[100%] justify-around items-center`,
    linkDiv: ` bg-white gap-2 py-2 z-50 absolute border-[1px] w-[220px] h-[300px] rounded-[12px] boxShaddow flex flex-col px-2 max_sm:mt-[8rem] mt-[21.6rem] `,
    link: `w-[100%] hover:bg-gray-300 p-[2px] px-2 cursor-pointer rounded-[12px] hover:text-blue-500 `,
  }
  const [subCategoryDropDown, setsubCategoryDropDown] = useState<boolean>(false)

  const routeName = () => {
    if (location.pathname === '/components') {
      return lang ? 'All' : 'ყველა'
    } else if (location.pathname === '/components/cpu') {
      return lang ? 'CPU' : 'პროცესორი'
    } else if (location.pathname === '/components/gpu') {
      return lang ? 'GPU' : 'გრაფიკა'
    } else if (location.pathname === '/components/ram') {
      return lang ? 'RAM' : 'ოპერატიული'
    } else if (location.pathname === '/components/harddisk') {
      return lang ? 'Hard Drive' : 'მყარი დისკი'
    } else if (location.pathname === '/components/motherboard') {
      return lang ? 'Mother Board' : 'დედა დაფა'
    } else if (location.pathname === '/components/case') {
      return lang ? 'Case' : 'კეისი'
    } else if (location.pathname === '/components/other') {
      return lang ? 'Others' : 'სხვა'
    }
  }

  type LinkProps = {
    link: string
    en: string
    ge: string
  }

  const LinkDiv: FC<LinkProps> = ({ link, en, ge }): JSX.Element => {
    return (
      <Link
        className={`${style.link}${
          location.pathname === link ? 'bg-gray-300' : ''
        } `}
        to={link}
      >
        {lang ? en : ge}
      </Link>
    )
  }
  return (
    <div
      className={style.mainDiv}
      onClick={() => setsubCategoryDropDown(!subCategoryDropDown)}
    >
      <div className={style.arrowDiv}>
        <p className="  w-[10rem]   text-[1em]">{routeName()}</p>
        {!subCategoryDropDown ? (
          <IoIosArrowDown className="mr-2 text-gray-400" />
        ) : (
          <IoIosArrowUp className="mr-2 text-gray-400" />
        )}
      </div>
      {subCategoryDropDown && (
        <div className={style.linkDiv}>
          <LinkDiv link={'/components'} en={'All'} ge={'ყველა'} />
          <LinkDiv link={'/components/cpu'} en={'CPU'} ge={'პროცესორი'} />
          <LinkDiv link={'/components/gpu'} en={'GPU'} ge={'გრაფიკა'} />
          <LinkDiv link={'/components/ram'} en={'RAM'} ge={'ოპერატიული'} />
          <LinkDiv
            link={'/components/harddisk'}
            en={'hard drive'}
            ge={'მყარი დისკი'}
          />
          <LinkDiv
            link={'/components/motherboard'}
            en={'Motherboard'}
            ge={'დედა დაფა'}
          />
          <LinkDiv link={'/components/case'} en={'Case'} ge={'კეისი'} />
          <LinkDiv link={'/components/other'} en={'other'} ge={'სხვა'} />
        </div>
      )}
    </div>
  )
}

export default PCfilter
