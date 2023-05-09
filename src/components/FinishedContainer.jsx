import React from 'react'
import FinishedList from './FinishedList'

function FinishedContainer() {
    return (
        <div className='w-[363px] h-[460px] bg-success rounded-[12px] mt-[31px]'>
            <div className='pt-[22px] pb-[22px] pl-[14px] pr-[14px]'>
                    <h1 className='font-nunito font-bold text-black'>Finished Goals</h1>
                <FinishedList />
            </div>
        </div>
    )
}

export default FinishedContainer