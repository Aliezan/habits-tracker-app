import React from 'react'
import PropTypes from 'prop-types'

function FinishedSuccess({ setIsClicked }) {
    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-opacity-30 backdrop-blur-sm'>
            <div className='bg-white w-[331px] h-[550px] p-[15px] rounded-[6px}'>
                <div className='flex justify-center mt-[50px]'>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQklEQVR4nO2Vu0oDQRiFP0QRBLGwtBRsBBsrC2u10ELxAfQJ7M0TpNY38Am0s7C3sDBCgprGFRWFFBoLjWJk4B8Yktm5mJ0QJAdOs/+Z8+1lhoWhBlwbwKN4vV/QaaABtMUNuZZchwZU+yA1dB74soC/gYWU4FMLVPssFXTLAdXeLBo6DtwGgO+AiSLBpQCo9n5R0Bmg2VFeB7bF9Y7Zu6zpWUeWp7o05hXLXK3pSUvAj6X42sjcWOZqzfJfoSPAuWMTaWU5mQvpiNauYwM9G7kXR24nFjopP4C8wlcj++a5wakYcNlzZFrAorjlyaquIM0CHxHn1udPYC4EfBxY+CQOyZ74oCuBReocjwJjwFXgmtU8qCqpBpZUJB8Drkm+S3uR3y7mVbfFitEl1/Epyg828H0fwJkNvJYYnrk22FD/T7//yEweBhd1sgAAAABJRU5ErkJggg==" alt='error' />
                </div>
                <div className='text-center'>
                    <h1>Successfully added Habit Goals as Finished</h1>
                </div>
                <div className='flex justify-center mt-[30px]'>
                    <button type='button'
                        className='btn btn-secondary'
                        onClick={() => setIsClicked(false)}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

FinishedSuccess.propTypes = {
    setIsClicked: PropTypes.func.isRequired
}


export default FinishedSuccess