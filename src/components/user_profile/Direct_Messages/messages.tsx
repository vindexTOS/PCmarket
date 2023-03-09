import React from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import { MdCancel } from 'react-icons/md'
import { TbSend } from 'react-icons/tb'
import { Link } from 'react-router-dom'
function Messages() {
  const {} = UseFormContext()
  const {
    setDmPopUp,
    dmPopUp,
    messageUser,
    sendDm,
    message,
    setMessage,
    resivedMessages,
  } = UseProfileContext()

  const style = {
    mainDiv: `flex flex-col fixed top-60 left-[74%] w-[400px] h-[500px] border-2 z-50 boxShaddow bg-white rounded-l-[30px]`,
    headDiv: `border-b-2 flex  items-center justify-between p-4  `,
    cancel: `cursor-pointer text-[1.7rem] text-red-500 hover:text-red-600 mt-2 mr-5 `,
    img: `w-[50px] h-[50px] rounded-[50%]`,
    imgName: `flex  items-center justify-center gap-5 hover:bg-blue-200 hover:text-white pr-2 rounded-[30px]`,
    textArea: `flex outline outline-[2px] outline-gray-300 items-center justify-between `,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.headDiv}>
        <Link to={`/user/${messageUser?.uid}`} className={style.imgName}>
          <img className={style.img} src={messageUser?.imgUrl} />
          <h1>{messageUser?.userName}</h1>
        </Link>

        <MdCancel
          className={style.cancel}
          onClick={() => setDmPopUp(!dmPopUp)}
        />
      </div>
      <div className="h-[200px] w-[400px] ">
        <button onClick={() => console.log(resivedMessages)}>on clik</button>
        {resivedMessages?.map((val: any) => {
          return <div>{val.message}</div>
        })}
      </div>
      <div className={style.textArea}>
        <textarea
          className="resize-none outline-0 text-gray-400 w-[80%] "
          placeholder="   Send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className="flex items-center justify-center w-[20%]"
          onClick={() => sendDm(messageUser?.uid)}
        >
          <TbSend className="text-[1.4rem]  " />
        </button>
      </div>
    </div>
  )
}

export default Messages
