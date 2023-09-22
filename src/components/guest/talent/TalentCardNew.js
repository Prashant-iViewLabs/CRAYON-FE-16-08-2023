import { useState } from "react";
import TalentFront from "./frontSide/TalentFront";
import TalentBack from "./backSide/TalentBack";

import ReactCardFlip from "react-card-flip";

export default function TalentCard({ index, job }) {
  const [isHorizontalFlipped, setisHorizontalFlipped] = useState(false)
  return (
    <ReactCardFlip isFlipped={isHorizontalFlipped} flipDirection={'horizontal'} flipSpeedBackToFront="0.5" flipSpeedFrontToBack="0.5">
      <TalentFront index={job?.job_id} job={job} setisFlipped={setisHorizontalFlipped}
      />
      <TalentBack index={job?.job_id} job={job}
        setisFlipped={setisHorizontalFlipped}
      />
    </ReactCardFlip>
  )
}