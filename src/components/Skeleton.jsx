import React from 'react'

function Skeleton() {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="card w-[335px] h-[58px] bg-gray-200 mt-[14px]"/>
            <div className="card w-[335px] h-[58px] bg-gray-200 mt-[14px]"/>
            <div className="card w-[335px] h-[58px] bg-gray-200 mt-[14px]"/>    
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Skeleton