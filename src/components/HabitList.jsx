import React, { useState } from 'react'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useMutation, useSubscription } from '@apollo/client'
import { ADD_HABIT_LOG, GET_HABITS_NAME_SUBSCRIPTION } from '../apollo/queries'
import Skeleton from './Skeleton'
import EditModal from './EditModal'
import 'react-toastify/dist/ReactToastify.css';

function HabitList() {
    const [clicked, setIsClicked] = useState(false)
    const [dataId, setDataId] = useState(null)

    const {
        loading: loadingHabitsNameData,
        data: habitsNameData,
        error: errorHabitsNameData
    } = useSubscription(GET_HABITS_NAME_SUBSCRIPTION)

    const [
        createHabitLog,
        {
            error: createHabitLogError
        }
    ] = useMutation(ADD_HABIT_LOG)

    const formik = useFormik({
        initialValues: {
            checked: []
        },
        onSubmit: values => {
            values.checked.forEach((id) => {
                createHabitLog({
                    variables: {
                        habit_id: id
                    }
                })
            })

            if (createHabitLogError) {
                toast.error('You have checked habit for today, please try again tomorrow')
            }

        }
    })


    const handleClick = (item) => {
        setIsClicked(true)
        setDataId(item)
    }

    return (
        <div>
            {errorHabitsNameData && <p>Failed to fetch data from Hasura GraphQL</p>}
            {
                loadingHabitsNameData ? (<Skeleton />) :
                    habitsNameData?.habits.map((habit) => (
                        <div className='mt-[14px]' key={habit.id}>
                            <div className="card w-[335px] h-[58px] bg-accent-content text-primary-content">
                                <div className='p-[14px] flex justify-between gap-0'>
                                    <h1 className='font-nunito font-bold'>{habit.habit_name}</h1>
                                    <input
                                        type="checkbox"
                                        className="checkbox absolute top-[15px] right-[40px]"
                                        name='checked'
                                        value={habit.id}
                                        onChange={formik.handleChange} />

                                    <button type='button'
                                        onClick={() =>
                                            handleClick(habit)}>
                                        <img src="https://img.icons8.com/ios-filled/50/null/menu-2.png" alt='more' className='w-[18px] h-[18px]' />
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
            }

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                theme='light'
                limit={1}
            />
            <div className='flex justify-center mt-[20px]'>
                <button type='button' className='btn btn-secondary' onClick={formik.handleSubmit}>Submit</button>
            </div>

            {
                clicked && <EditModal setIsClicked={setIsClicked} dataId={dataId} />
            }
        </div>
    )
}

export default HabitList