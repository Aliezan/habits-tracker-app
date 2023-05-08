import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ModalInput from './ModalInput'
import HabitList from './HabitList'

function HabitsContainer() {
  const [clicked, setClicked] = useState(false)

  return (
    <div className='w-[363px] h-[350px] bg-accent rounded-[12px]'>
      <div className='pt-[22px] pb-[22px] pl-[14px] pr-[14px]'>
        <div className='flex justify-between'>
          <h1 className='font-nunito font-bold text-white'>Today&apos;s Habit</h1>
          <h2 className='text-warning font-nunito font-bold text-[14px]'><NavLink to='/yourhabits'>See all</NavLink></h2>
        </div>
        <HabitList />
        <button
          className="btn btn-circle bg-[#b782b7] fixed left-[900px] top-[600px] z-10"
          type='button'
          onClick={
            () => {
              setClicked(true)
            }
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
            />
          </svg>
        </button>

        {
          clicked &&
          <ModalInput setClicked={setClicked} />
        }

      </div>
    </div>
  )
}


export default HabitsContainer