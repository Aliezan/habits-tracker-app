import React from 'react'
import { useFormik } from 'formik'
import { TextInput, Label } from 'flowbite-react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import * as Yup from 'yup'
import { ADD_HABIT } from '../apollo/queries'
import ErrorModal from './ErrorModal'

function ModalInput({ setClicked }) {
    const [createHabit, {
        data,
        error
    }] = useMutation(ADD_HABIT)

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
                .required("This field is required")
                .matches(/^[a-zA-Z0-9 ]+$/, 'Symbol and Number is not allowed'),
            habitName: Yup.string()
                .required("This field is required")
                .matches(/^[a-zA-Z0-9 ]+$/, 'Symbol and Number is not allowed'),
            period: Yup.number()
                .required("This field is required"),
            type: Yup.string()
                .required("This field is required")

        }),
        onSubmit: values => {
            const periodInDays = values.period

            createHabit({
                variables: {
                    habit_name: values.habitName,
                    habit_goal: values.yourGoal,
                    habit_deadline: handleDate(values.period),
                    habit_frequency: values.type,
                    habit_deadline_in_day: periodInDays
                }
            })
        }
    })


    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-opacity-30 backdrop-blur-sm'>
            <div className='bg-white w-[331px] h-[470px] p-[15px] rounded-[6px]'>
                {
                    data ? (
                        <div>
                            <div className='flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="192" height="192"
                                    viewBox="0 0 24 24">
                                    <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" />
                                </svg>
                            </div>
                            <div className='text-center'>
                                <h1 className='font-nunito font-bold text-[25px]'>Done !</h1>
                                <p className='font-nunito'>New Habit Goal has added
                                    Let’s do the best to achieve your goal!</p>
                            </div>
                            <div className='flex justify-center mt-[30px]'>
                                <button type='button'
                                    className='btn btn-secondary w-[298px]'
                                    onClick={() => setClicked(false)}>
                                    Close
                                </button>
                            </div>

                        </div>
                    ) : (
                        <div>
                            <div className='w-[301px] h-[35px]'>
                                <div className='flex justify-between'>
                                    <h1 className='font-bold font-nunito'>Create New Habit</h1>

                                    <button type='button'
                                        onClick={() => setClicked(false)}>
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
                                    <button type='submit' className="btn btn-secondary w-[298px]">Submit</button>
                                </div>

                            </form>
                        </div>
                    )
                }

                {
                    error && (
                       <ErrorModal setClicked={setClicked}/>
                    )
                }
            </div >
        </div >
    )
}

ModalInput.propTypes = {
    setClicked: PropTypes.func.isRequired
}

export default ModalInput