import React from 'react'
import { BsLinkedin, BsYoutube, BsGithub } from 'react-icons/bs'

function Footer() {
  const style = {
    footer: `w-[100%]  max_md2:h-[200px] max_md2:flex-wrap  max_md2:justify-center max_md2:gap-10 h-[60px] flex items-center justify-between bg-white border-[1px] mt-10 px-5`,
  }
  return (
    <footer className={style.footer}>
      <div className="flex gap-5">
        <a
          href="https://www.linkedin.com/in/giorgi-kutateladze-65a83919a/"
          target="_blank"
        >
          <BsLinkedin className="text-[2rem] text-[#0077b5] " />
        </a>
        <a href="https://www.youtube.com/@VindexTOS/featured" target="_blank">
          <BsYoutube className="text-[2rem] text-[#FF0000]" />
        </a>
        <a href="https://github.com/vindexTOS" target="_blank">
          <BsGithub className="text-[2rem] text-[#f79817]" />
        </a>
      </div>
      <div>
        <p className="text-gray-400 max_md2:text-[12px] ">
          ©2023 Developed by Giorgi Kutateladze
        </p>
      </div>
      <div>
        <p className="text-gray-400 max_md2:text-[12px] ">
          giorgikutateladze1998@gmail.com
        </p>
      </div>
    </footer>
  )
}

export default Footer
