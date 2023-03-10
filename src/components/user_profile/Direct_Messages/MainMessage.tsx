import React, { FC, useMemo, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { TbSend } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import { UseFormContext } from '../../context/FormContext'
import { UseProfileContext } from '../../context/ProfileContext'
import { useParams } from 'react-router-dom'
const MainMessage = () => {
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
  const { user, allUsers } = UseFormContext()
  const { UserProfileMainId } = useParams()
  const singleUser = allUsers?.find((val: any) => val.uid == UserProfileMainId)

  const contactsFilter = resivedMessages?.filter(
    (val: any) => val.senderUid === user?.uid,
  )
  const resiverUids = contactsFilter?.map((val: any) => val.resiverUid)
  const uniqueResUid = new Set(resiverUids)
  const uidArr = Array.from(uniqueResUid)
  const contacts = allUsers?.filter((val: any) => uidArr.includes(val.uid))
  const notifciatiosn = resivedMessages?.filter((val: any) =>
    uidArr.includes(val.resiverUid),
  )

  const notificationCount: Record<
    string,
    Array<{
      resiverUid: any
      date: string
    }>
  > = {}

  notifciatiosn?.forEach((message: any) => {
    const receiverUid = message.resiverUid
    if (!notificationCount[receiverUid]) {
      notificationCount[receiverUid] = []
    }
    notificationCount[receiverUid].push(message)
  })

  React.useEffect(() => {}, [])
  const style = {
    mainDiv: `flex flex-col     w-[100%] h-[100%] pb-5    z-50 mt-10  bg-white  `,
    headDiv: `border-b-2 flex  items-center justify-between p-4  `,
    img: `w-[50px] h-[50px] rounded-[50%]`,
    imgName: `flex  items-center justify-center gap-5 hover:bg-blue-200 hover:text-white pr-2 rounded-[30px]`,
    textArea: `flex w-[100%] outline outline-[2px] outline-gray-300 items-center justify-between rounded-[30px] h-[4rem] `,
    sender: ` text-yellow-400   `,
    receiver: `text-green-600    `,
    message: ` text-start w-[88%] flex items-center justify-end  ml-6 max-h-[10000px]  rounded-[30px] py-1   `,
    messageUser: `w-[100%]  px-3   flex   max-h-[500px]  rounded-[30px] py-1 `,
    contact: `flex items-center gap-2 border-2 rounded-[50px]  `,
    contactImg: `w-[100px] h-[100px] rounded-[50%] `,
  }

  let location = useLocation()

  React.useEffect(() => {
    const element = scroll?.current as HTMLDivElement
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  interface MessageTimestamps {
    [key: string]: number
  }
  type notificationProp = {
    id: string
    imgUrl: string
    timestamp: { nanoseconds: string; seconds: number }
    uid: string
    userName: string
  }
  const [lastMessageTimestamps, setLastMessageTimestamps] = React.useState<
    MessageTimestamps
  >({})
  const Notifications: FC<notificationProp> = (val: notificationProp) => {
    const lastTimestamp = lastMessageTimestamps[val.uid] || 0
    const newMessages = notifciatiosn?.filter(
      (message: any) =>
        message.resiverUid === val.uid &&
        new Date(message.date).getTime() > lastTimestamp,
    )
    const hasUnseenMessages = newMessages.length > 0
    const handleClick = () => {
      setLastMessageTimestamps({
        ...lastMessageTimestamps,
        [val.uid]: new Date().getTime(),
      })
    }
    return (
      <Link
        // key={val.id + val.message}
        key={val.id}
        to={`/messages/${val.uid}`}
        onClick={handleClick}
        className={style.contact}
      >
        {/* <button onClick={() => console.log(val.uid)}>CLick</button> */}
        <img className={style.contactImg} src={val.imgUrl} />
        <h1 className="text-[1.5rem] text-gray-400">{val.userName}</h1>
        {hasUnseenMessages && <div className="text-red-500">New message!</div>}
      </Link>
    )
  }
  return (
    <div className={style.mainDiv}>
      <div className="flex justify-between  ">
        <div className="w-[50%] h-[350px] flex  flex-col p-4 gap-2 scroll overflow-y-scroll">
          {contacts?.map((val: any) => {
            return <Notifications {...val} />
          })}
        </div>
        <div className="w-[50%]  ">
          <div className={style.headDiv}>
            {/* <button onClick={() => console.log()}>ON CLICK</button> */}
            <Link
              onClick={() => setDmPopUp(!dmPopUp)}
              to={`/user/${singleUser?.uid}`}
              className={style.imgName}
            >
              <img className={style.img} src={singleUser?.imgUrl} />
              <h1>{singleUser?.userName}</h1>
            </Link>
          </div>
          <div className=" h-[350px] w-[100%] flex flex-col  border-l-2  gap-1 overflow-x-hidden overflow-y-scroll">
            {/* <button onClick={() => console.log(resivedMessages)}>on clik</button> */}
            {resivedMessages
              ?.filter(
                (item: any) =>
                  (item.senderUid === singleUser?.uid &&
                    item.resiverUid === user?.uid) ||
                  (item.senderUid === user?.uid &&
                    item.resiverUid === singleUser?.uid),
              )
              ?.map((val: any, index: number) => {
                return (
                  <div
                    key={index + val.senderUid}
                    className={
                      val.senderUid === user?.uid
                        ? style.sender
                        : style.receiver
                    }
                  >
                    <div
                      className={
                        val.senderUid === user?.uid
                          ? style.message
                          : style.messageUser
                      }
                    >
                      <p className="outline outline-[1px] boxShaddow bg-gray-100 max-w-[400px] text-[15px] text-clip rounded-[30px] overflow-hidden p-4">
                        {val.message}
                      </p>
                      <span ref={scroll}></span>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className={style.textArea}>
            <textarea
              className="resize-none outline-0 text-gray-400 w-[100%] rounded-[30px] "
              placeholder="   Send message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              className="flex items-center justify-center w-[20%]"
              onClick={() => sendDm(singleUser?.uid)}
            >
              <TbSend className="text-[1.4rem]  " />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMessage
