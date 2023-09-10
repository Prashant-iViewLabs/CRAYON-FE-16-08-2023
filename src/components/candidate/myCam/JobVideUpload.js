import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Dialog, DialogTitle, IconButton, Paper, Typography, useTheme } from '@mui/material'
import yellowEllipse from "../../../assets/Characters/Yellow_Ellipse_Head copy.svg";
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../redux/configSlice';
import { ALERT_TYPE } from '../../../utils/Constants';
import { uploadJobCamVideo } from '../../../redux/candidate/candidateJobs';
import CancelIcon from "../../../assets/Padding Excluded/Black_Trash_Delete_2.svg";
import CounterDialog from './dialog/CounterDialog';
import RecordingInProgress from './dialog/RecordingInProgress';
import YellowStar from "../../../assets/Characters/Yellow_Star.svg";
import Delete from './dialog/Delete';


const JobVideoUpload = ({ show, closeFunc, job_id, reloadVideo }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const VideoRef = useRef(null)

    const [steps, setSteps] = useState(1)
    const [recordedVideoData, setRecordedVideoData] = useState(null);
    const [reviewVideo, setReviewVideo] = useState(false)
    const [videoLink, setVideoLink] = useState("")
    const [openDelete, setOpenDelete] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false);

    const fileAccept = "video/*";
    const hiddenFileInput = useRef(null);

    const validateFileSize = (file) => {
        if (file.size > 100000000) {
            dispatch(
                setAlert({
                    show: true,
                    type: ALERT_TYPE.ERROR,
                    msg: "Video size should be less than 100MB",
                })
            );
            return false;
        }
        return true;
    };
    const uploadVideo = async (file) => {
        const formData = new FormData();
        formData.append("jobcam", file);
        formData.append("job_id", job_id);

        try {
            const { payload } = await dispatch(uploadJobCamVideo(formData));
            if (payload?.status === "success") {
                dispatch(
                    setAlert({
                        show: true,
                        type: ALERT_TYPE.SUCCESS,
                        msg: "Video uploaded Successfully!",
                    })
                );
                closeFunc();
                setSteps(1);
                reloadVideo(URL.createObjectURL(file))
                // await getVideo()
                // setVideoLink(URL.createObjectURL(file));
                // VideoRef.current.load();
            } else {
                dispatch(
                    setAlert({
                        show: true,
                        type: ALERT_TYPE.ERROR,
                        msg: "Failed to upload Video",
                    })
                );
            }
        } catch (error) {
            dispatch(setAlert({ show: true }));
        }
    };
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        if (validateFileSize(selectedFile)) {
            const link = URL.createObjectURL(selectedFile);
            console.log(link)
            setVideoLink(link);
            await uploadVideo(selectedFile);
        }
    };
    const handleFileClick = () => {
        hiddenFileInput.current.click();
    };


    // Callback function to receive recorded video data
    const handleVideoData = (videoData) => {
        setRecordedVideoData(videoData);
    };
    const handleReview = () => {
        setReviewVideo(true)
    }

    const createFileFromBlob = () => {
        const myFile = new File([recordedVideoData], 'videoFile.webm', {
            type: recordedVideoData.type,
        });
        uploadVideo(myFile)
    }

    const handleOpenDelete = () => {
        closeFunc()
        setOpenDelete((prevState) => !prevState);
        setConfirmDelete(false);
    };
    const handleCancelDelete = () => {
        setOpenDelete((prevState) => !prevState);
        setConfirmDelete(false);
    }

    const handleDeleteVideo = () => {
        setSteps(1)
        handleCancelDelete()
        dispatch(
            setAlert({
                show: true,
                type: ALERT_TYPE.ERROR,
                msg: "Video deleted",
            })
        );

    }
    useEffect(() => {
        if (recordedVideoData) {
            const link = URL.createObjectURL(recordedVideoData);
            setVideoLink(link);
        }
    }, [recordedVideoData]);


    return (
        <>
            <Dialog open={show}
                fullWidth={true}
                maxWidth={"sm"}
            >
                <DialogTitle >
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            closeFunc();
                            setSteps(1)
                        }}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        {/* <CloseIcon /> */}
                        <Box
                            sx={{
                                width: "20px",
                                height: "20px",
                                color: "#000000",
                                border: 2,
                                fontSize: "18px",
                                borderRadius: "5px",
                            }}
                        >
                            X
                        </Box>
                    </IconButton>
                </DialogTitle>
                {steps === 1 &&
                    <Paper
                        sx={{
                            padding: 3,
                            paddingBottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            justifyContent: "space-between",
                            height: "30rem",
                        }}
                    >
                        <Box
                            sx={{
                                background: theme.palette.mainBackground,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "15px",
                                flexGrow: 1,
                            }}
                        >
                            <Box
                                component={"img"}
                                src={yellowEllipse}
                                sx={{ width: 150, height: 100 }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: 700,
                                }}
                            >
                                Add a new job application video
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                }}
                            >
                                Record or upload an application video based on why you are the<br /> perfect
                                candidate for the job.
                            </Typography>
                            {/* <VideoSection link={videoLink}/> */}
                            {/* {videoLink && (
                    <video
                        ref={VideoRef}
                        autoPlay={false}
                        poster=""
                        style={{
                            width: "40%",
                            height: "100px",
                        }}
                        controls
                    >
                        <source src={videoLink} type="video/mp4" />
                    </video>
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
                                Remember to just be you!
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                }}
                            >
                                Highlight ypur skills, the tools you use and what the next steps in
                                your
                                <br /> career would be.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                margin: "auto",
                                width: "80%",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="blueButton700"
                                sx={{
                                    borderRadius: 0,
                                    width: "50%",
                                    height: "47px",
                                    borderTopLeftRadius: 25,
                                }}
                                onClick={() => {
                                    // closeFunc() 
                                    setSteps(prevState => prevState + 1)
                                }
                                }
                            >
                                Record Video
                            </Button>
                            <input
                                accept={fileAccept}
                                ref={hiddenFileInput}
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                            <Button
                                variant="contained"
                                color="greenButton"
                                sx={{
                                    borderRadius: 0,
                                    width: "50%",
                                    height: "47px",
                                    borderTopRightRadius: 25,
                                }}
                                onClick={handleFileClick}
                            >
                                {/* {i18n["topBar.join"]} */}
                                Upload Video
                            </Button>
                        </Box>
                    </Paper>
                }
                {steps === 2 &&
                    <Box sx={{ width: '100%' }}>
                        <CounterDialog nextStep={setSteps} />
                    </Box>
                }
                {steps === 3 &&
                    <Box sx={{ width: '100%' }}>
                        <RecordingInProgress nextStep={setSteps} onRecordingStop={handleVideoData} />
                    </Box>
                }
                {steps === 4 &&
                    <Paper
                        sx={{
                            padding: 3,
                            paddingBottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            justifyContent: "space-between",
                            height: "30rem",
                        }}>
                        <Box
                            sx={{
                                background: theme.palette.mainBackground,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: "15px",
                                marginBottom: 2,
                                gap: 2,
                                flexGrow: 1,
                            }}
                        >
                            {reviewVideo ? (
                                <video
                                    ref={VideoRef}
                                    autoPlay={false}
                                    poster=""
                                    style={{
                                        width: "60%",
                                        height: "auto",
                                    }}
                                    src={videoLink}
                                    type="video/mp4"
                                    controls
                                >
                                </video>)
                                :
                                (
                                    <Box
                                        component={"img"}
                                        src={YellowStar}
                                        sx={{ width: 200, height: 200, paddingTop: 3, margin: "auto" }}
                                    />
                                )}
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                }}
                            >
                                A star performance!
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    marginBottom: 3,
                                }}
                            >
                                Review, delete or publish your video now.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                margin: "auto",
                                width: "80%",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="grayButton200"
                                sx={{
                                    borderRadius: 0,
                                    width: "33.33%",
                                    height: "47px",
                                    borderTopLeftRadius: 25,
                                }}
                                onClick={handleReview}
                            >
                                review
                            </Button>
                            <Button
                                variant="contained"
                                color="redButton100"
                                sx={{
                                    borderRadius: 0,
                                    width: "33.33%",
                                    height: "47px",
                                }}
                            onClick={handleOpenDelete}
                            >
                                delete
                            </Button>
                            <Button
                                variant="contained"
                                color="greenButton200"
                                sx={{
                                    borderRadius: 0,
                                    width: "33.33%",
                                    height: "47px",
                                    borderTopRightRadius: 25,
                                }}
                                onClick={createFileFromBlob}
                            >
                                publish
                            </Button>
                        </Box>
                    </Paper>
                }

            </Dialog>
            <Delete
                show={openDelete}
                handleOpen={handleOpenDelete}
                handleCancel={handleCancelDelete}
                handleDelete={handleDeleteVideo}
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
            />
        </>

    )
}

export default JobVideoUpload