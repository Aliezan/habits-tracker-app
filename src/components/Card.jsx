import React from 'react'
import { useSubscription } from '@apollo/client'
import { Spinner } from 'flowbite-react'
import { GET_TODAY_COMPLETED_HABITS } from '../apollo/queries'

function Card() {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const {
        data,
        loading
    } = useSubscription(GET_TODAY_COMPLETED_HABITS, {
        variables: {
            _eq: formattedDate
        }
    })

    const habits = data?.habits.map(habit => habit.habit_name).length
    const completedHabits = data?.habits.map(habit => habit.habit_logs).filter(logs => logs.length > 0).length

    const percentage = (completedHabits / habits) * 100
    const roundedPercentage = Math.round(percentage)



    return (
        <div className='flex justify-center max-w-xl'>
            <div className="card w-[350.37px] h-[189px] bg-primary text-primary-content mt-[16px] mb-[22px]">
                {
                    loading ? (
                        <div className='flex justify-center mt-[65px]'>
                            <Spinner size='xl' />
                        </div>
                    ) :
                        (
                            <div className="flex justify-between p-10 mt-3">
                                <div className="radial-progress text-accent" style={{ "--value": roundedPercentage }}>{roundedPercentage}%</div>
                                <div className='mt-3'>
                                    <h1 className="card-title">{completedHabits} of {habits} habits</h1>
                                    <h1>completed today</h1>
                                </div>
                            </div>
                        )
                }

            </div>

        </div>
    )
}

export default Card