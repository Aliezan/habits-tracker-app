import React from 'react'
import { NavLink } from 'react-router-dom'
import GoalList from './GoalList'

function GoalsContainer() {
  return (
    <div className='w-[363px] h-[350px] bg-secondary rounded-[12px] mt-[31px]'>
      <div className='pt-[22px] pb-[22px] pl-[14px] pr-[14px]'>
        <div className='flex justify-between'>
          <h1 className='font-nunito font-bold text-black'>Your Goals</h1>
          <h2 className='text-accent font-nunito font-bold text-[14px]'><NavLink to='/yourgoals'>See all</NavLink></h2>
        </div>

        <GoalList />
      </div>
    </div>
  )
}

export default GoalsContainer