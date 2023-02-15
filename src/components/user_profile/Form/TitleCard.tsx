import React from 'react'

function TitleCard() {
  const style = {
    title: `flex flex-col items-center justify-center w-[100%] h-[300px] bg-white rounded-[19px]`,
  }
  return (
    <div className={style.title}>
      <label>Name of your product</label>
      <input placeholder="title" />
    </div>
  )
}

export default TitleCard
