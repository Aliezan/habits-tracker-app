import React from 'react'
import PropTypes from 'prop-types'

function EditSuccess({ setIsClicked }) {
    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-opacity-30 backdrop-blur-sm'>
            <div className='bg-white w-[331px] h-[550px] p-[15px] rounded-[6px}'>
                <div className='flex justify-center mt-[50px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="192" height="192"
                        viewBox="0 0 24 24">
                        <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" />
                    </svg>
                </div>
                <div className='text-center'>
                    <h1>Successfully updated</h1>
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

EditSuccess.propTypes = {
    setIsClicked: PropTypes.func.isRequired
}


export default EditSuccess