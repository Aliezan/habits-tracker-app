import React from 'react'

export default function WelcomeHeading() {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const currentDate = new Date().toLocaleDateString('id-ID', options)
    return (
        <div className='max-w-xl'>
            <h1 className='font-bold font-nunito text-[16px]'>{currentDate}</h1>
            <h1 className='font-semibold font-nunito text-[28px] mt-[5px]'>Hello, Users!</h1>
        </div>
    )
}

