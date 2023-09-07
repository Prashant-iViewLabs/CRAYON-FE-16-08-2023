import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import { Grid } from '@mui/material';
import { getVideoJobsList } from "../../../redux/candidate/candidateJobs";
import { useDispatch } from 'react-redux';
import { setAlert } from '../../../redux/configSlice';
import { ALERT_TYPE } from '../../../utils/Constants';
import InfiniteScroll from 'react-infinite-scroll-component';

const CamList = () => {
  const dispatch = useDispatch()
  const [allJobsList, setAllJobList] = useState()
  const allVideoJobs = async () => {
    const { payload } = await dispatch(getVideoJobsList())
    if (payload?.status === "success") {
      console.log(payload.data)
      setAllJobList(payload.data)
    } else {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: payload?.message,
        })
      );
    }
  }
  useEffect(() => {
    allVideoJobs()
  }, [])

  return (


    <Grid
      container
      flexDirection={{ sx: "column", md: "row" }}
      sx={{
        display: { xs: "none", md: "flex" },
      }}
      width={"99.5%"}
    >

      {
        allJobsList?.map((job) =>
          <Grid xl={3} lg={4} md={6} xs={12} key={job.job_id} sx={{
            
            padding:1
          }} >
            <VideoCard job={job} />
          </Grid>
        )
      }
    </Grid>

  )
}

export default CamList