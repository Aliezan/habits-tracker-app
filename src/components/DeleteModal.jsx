import React from 'react'
import PropTypes from 'prop-types'
import DeleteSuccess from './DeleteSuccess'
import DeleteError from './DeleteError'

function DeleteModal({ setIsClicked, handleDelete, success, error }) {
    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-opacity-30 backdrop-blur-sm'>
            <div className='bg-white w-[331px] h-[550px] p-[15px] rounded-[6px]'>
                <div>
                    <div className='w-[301px] h-[35px]'>
                        <div>
                            <div className='flex justify-between'>
                                <h1 className='font-bold font-nunito'>Delete confirmation</h1>

                                <button type='button'
                                    onClick={() => setIsClicked(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="20" height="20"
                                        viewBox="0 0 50 50">
                                        <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                                    </svg>
                                </button>


                            </div>
                            <div className='flex justify-center mt-[70px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    width="80" height="80"
                                    viewBox="0 0 30 30">
                                    <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                                </svg>
                            </div>
                            <div className='text-center mt-[70px]'>
                                <h1 className='font-nunito font-bold'>Are you sure want delete?</h1>
                            </div>
                            <div className='flex justify-center mt-[30px]'>
                                <button type='button'
                                    className='btn btn-error w-[298px]'
                                    onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>

                            <div className='flex justify-center mt-[10px]'>
                                <button type='button' className='btn btn-secondary w-[298px]' onClick={() => setIsClicked(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                success && <DeleteSuccess setIsClicked={setIsClicked} />
            }
            {
                error && <DeleteError setIsClicked={setIsClicked} />
            }
        </div>
    )
}

DeleteModal.propTypes = {
    setIsClicked: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    success: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

export default DeleteModal