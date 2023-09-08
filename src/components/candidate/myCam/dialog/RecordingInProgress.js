import { Box, Button, Paper, Typography, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import greenDiamond from '../../../../assets/Characters/Green_Diamond.svg'
import { RadioButtonChecked } from '@mui/icons-material';

const MAX_VIDEO_LENGTH_MS = 10000; // 1 minute in milliseconds
const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB in bytes

const RecordingInProgress = ({ nextStep, onRecordingStop }) => {
  const theme = useTheme()
  const [mediaStream, setMediaStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaStreamReady, setMediaStreamReady] = useState(false);
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const recordingStartTimeRef = useRef(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
        setMediaStreamReady(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }

    setupCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);
  useEffect(() => {
    // Start recording when the MediaStream is ready
    if (mediaStreamReady) {
      handleStartRecording();
    }
  }, [mediaStreamReady]);

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };
  const handleStartRecording = () => {
    recordedChunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(mediaStream);
    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunksRef.current.push(e.data);
        if (recordedChunksRef.current.length === 1) {
          setTimeout(handleStopRecording, MAX_VIDEO_LENGTH_MS);
        }

        // Check if the recorded video size exceeds the maximum limit
        if (recordedChunksRef.current.reduce((acc, chunk) => acc + chunk.size, 0) > MAX_VIDEO_SIZE_BYTES) {
          alert('The recorded video exceeds the maximum size limit (100 MB).');
          handleStopRecording();
        }
      }
    };
    mediaRecorderRef.current.onstop = () => {
      console.log(recordedChunksRef.current)
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      onRecordingStop(blob);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      console.log(a)
      a.download = 'recorded-video.webm';
      a.click();
      URL.revokeObjectURL(url);
      setRecording(false);
    };
    recordingStartTimeRef.current = Date.now();
    mediaRecorderRef.current.start();
    setRecording(true);
  };



  const handleCloseCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };
  return (
    <Paper sx={{
      width: "100%",
      padding: 3,
      paddingBottom: 0,
      display: "flex",
      flexDirection: "column",
      gap: 3,
      height: "30rem"
    }}>
      <Box sx={{
        background: theme.palette.mainBackground,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "15px",
        marginBottom: 2,
        gap: 2,
        flexGrow: 1
      }}>
        {/* {(videoRef.current) ? */}
        <video ref={videoRef} style={{
          width: "60%",
          height: "auto"
        }} autoPlay playsInline muted></video>
        {/* : (
            <Box sx={{
              position: "relative"
            }}>
              <RadioButtonChecked sx={{
                position: "absolute",
                fontSize: "25px",
                color: "red",
                top: "21px"
              }} />
              <Box
                component={"img"}
                src={greenDiamond}
                sx={{ width: 150, height: 100, paddingTop: 3, margin: "auto" }}
              />

            </Box>
          )} */}
      </Box>
      <Box>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Recording in Progress
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            fontWeight: 700,
            marginBottom: 3,
          }}
        >
          Click Stop to complete Recording
        </Typography>
        {/* <Button onClick={{
          handleStartRecording
        }}>
          Start
        </Button>
        <Button onClick={{
          handleStopRecording
        }}>
          Stop
        </Button> */}
        <div className="controls">
          {recording ? (
            <button onClick={handleStopRecording}>Stop Recording</button>
          ) : (
            <button onClick={handleStartRecording}>Start Recording</button>
          )}
          <button onClick={handleCloseCamera}>Close Camera</button>
        </div>
      </Box>
      <Box sx={{
        margin: "auto",
        width: "80%"
      }}>
        <Button
          variant="contained"
          color="redButton100"
          sx={{
            borderRadius: 0,
            width: "100%",
            height: "47px",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25
          }}
          startIcon={
            <Box
              sx={{
                background: "white",
                height: 15,
                width: 15,
                borderRadius: 1
              }}
            />
          }
          onClick={() => {
            handleStopRecording()
            handleCloseCamera()
            nextStep(4)
          }
          }
        >
          Stop Recording
        </Button>
      </Box>
    </Paper >
  )
}

export default RecordingInProgress