import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useMutation, useSubscription } from '@apollo/client'
import { Label, TextInput } from 'flowbite-react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { UPDATE_HABITS, GET_HABITS_BY_ID, DELETE_HABIT, ADD_FINISHED_HABITS } from '../apollo/queries'
import DeleteModal from './DeleteModal'
import EditSuccess from './EditSuccess'
import EditError from './EditError'
import FinishedSuccess from './FinishedSuccess'
import FinishedError from './FinishedError'

function EditModal({ setIsClicked, dataId }) {
    const [isDelete, setIsDelete] = useState(false)

    const [updateHabits, {
        data: updateHabitsData,
        error: updateHabitsError,
    }] = useMutation(UPDATE_HABITS)


    const {
        data: getHabitsByIdData,
    } = useSubscription(GET_HABITS_BY_ID, {
        variables: {
            _eq: dataId.id
        }
    })

    const [deleteHabit, {
        data: deleteHabitData,
        error: deleteHabitError,
    }] = useMutation(DELETE_HABIT)

    const [addFinishedHabits, {
        data: addFinishedHabitsData,
        error: addFinishedHabitsError,
    }] = useMutation(ADD_FINISHED_HABITS)

    const handleDelete = () => {
        deleteHabit({
            variables: {
                id: dataId.id,
                _eq: dataId.id
            }
        })
    }


    const handleDate = (days) => {
        const currentDate = new Date()
        const futureDate = new Date(currentDate.setDate(currentDate.getDate() + days)).toISOString()
        return futureDate
    }

    const formik = useFormik({
        initialValues: {
            yourGoal: '',
            habitName: '',
            period: '',
            type: '',
        },
        validationSchema: Yup.object({
            yourGoal: Yup.string()
                .required("This field is required"),
            habitName: Yup.string()
                .required("This field is required")
                .matches(/^[a-zA-Z0-9 ]+$/, 'Symbol and Number is not allowed'),
            period: Yup.number()
                .required("This field is required"),
            type: Yup.string()
                .required("This field is required")
        }),
        onSubmit: values => {
            updateHabits({
                variables: {
                    habit_name: values.habitName,
                    habit_goal: values.yourGoal,
                    habit_deadline: handleDate(values.period),
                    habit_frequency: values.type,
                    habit_deadline_in_day: values.period,
                    id: dataId.id,
                }
            })
        }
    })

    useEffect(() => {
        if (getHabitsByIdData) {
            formik.setValues({
                habitName: getHabitsByIdData?.habits[0].habit_name,
                yourGoal: getHabitsByIdData?.habits[0].habit_goal,
                period: getHabitsByIdData?.habits[0].habit_deadline_in_day,
                type: getHabitsByIdData?.habits[0].habit_frequency,
            })
        }
    }, [getHabitsByIdData])

    const handleFinishedHabits = () => {
        addFinishedHabits({
            variables: {
                habit_name: formik.values.habitName,
                habit_goal: formik.values.yourGoal,
                habit_deadline: handleDate(formik.values.period),
                habit_frequency: formik.values.type,
                habit_deadline_in_day: formik.values.period,
            }
        })
    }


    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-opacity-30 backdrop-blur-sm'>
            <div className='bg-white w-[331px] h-[550px] p-[15px] rounded-[6px]'>
                <div>
                    <div className='w-[301px] h-[35px]'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold font-nunito'>Edit Habit Goal</h1>

                            <button type='button'
                                onClick={() => setIsClicked(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="20" height="20"
                                    viewBox="0 0 50 50">
                                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                                </svg>

                            </button>


                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Label
                                htmlFor="yourGoal"
                                className='font-semibold font-nunito text-[14px]'
                            >
                                Your Goal
                            </Label>
                            <TextInput
                                type='text'
                                id='yourGoal'
                                name='yourGoal'
                                className='mt-[8px]'
                                value={formik.values.yourGoal}
                                onChange={formik.handleChange}
                                color={formik.errors.yourGoal ? 'failure' : ''}
                                helperText={formik.errors.yourGoal}
                                shadow={true} />

                        </div>

                        <div>
                            <Label
                                htmlFor="habitName"
                                className='font-semibold font-nunito text-[14px]'
                            >
                                Habit Name
                            </Label>
                            <TextInput
                                type='text'
                                name='habitName'
                                className='mt-[8px]'
                                value={formik.values.habitName}
                                onChange={formik.handleChange}
                                color={formik.errors.habitName ? 'failure' : ''}
                                helperText={formik.errors.habitName}
                                shadow={true} />
                        </div>

                        <div className='flex justify-between h-[34px] mt-[22px]'>
                            <Label
                                htmlFor='period'
                                className='font-semibold font-nunito text-[14px] mt-[8px]'>
                                Period
                            </Label>

                            <select
                                id='period'
                                name='period'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[181px] h-[40px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={formik.handleChange}
                                value={formik.values.period}
                            >
                                {
                                    formik.errors.period ?
                                        <option defaultValue='' className='text-red-500'>{formik.errors.period}
                                        </option>
                                        : <option defaultValue="">Choose period
                                        </option>
                                }
                                <option value={30}>1 Month</option>
                                <option value={21}>3 Weeks (21 Days)</option>
                                <option value={14}>2 Weeks (14 Days)</option>
                                <option value={3}>3 Days</option>
                            </select>
                        </div>

                        <div className='flex justify-between h-[34px] mt-[22px]'>
                            <Label
                                htmlFor='period'
                                className='font-semibold font-nunito text-[14px] mt-[8px]'>
                                Habit type
                            </Label>

                            <select
                                id='type'
                                name='type'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[181px] h-[40px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={formik.handleChange}
                                value={formik.values.type}
                            >
                                {
                                    formik.errors.type ? <option defaultValue='' className='text-red-500'>{formik.errors.type}
                                    </option> : <option defaultValue="">Choose type</option>
                                }
                                <option value={7}>Everyday</option>
                                <option value={3}>3 days</option>
                                <option value={1}>1 day</option>
                            </select>


                        </div>

                        <div className='mt-[30px] flex justify-center'>
                            <button type='submit' className="btn btn-secondary w-[298px]">Update</button>
                        </div>

                        <div className='mt-[10px] flex justify-center'>
                            <button type='button' className='btn btn-error w-[298px]' onClick={() => setIsDelete(true)}>Delete</button>
                        </div>

                        <div className='mt-[10px] flex justify-center'>
                            <button type='button' className='btn btn-success w-[298px]' onClick={() => handleFinishedHabits()}>Mark as Finished</button>
                        </div>

                    </form>
                </div>
            </div>
            {
                isDelete && <DeleteModal setIsDelete={setIsDelete} setIsClicked={setIsClicked} handleDelete={handleDelete} success={deleteHabitData} error={deleteHabitError} />
            }

            {
                updateHabitsData && <EditSuccess setIsClicked={setIsClicked} />
            }

            {
                updateHabitsError && <EditError setIsClicked={setIsClicked} />
            }

            {
                addFinishedHabitsData && <FinishedSuccess setIsClicked={setIsClicked} />
            }

            {
                addFinishedHabitsError && <FinishedError setIsClicked={setIsClicked} />
            }
        </div>
    )
}

EditModal.propTypes = {
    setIsClicked: PropTypes.func.isRequired,
    dataId: PropTypes.object.isRequired,
}

export default EditModal