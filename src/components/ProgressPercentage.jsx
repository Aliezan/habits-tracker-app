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

            <div className='flex justify-center mt-[20px]'>
                <div className='flex'>
                    <div className='mt-[4px] mr-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="15" height="15"
                            viewBox="0 0 30 30">
                            <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z" />
                        </svg>
                    </div>
                    <div>
                        <p className='font-nunito font-semibold text-error'>{totalFinishedHabits} Habits goal has achieved</p>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-[10px]'>
                <div className='flex'>
                    <div className='mt-[4px] mr-[5px]'>
                        <img src="https://img.icons8.com/ios-filled/100/null/multiply.png" alt='x' width="15" height="15" />
                    </div>
                    <p className='font-nunito font-semibold'>{totalHabits} Habits goal hasn&apos;t achieved</p>

                </div>
            </div>

        </div>
    )
}

export default ProgressPercentage