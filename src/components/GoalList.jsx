import React, { Fragment, useState } from 'react'
import { useSubscription } from '@apollo/client'
import { GET_HABITS_GOAL_SUBSCRIPTION, GET_HABIT_ID_COUNT } from '../apollo/queries'
import Skeleton from './Skeleton'
import EditModal from './EditModal'

function GoalList() {
    const [clicked, setIsClicked] = useState(false)
    const [dataId, setDataId] = useState(null)

    const {
        loading: loadingHabitsGoalData,
        data: habitsGoalData,
        error: errorHabitsGoalData } = useSubscription(GET_HABITS_GOAL_SUBSCRIPTION)


    const {
        data: habitIdCountData,
    } = useSubscription(GET_HABIT_ID_COUNT)

    const handleClick = (item) => {
        setIsClicked(true)
        setDataId(item)
    }


    return (
        <div>
            {errorHabitsGoalData && <p>Failed to fetch data from Hasura GraphQL</p>}
            {
                loadingHabitsGoalData ? (<Skeleton />) :
                    <div className='w-[322px] p-[20px]'>
                        {
                            habitsGoalData?.habits.map((habit, index) => (
                                <Fragment key={habit.id}>
                                    <div className='flex justify-between'>
                                        <h1 className='text-accent'>{habit.habit_goal}</h1>
                                        
                                        <button type='button'
                                            onClick={() =>
                                                handleClick(habit)}>
                                            <img src="https://img.icons8.com/ios-filled/50/null/menu-2.png" alt='more' className='w-[18px] h-[18px]' />
                                        </button>

                                    </div>
                                    <progress className='progress progress-success w-70' value={habitIdCountData?.habits[index]?.habit_logs?.length} max={habitIdCountData?.habits[index]?.habit_deadline_in_day} />
                                    <p className='text-info mb-2'>{habitIdCountData?.habits[index]?.habit_logs?.length} of {habitIdCountData?.habits[index]?.habit_deadline_in_day} days target</p>
                                </Fragment>
                            ))
                        }
                    </div>

            }

            {
                clicked && <EditModal setIsClicked={setIsClicked} dataId={dataId} />
            }


        </div>
    )
}

export default GoalList