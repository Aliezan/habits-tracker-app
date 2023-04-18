import React from 'react'


export default function Navbar() {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const currentDate = new Date().toLocaleDateString('id-ID', options)
    return (
        <div>
            <h1>{currentDate}</h1>
        </div>
    )
}

