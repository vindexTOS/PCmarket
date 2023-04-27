import React, { useEffect, useState } from 'react'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import { MdCancel } from 'react-icons/md'
import { TbSend } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { motion as m, useDragControls } from 'framer-motion'
function Messages() {
  const { user } = UseFormContext()
  const {
    setDmPopUp,
    dmPopUp,
    messageUser,
    sendDm,
    message,
    setMessage,
    resivedMessages,
    scroll,
  } = UseProfileContext()

  const style = {
    mainDiv: `flex  scroll flex-col pb-2 items-center justify-center  fixed top-[14rem] max_Xll:left-[70%] max_xl:left-[65%] max_x:left-[60%]  max_lg:left-[55%] max_md2:left-[40%] max_sm:left-0   left-[74%] w-[500px] h-[300px] max_sm:w-[100%] max_sm:h-[360px]  border-2 z-50 boxShaddow bg-white rounded-[20%]`,
    headDiv: ` flex  items-center justify-between p-4  rounded-t-[45%] w-[300px] `,
    cancel: `cursor-pointer text-[1.7rem] text-red-500 hover:text-red-600 mt-2 mr-5 `,
    img: `w-[50px] h-[50px] rounded-[50%]`,
    imgName: `flex  items-center justify-center gap-5 hover:bg-blue-200 hover:text-white pr-2 rounded-[30px]`,
    textArea: `flex   outline-gray-300 items-center justify-between   h-[5rem] `,
    sender: ` text-yellow-400  `,
    receiver: `text-green-600    `,
    message: `  text-start w-[88%] flex items-center justify-end ml-6 max-h-[10000px]  rounded-[30px] py-1 scroll `,
    messageUser: `w-[100%]  px-3   flex   max-h-[600px ]  rounded-[30px] py-1`,
  }
  const element = scroll?.current as HTMLDivElement
  React.useEffect(() => {
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }, [message])

  const controls = useDragControls()
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const [dragTurnOff, setDragTurnOff] = useState<boolean>(true)
  useEffect(() => {
    if (width < 450) {
      setDragTurnOff(false)
    } else {
      setDragTurnOff(true)
    }
  }, [width])
  return (
    <m.div
      drag={dragTurnOff}
      dragConstraints={{ left: -1000, right: 1000, top: -500, bottom: 500 }}
      dragElastic={false}
      dragMomentum={false}
      initial={{ y: -2800 }}
      animate={{ y: -70, x: dragTurnOff ? 2 : 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className={style.mainDiv}
    >
      <div className={style.headDiv}>
        <Link
          onClick={() => setDmPopUp(!dmPopUp)}
          to={`/messages/${messageUser?.uid}`}
          className={style.imgName}
        >
          <img className={style.img} src={messageUser?.imgUrl} />
          <h1>{messageUser?.userName}</h1>
        </Link>

        <MdCancel
          className={style.cancel}
          onClick={() => setDmPopUp(!dmPopUp)}
        />
      </div>
      <div className="h-[350px] w-[400px] flex flex-col    gap-1 overflow-x-hidden overflow-y-scroll scroll">
        {/* <button onClick={() => console.log(resivedMessages)}>on clik</button> */}
        {resivedMessages
          ?.filter(
            (item: any) =>
              (item.senderUid === messageUser?.uid &&
                item.resiverUid === user?.uid) ||
              (item.senderUid === user?.uid &&
                item.resiverUid === messageUser?.uid),
          )
          .map((val: any, index: number) => {
            return (
              <div
                key={index + val.senderUid}
                className={
                  val.senderUid === user?.uid ? style.sender : style.receiver
                }
              >
                {/* <img
              className={style.img}
              src={
                val.senderUid === user?.uid
                  ? user?.imgUrl
                  : messageUser?.imgUrl
              }
            /> */}
                <div
                  className={
                    val.senderUid === user?.uid
                      ? style.message
                      : style.messageUser
                  }
                >
                  <p className="outline outline-[1px] boxShaddow bg-gray-100 max-w-[400px] text-[15px] text-clip rounded-[30px] overflow-hidden scroll p-4">
                    {val.message}
                  </p>
                  <span ref={scroll}></span>
                </div>
              </div>
            )
          })}
        <span ref={scroll}></span>
      </div>
      <div className={style.textArea}>
        <textarea
          onKeyDown={(e) => e.key === 'Enter' && sendDm(messageUser?.uid)}
          className="resize-none outline-0 text-gray-400 w-[80%] rounded-b-[40%] "
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
    </m.div>
  )
}

export default Messages
