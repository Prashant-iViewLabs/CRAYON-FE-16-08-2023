import React, { useState } from 'react'
import RecordingInProgress from './dialog/RecordingInProgress'
import AddVideo from './dialog/AddVideo'
import CounterDialog from './dialog/CounterDialog'
import PublishVideo from './dialog/PublishVideo'
import { Box } from '@mui/material'

const VideoAddSteps = () => {
    const [step, setStep] = useState(1)
    const [recordedVideoData, setRecordedVideoData] = useState(null);

    // Callback function to receive recorded video data
    const handleVideoData = (videoData) => {
        setRecordedVideoData(videoData);
    };
    return (
        <>
            {step === 1 && <AddVideo nextStep={setStep} />}
            {step === 2 && <CounterDialog nextStep={setStep} />}
            {step === 3 && <RecordingInProgress nextStep={setStep} onRecordingStop={handleVideoData}/>}
            {step === 4 && <PublishVideo videoData={recordedVideoData}/>}
        </>

    )
}

export default VideoAddSteps