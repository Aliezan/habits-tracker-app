import React from 'react'
import Card from '../components/Card'
import WelcomeHeading from '../components/WelcomeHeading'
import HabitsContainer from '../components/HabitsContainer'
import Navigation from '../components/Navigation'
import GoalsContainer from '../components/GoalsContainer'
import FinishedContainer from '../components/FinishedContainer'

function Home() {
    return (
        <div className='flex justify-center mt-4'>
            <div>
                <WelcomeHeading />
                <Card />
                <HabitsContainer />
                <Navigation />
                <GoalsContainer />
                <FinishedContainer />
            </div>

        </div>
    )
}

export default Home