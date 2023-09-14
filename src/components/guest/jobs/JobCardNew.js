
import { useState } from "react";
import JobCardFront from "./frontSide/JobCardFront";
import JobCardBack from "./backSide/JobCardBack";
import ReactCardFlip from "react-card-flip";


export default function JobCard({
  index,
  job,
  setQuestions,
  onHandleClose,
  setopenApplyJobDialog,
}) {
  const [isHorizontalFlipped, setisHorizontalFlipped] = useState(false);
  return (
    <ReactCardFlip
      isFlipped={isHorizontalFlipped}
      flipDirection={"horizontal"}
      flipSpeedBackToFront="0.5"
      flipSpeedFrontToBack="0.5"
    >

      <JobCardFront
        index={job.job_id}
        job={job}
        setQuestions={setQuestions}
        onHandleClose={onHandleClose}
        setopenApplyJobDialog={setopenApplyJobDialog}
        setisFlipped={setisHorizontalFlipped}
      />
      <JobCardBack
        index={job.job_id}
        job={job}
        setQuestions={setQuestions}
        onHandleClose={onHandleClose}
        setopenApplyJobDialog={setopenApplyJobDialog}
        setisFlipped={setisHorizontalFlipped}
      />
    </ReactCardFlip>
  );
}
