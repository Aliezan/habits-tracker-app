import React from 'react'
import { NavLink } from 'react-router-dom'
import ProgressPercentage from './ProgressPercentage'

function ProgressContainer() {
    return (
        <div className='w-[363px] bg-success rounded-[12px] mt-[31px]'>
            <div className='pt-[22px] pb-[22px] pl-[14px] pr-[14px]'>
                <div className='flex justify-between'>
                    <h1 className='font-nunito font-bold text-black'>
                        Your Goals
                    </h1>
                    <h2 className='font-nunito font-bold text-black text-[14px]'>
                        <NavLink to='/goalsprogress'>
                            See all
                        </NavLink>
                    </h2>
                </div>
            </div>
            <ProgressPercentage />
        </div>
    )
}

export default ProgressContainer