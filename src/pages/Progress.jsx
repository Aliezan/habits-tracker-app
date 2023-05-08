import React from 'react'
import Navigation from '../components/Navigation'
import ProgressContainer from '../components/ProgressContainer'

function Progress() {

    return (
        <div className='flex justify-center mt-4'>
            <div>
                <div className='max-w-xl'>
                    <h1 className='font-bold font-nunito text-[28px]'>
                        Progress
                    </h1>
                    <h2 className='font-semibold font-nunito text-[16px] mt-[5px]'>
                        Progress Report
                    </h2>
                </div>
                <ProgressContainer />
                <Navigation />

            </div>
        </div>
    )
}

export default Progress