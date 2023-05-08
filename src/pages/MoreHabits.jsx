import React, { useState } from 'react'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { useSubscription, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import { GET_MORE_HABITS_NAME, ADD_HABIT_LOG } from '../apollo/queries'
import EditModal from '../components/EditModal'
import 'react-toastify/dist/ReactToastify.css'


function MoreHabits() {
  const [clicked, setIsClicked] = useState(false)
  const [dataId, setDataId] = useState(null)

  const {
    loading: loadingMoreHabitsNameData,
    data: moreHabitsNameData,
    error: errorMoreHabitsNameData
  } = useSubscription(GET_MORE_HABITS_NAME)


  const [
    createHabitLog,
    {
      data: createHabitLogData,
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

      if (createHabitLogData) {
        toast.success('Habit checked successfully')
      }

      if (createHabitLogError) {
        toast.error('You have checked habit for today, please try again tomorrow')
      }

    }
  })

  const navigate = useNavigate()

  const handleClick = (item) => {
    setIsClicked(true)
    setDataId(item)
  }



  return (
    <div>
      <div className='flex justify-center mt-4'>
        <div className='flex gap-[40px] mr-[185px]'>
          <button type='button'
            onClick={() => navigate(-1)}>
            <img src="https://img.icons8.com/ios-filled/100/000000/long-arrow-left.png" alt='back' className='w-[25px] h-[25px]' />
          </button>
          <h1 className='font-nunito font-bold text-[21px] text-black mt-[1px]'>Your Habits</h1>
        </div>
      </div>

      <div>
        {errorMoreHabitsNameData && <p>Failed to fetch data from Hasura GraphQL</p>}
        {
          loadingMoreHabitsNameData ? (
            <div className='flex justify-center p-[20px]'>
              <Spinner size='xl' />
            </div>
          ) :
            <div className='flex justify-center mt-[30px]'>
              <div className='w-[363px] bg-accent rounded-[12px]'>
                {
                  moreHabitsNameData?.habits.map((habit) => (
                    <div className='mt-[14px] mb-[14px] flex justify-center' key={habit.id}>
                      <div className="card w-[335px] h-[58px] bg-accent-content text-primary-content">
                        <div className='p-[14px] flex justify-between gap-0'>
                          <h1>{habit.habit_name}</h1>
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
                <div className='flex justify-center mt-[20px] mb-[15px]'>
                  <button type='button' className='btn btn-secondary' onClick={formik.handleSubmit}>Submit</button>
                </div>
              </div>

            </div>
        }

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          theme='light'
          limit={1}
        />

        {
          clicked && <EditModal setIsClicked={setIsClicked} dataId={dataId} />
        }
      </div>
    </div>







  )
}

export default MoreHabits