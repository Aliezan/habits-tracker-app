import React, { Fragment } from 'react'
import { useSubscription, useQuery } from '@apollo/client'
import { Spinner } from 'flowbite-react'
import { GET_FINISHED_GOALS_SUBSCRIPTION, GET_MORE_HABITS_GOAL, GET_MORE_HABIT_ID_COUNT } from '../apollo/queries'

function ProgressList() {
    const {
        loading: loadingFinishedGoalsData,
        data: finishedGoalsData,
        error: errorFinishedGoalsData
    } = useSubscription(GET_FINISHED_GOALS_SUBSCRIPTION)

    const {
        loading: loadingMoreHabitsGoalData,
        data: moreHabitsGoalData,
        error: errorMoreHabitsGoalData
    } = useQuery(GET_MORE_HABITS_GOAL)

    const {
        data: moreHabitIdCountData,
    } = useQuery(GET_MORE_HABIT_ID_COUNT)

    return (
        <div>
            <h1 className='pl-[14px] mt-[25px] font-nunito font-bold'>Finished Goals</h1>
            {
                errorFinishedGoalsData && <p>Failed to fetch data from Hasura GraphQL</p>
            }
            {
                loadingFinishedGoalsData ? (<div className='flex justify-center'>
                    <Spinner size='xl' />
                </div>) : (
                    finishedGoalsData?.finished_habits.map(habit => (
                        <div key={habit.id} className='mt-[14px] ml-[13px]'>
                            <div className='card w-[335px] bg-info text-primary-content mb-[10px]'>
                                <h1 className='pl-[14px] pr-[14px] pt-[14px] pb-[14px] font-nunito font-bold text-[18px]'>{habit.habit_goal}</h1>
                            </div>
                        </div>
                    ))
                )
            }

            <h1 className='pl-[14px] mt-[25px] font-nunito font-bold'>Unfinished Goals</h1>
            {
                errorMoreHabitsGoalData && <p>Failed to fetch data from Hasura GraphQL</p>
            }

            {
                loadingMoreHabitsGoalData ? (
                    <div className='flex justify-center p-[20px]'>
                        <Spinner size='xl' />
                    </div>
                ) : (
                    <div className='w-[322px] p-[20px] ml-[14px]'>
                        {
                            moreHabitsGoalData?.habits.map((habit, index) => (
                                <Fragment key={habit.id}>
                                    <h1 className='text-accent'>
                                        {habit.habit_goal}
                                    </h1>
                                    <progress className='progress progress-secondary w-75' value={moreHabitIdCountData?.habits[index]?.habit_logs?.length} max={moreHabitIdCountData?.habits[index]?.habit_deadline_in_day} />
                                    <p className='text-accent mb-2'>{moreHabitIdCountData?.habits[index]?.habit_logs?.length} of {moreHabitIdCountData?.habits[index]?.habit_deadline_in_day} days target</p>
                                </Fragment>
                            ))
                        }
                    </div>
                )
            }


        </div>
    )
}

export default ProgressList