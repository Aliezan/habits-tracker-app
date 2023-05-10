import React from 'react'
import ProgressPercentage from './ProgressPercentage'
import ProgressList from './ProgressList'

function ProgressContainer() {
    return (
        <div className='w-[363px] bg-success rounded-[12px] mt-[31px] pb-[30px]'>
            <div className='pt-[22px] pb-[22px] pl-[14px] pr-[14px]'>
                <div className='flex justify-center'>
                    <h1 className='font-nunito font-bold text-black text-[18px]'>
                        Your Goals
                    </h1>
                </div>
            </div>
            <ProgressPercentage />
            <ProgressList />

        </div>
    )
}

export default ProgressContainer