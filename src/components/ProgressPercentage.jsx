import React from 'react'
import { useSubscription } from '@apollo/client'
import { Spinner } from 'flowbite-react'
import { GET_MORE_FINISHED_HABITS, GET_MORE_HABITS_NAME } from '../apollo/queries'

function ProgressPercentage() {
    const {
        data: habitsNameData,
        loading: loadingHabitsNameData,
    } = useSubscription(GET_MORE_HABITS_NAME)

    const {
        data: finishedHabitsData,
        loading: loadingFinishedHabitsData,
    } = useSubscription(GET_MORE_FINISHED_HABITS)

    const totalHabits = habitsNameData?.habits.map(habit => habit.habit_goal).length
    const totalFinishedHabits = finishedHabitsData?.finished_habits.map(habit => habit.habit_name).length

    const percentage = (totalFinishedHabits / totalHabits) * 100
    const roundedPercentage = Math.round(percentage)


    return (
        <div>
            <div className='flex justify-center'>
                {
                    loadingHabitsNameData || loadingFinishedHabitsData ? (<Spinner size='xl' />) : (
                        <div className="radial-progress" style={{ "--value": roundedPercentage, "--size": "150px" }}>{roundedPercentage}%</div>
                    )
                }
            </div>
            
            <div className='flex justify-center mt-[10px]'>
                <p>{totalFinishedHabits} Habits goal has achieved</p>
            </div>

            <div className='flex justify-center mt-[10px]'>
                <p>{totalHabits} Habits goal has&apos;t achieved</p>
            </div>

        </div>
    )
}

export default ProgressPercentage