import React from 'react'
import { NavLink } from 'react-router-dom'
import FinishedList from './FinishedList'

function FinishedContainer() {
    return (
        <div className='w-[363px] h-[460px] bg-success rounded-[12px] mt-[31px]'>
            <div className='pt-[22px] pb-[22px] pl-[14px] pr-[14px]'>
                <div className='flex justify-between'>
                    <h1 className='font-nunito font-bold text-black'>Finished Goals</h1>
                    <h2 className='text-accent-focus font-nunito font-bold text-[14px]'><NavLink to='/finishedhabits'>See all</NavLink></h2>
                </div>
                <FinishedList />
            </div>
        </div>
    )
}

export default FinishedContainer