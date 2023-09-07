import React, { useState } from 'react'
import RecordingInProgress from './dialog/RecordingInProgress'
import AddVideo from './dialog/AddVideo'
import CounterDialog from './dialog/CounterDialog'
import PublishVideo from './dialog/PublishVideo'
import { Box } from '@mui/material'

const VideoAddSteps = () => {
    const [step, setStep] = useState(1)
    return (
        <>
            {step === 1 && <AddVideo nextStep={setStep} />}
            {step === 2 && <CounterDialog nextStep={setStep} />}
            {step === 3 && <RecordingInProgress nextStep={setStep} />}
            {step === 4 && <PublishVideo />}
        </>

    )
}

export default VideoAddSteps