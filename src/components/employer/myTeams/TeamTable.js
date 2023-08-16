// import React from "react";
// import { Box, Typography, Link, Button, Divider } from "@mui/material";

// import { useNavigate } from "react-router-dom";
// import TeamsDataTable from "./TeamsDataTable";
// import SmallButton from "../../common/SmallButton";
// import {
//   getAllTeamMembers,
//   getFilteredMember,
//   removeMember,
// } from "../../../redux/employer/myTeams";
// import { useDispatch } from "react-redux";
// import { setAlert } from "../../../redux/configSlice";
// import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
// import { useEffect } from "react";
// import { useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import MemberInfo from "./MemberInfo";
// import { useSelector } from "react-redux";

// function createData(
//   name,
//   email,
//   status,
//   dateAdded,
//   lastActive,
//   permissions,
//   user_id
// ) {
//   return {
//     name,
//     email,
//     status,
//     dateAdded,
//     lastActive,
//     permissions,
//     user_id,
//   };
// }

// const TeamTable = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [rows, setRows] = useState([]);
//   const [openDelete, setOpenDelete] = useState(false);
//   const [deleted, setDeleted] = useState(0);
// const [companyName, setCompanyName] = useState("");
// const [role, setRole] = useState(0);

// const selectedFilter = useSelector((state) => state.filters.selectedFilter);

//   console.log(selectedFilter);

// const handleAddNewMemberClick = () => {
//   navigate("add-new-member", { state: { companyname: companyName } });
// };

// const getTeamsMember = async () => {
//   try {
//     const { payload } = await dispatch(getAllTeamMembers({ job_id: "" }));
//     if (payload?.status == "success") {
//       setCompanyName(payload.companyName);
//       setRows(
//         payload?.data.map((team) => {
//           return createData(
//             team?.user?.first_name,
//             team?.user?.email,
//             "Offline",
//             team?.created_at,
//             team?.user?.last_login_at,
//             team?.employer_role_type?.name,
//             team?.user_id
//           );
//         })
//       );
//       setRole(payload?.roletypeId);
//     } else {
//       dispatch(
//         setAlert({
//           show: true,
//           type: ALERT_TYPE.ERROR,
//           msg: payload?.message,
//         })
//       );
//     }
//   } catch (error) {
//     dispatch(
//       setAlert({
//         show: true,
//         type: ALERT_TYPE.ERROR,
//         msg: ERROR_MSG,
//       })
//     );
//   }
// };

// const filteredMember = async () => {
//   const { payload } = await dispatch(
//     getFilteredMember({ job_id: "", role_type: selectedFilter })
//   );
//   if (payload?.status == "success") {
//     setRows([]);
//     setCompanyName(payload.companyName);
//     setRows(
//       payload?.data.map((team) => {
//         return createData(
//           team?.user?.first_name,
//           team?.user?.email,
//           "Offline",
//           team?.created_at,
//           team?.user?.last_login_at,
//           team?.employer_role_type?.name,
//           team?.user_id
//         );
//       })
//     );
//     setRole(payload?.roletypeId);
//   }
// };

// useEffect(() => {
//   filteredMember();
// }, [selectedFilter]);

// useEffect(() => {
//   console.log(deleted);
//   getTeamsMember();
// }, [deleted !== 0]);

//   const handleOpenDelete = () => {
//     setOpenDelete((prevState) => !prevState);
//   };
//   return (
//     <Box
//       sx={
//         role === 1 || role === 2
//           ? {
//               boxShadow: 2,
//               borderRadius: "15px",
//               backgroundColor: "#ffff",
//               margin: "0 24px 24px 24px",
//               // minHeight: "80vh",
//               display: "flex",
//               flexGrow: 1,
//               flexDirection: "column",
//               justifyContent: "space-between",
//               width: "57vh",
//             }
//           : {
//               margin: "0 24px 24px 24px",
//               // minHeight: "80vh",
//               display: "flex",
//               flexGrow: 1,
//               flexDirection: "column",
//               justifyContent: "space-between",
//               width: "57vh",
//             }
//       }
//     >
//       {/* HeaderSection Starts*/}
//       {role === 1 || role === 2 ? (
//         <Box
//           className="HeaderSection"
//           sx={{
//             p: "24px 54px 0 54px",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "20px",
//                 fontWeight: 700,
//               }}
//             >
//               {companyName}
//             </Typography>
//             <SmallButton
//               backgroundColor={"lightGray"}
//               color={"black"}
//               m={0}
//               label={rows.length}
//             />
//           </Box>
//           <Box>
//             <Typography variant="p">
//               Add and manage your team's and recruiter account permissions
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               margin: "30px 0",
//               display: "flex",
//               gap: 2,
//             }}
//           >
//             {/* <Link to={`add-new-member`}> */}
//             <Button
//               variant="contained"
//               color="redButton"
//               onClick={handleAddNewMemberClick}
//             >
//               add new member
//             </Button>
//             {/* </Link> */}
//             <Button variant="contained" color="grayButton">
//               download CSV
//             </Button>
//             <Box
//               sx={{
//                 display: "flex",
//                 marginLeft: "auto",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//               onClick={handleOpenDelete}
//             >
//               <CloseIcon color="redButton100" />
//               <Typography>remove selected users</Typography>
//             </Box>
//           </Box>
//         </Box>
//       ) : null}
//       {/* HeaderSection Ends*/}

//       {/* DataTable Section Starts */}
//       {console.log(rows)}
//       {role === 1 || role === 2 ? (
//         <>
//           <Divider />
//           <TeamsDataTable
//             rows={rows}
//             openDelete={openDelete}
//             setOpenDelete={setOpenDelete}
//             setDeleted={setDeleted}
//             role={role}
//           />
//         </>
//       ) : (
//         <MemberInfo rows={rows} />
//       )}
//       {/* DataTable Section Ends */}
//     </Box>
//   );
// };

// export default TeamTable;

import React from "react";
import { Box, Typography, Link, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TeamsDataTable from "./TeamsDataTable";
import SmallButton from "../../common/SmallButton";
import {
  getAllTeamMembers,
  getFilteredMember,
} from "../../../redux/employer/myTeams";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import { useEffect } from "react";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector } from "react-redux";
import MemberInfo from "./MemberInfo";
function createData(
  id,
  userId,
  user,
  Status,
  dateAdded,
  lastActive,
  permissions
) {
  return {
    id,
    userId,
    name: {
      fullname: `${user?.first_name} ${user?.last_name}`,
      email: user?.email,
      avatarInitial: `${user?.first_name[0]}${user?.last_name[0]}`,
    },
    Status,
    dateAdded,
    lastActive,
    permissions,
  };
}
const TeamTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filters.selectedFilter);

  const [rows, setRows] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [deleted, setDeleted] = useState(0);
  const [role, setRole] = useState(0);
  const handleAddNewMemberClick = () => {
    navigate("add-new-member", { state: { companyname: companyName } });
  };
  const getTeamsMember = async () => {
    try {
      const { payload } = await dispatch(getAllTeamMembers({ job_id: "" }));
      if (payload?.status == "success") {
        setCompanyName(payload.companyName);
        setRows(
          payload?.data?.map((team) => {
            return createData(
              nanoid(),
              team?.user_id,
              team?.user,
              "Offline",
              team?.created_at,
              team?.user?.last_login_at,
              team?.employer_role_type !== null &&
                team?.employer_role_type?.name
            );
          })
        );
        setRole(payload?.roletypeId);
      } else {
        dispatch(
          setAlert({
            show: true,
            type: ALERT_TYPE.ERROR,
            msg: payload?.message,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };
  const filteredMember = async () => {
    const { payload } = await dispatch(
      getFilteredMember({ job_id: "", role_type: selectedFilter })
    );
    if (payload?.status == "success") {
      setRows([]);
      setCompanyName(payload.companyName);
      setRows(
        payload?.data.map((team) => {
          return createData(
            nanoid(),
            team?.user_id,
            team?.user,
            "Offline",
            team?.created_at,
            team?.user?.last_login_at,
            team?.employer_role_type !== null && team?.employer_role_type?.name
          );
        })
      );
      setRole(payload?.roletypeId);
    }
  };

  useEffect(() => {
    filteredMember();
  }, [selectedFilter]);

  useEffect(() => {
    getTeamsMember();
  }, [deleted !== 0]);
  return (
    <Box
      sx={{
        boxShadow: 2,
        borderRadius: "15px",
        backgroundColor: "#ffff",
        margin: "0 24px 24px 24px",
        // minHeight: "80vh",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        width: "57vh",
      }}
    >
      {/* HeaderSection Starts*/}
      <Box
        className="HeaderSection"
        sx={{
          p: "24px 54px 0 54px",
        }}
      >
        {role === 1 || role === 2 ? (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {companyName}
              </Typography>
              <SmallButton
                backgroundColor={"lightGray"}
                color={"black"}
                m={0}
                label={rows.length}
              />
            </Box>

            <Box>
              <Typography variant="p">
                Add and manage your team's and recruiter account permissions
              </Typography>
            </Box>
            <Box
              sx={{
                margin: "30px 0",
                display: "flex",
                gap: 2,
              }}
            >
              {/* <Link to={`add-new-member`}> */}

              {/* </Link> */}
              <Button
                variant="contained"
                color="redButton"
                onClick={handleAddNewMemberClick}
              >
                add new member
              </Button>
              <Button
                variant="contained"
                color="grayButton200"
                startIcon={<ArrowDownwardIcon />}
              >
                download CSV
              </Button>
            </Box>
          </>
        ) : null}
      </Box>
      {/* HeaderSection Ends*/}
      {/* DataTable Section Starts */}
      {role === 1 || role === 2 ? (
        <>
          <Divider />
          <TeamsDataTable rows={rows} setDeleted={setDeleted} role={role} />
        </>
      ) : (
        <MemberInfo rows={rows} role={role} />
      )}
      {/* DataTable Section Ends */}
    </Box>
  );
};
export default TeamTable;
