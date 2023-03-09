import React from 'react'
import { MdCancel } from 'react-icons/md'
import { TbSend } from 'react-icons/tb'
import { Link } from 'react-router-dom'
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
  const resiverUids = contactsFilter.map((message: any) => message.resiverUid)
  const uniqueResUid = new Set(resiverUids)
  const uidArr = Array.from(uniqueResUid)
  const contacts = allUsers?.filter((val: any) => uidArr.includes(val.uid))

  const style = {
    mainDiv: `flex flex-col     w-[100%] h-[100%]  border-2 z-50 boxShaddow bg-white rounded-[30px]`,
    headDiv: `border-b-2 flex  items-center justify-between p-4  `,
    cancel: `cursor-pointer text-[1.7rem] text-red-500 hover:text-red-600 mt-2 mr-5 `,
    img: `w-[50px] h-[50px] rounded-[50%]`,
    imgName: `flex  items-center justify-center gap-5 hover:bg-blue-200 hover:text-white pr-2 rounded-[30px]`,
    textArea: `flex w-[100%] outline outline-[2px] outline-gray-300 items-center justify-between rounded-[30px] h-[4rem] `,
    sender: ` text-yellow-400  `,
    receiver: `text-green-600    `,
    message: ` text-start w-[88%] flex items-center justify-end ml-6 max-h-[600px]  rounded-[30px] py-1   `,
    messageUser: `w-[100%]  px-3   flex   max-h-[600px ]  rounded-[30px] py-1 `,
  }

  return (
    <div className={style.mainDiv}>
      <div className={style.headDiv}>
        <button onClick={() => console.log(contacts)}>ON CLICK</button>
        <Link
          onClick={() => setDmPopUp(!dmPopUp)}
          to={`/user/${singleUser?.uid}`}
          className={style.imgName}
        >
          <img className={style.img} src={singleUser?.imgUrl} />
          <h1>{singleUser?.userName}</h1>
        </Link>

        <MdCancel
          className={style.cancel}
          onClick={() => setDmPopUp(!dmPopUp)}
        />
      </div>
      <div className="flex justify-between  ">
        <div className="w-[50%] h-[350px]  ">
          {contacts?.map((val: any) => {
            return (
              <div>
                <h1>{val.userName}</h1>
              </div>
            )
          })}
        </div>
        <div className="w-[50%]  ">
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
              .map((val: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={
                      val.senderUid === user?.uid
                        ? style.sender
                        : style.receiver
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
                      <p className="outline outline-[1px] boxShaddow bg-gray-100   rounded-[30px] p-4">
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
