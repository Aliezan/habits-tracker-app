import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Spinner } from 'flowbite-react'
import EditModal from '../components/EditModal'
import { GET_MORE_HABITS_GOAL, GET_MORE_HABIT_ID_COUNT } from '../apollo/queries'

function MoreGoals() {
    const [clicked, setIsClicked] = useState(false)
    const [dataId, setDataId] = useState(null)

    const {
        loading: loadingMoreHabitsGoalData,
        data: moreHabitsGoalData,
        error: errorMoreHabitsGoalData
    } = useQuery(GET_MORE_HABITS_GOAL)

    const {
        data: moreHabitIdCountData,
    } = useQuery(GET_MORE_HABIT_ID_COUNT)


    const navigate = useNavigate()

    const handleClick = (item) => {
        setIsClicked(true)
        setDataId(item)
    }


    return (
        <div className='flex justify-center mt-4'>
            <div className='w-[363px] bg-secondary rounded-[12px] mt-[31px]'>
                <div className='flex gap-3 pt-5 pl-4'>
                    <button type='button'
                        onClick={() => navigate(-1)}>
                        <img src="https://img.icons8.com/ios-filled/100/000000/long-arrow-left.png" alt='back' className='w-[25px] h-[25px]' />
                    </button>
                    <h1 className='font-nunito font-bold text-[21px] text-black mt-[1px]'>Your Goals</h1>
                </div>
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
                                        <div className='flex justify-between'>
                                            <h1 className='text-accent'>
                                                {habit.habit_goal}
                                            </h1>

                                            <button type='button'
                                                onClick={() =>
                                                    handleClick(habit)}>
                                                <img src="https://img.icons8.com/ios-filled/50/null/menu-2.png" alt='more' className='w-[18px] h-[18px]' />
                                            </button>


                                        </div>
                                        <progress className='progress progress-success w-75' value={moreHabitIdCountData?.habits[index]?.habit_logs?.length} max={moreHabitIdCountData?.habits[index]?.habit_deadline_in_day} />
                                        <p className='text-info mb-2'>{moreHabitIdCountData?.habits[index]?.habit_logs?.length} of {moreHabitIdCountData?.habits[index]?.habit_deadline_in_day} days target</p>
                                    </Fragment>
                                ))
                            }
                        </div>
                    )
                }

                {
                    clicked && <EditModal setIsClicked={setIsClicked} dataId={dataId} />
                }


            </div>
        </div>

    )
}

export default MoreGoals