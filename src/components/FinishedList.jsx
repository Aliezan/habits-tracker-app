import React from 'react'
import { useSubscription } from '@apollo/client'
import { GET_FINISHED_HABITS_SUBSCRIPTION } from '../apollo/queries'
import Skeleton from './Skeleton'

function FinishedList() {
    const {
        loading: loadingFinishedHabitsData,
        data: finishedHabitsData,
        error: errorFinishedHabitsData
    } = useSubscription(GET_FINISHED_HABITS_SUBSCRIPTION)

    return (
        <div>
            {
                errorFinishedHabitsData && <p>Failed to fetch data from Hasura GraphQL</p>
            }
            {
                loadingFinishedHabitsData ? (<Skeleton />) : (
                    finishedHabitsData?.finished_habits.map(habit => (
                        <div key={habit.id} className='mt-[14px]'>
                            <div className='card w-[335px] h-[100px] bg-info text-primary-content mb-[10px]'>
                                <h1 className='pl-[14px] pr-[14px] pt-[14px] font-nunito font-bold text-[18px]'>{habit.habit_goal}</h1>
                                <h1 className='pl-[14px] pr-[14px] pt-[14px] font-nunito text-[13px]'>{habit.habit_name}</h1>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default FinishedList