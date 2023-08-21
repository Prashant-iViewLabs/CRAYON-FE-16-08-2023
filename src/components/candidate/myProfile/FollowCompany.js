import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AutoComplete from "../../common/AutoComplete";
import { getCompanies } from "../../../redux/employer/empProfileSlice";
import { useDispatch } from "react-redux";
import { setAlert, setLoading } from "../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../utils/Constants";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  followCompany,
  getFollowCompany,
} from "../../../redux/candidate/myProfileSlice";

export default function FollowCompany() {
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState([]);
  const [followedCompany, setFollowedCompany] = useState([]);
  const [companyID, setCompanyID] = useState();

  const handleCompVal = async (event, newValue, id) => {
    let newCompany = { company: { name: newValue.name } };
    const newData = [...followedCompany, newCompany];
    console.log(newData);
    setFollowedCompany(newData);
    await followComp(newValue.company_id);
  };

  const getAllData = async () => {
    try {
      const company = await dispatch(getCompanies());
      setCompanies(company.payload.data);
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: ERROR_MSG,
        })
      );
    }
  };

  const followComp = async (compID) => {
    try {
      const data = {
        company_id: compID,
      };
      const { payload } = await dispatch(followCompany(data));
      if (payload.status === "success") {
        console.log(payload);
      }
    } catch (error) {}
  };

  const getFollowedCompany = async () => {
    try {
      const { payload } = await dispatch(getFollowCompany({ lastKey: "" }));
      if (payload.status === "success") {
        setFollowedCompany(payload.data);
      }
      console.log(payload);
    } catch (error) {}
  };

  useEffect(() => {
    getFollowedCompany("");
    getAllData();
  }, []);

  return (
    <Box sx={{ ml: 1 }} height={"100px"}>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          width: "fit-content",
        }}
      >
        Follow Company
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "47%", mb: 3 }}>
          <AutoComplete
            showAddOption={true}
            allowCustomInput={true}
            id="company_name"
            // value={getCompValue()}
            // value={selectedCompany}
            onChange={handleCompVal}
            placeholder="company you want to follow"
            data={companies}
          ></AutoComplete>
        </Box>
        <Box
          id="talentList"
          sx={{
            width: "50%",
            display: "flex",
            overflow: "hidden",
            height: "100px",
            justifyContent: "flex-start",
          }}
        >
          <InfiniteScroll
            style={{
              height: "100%",
              overflowX: "hidden",
              scrollbarWidth: "thin",
            }}
            dataLength={followedCompany?.length}
            // next={() => getJobList(lastKey)}
            hasMore={true}
            scrollableTarget="talentList"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  mr: 1,
                }}
              >
                {console.log(followedCompany)}
                {followedCompany?.map((item) => {
                  return (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        mr: 1,
                      }}
                    >
                      {item.company.name}
                    </Typography>
                  );
                })}
              </Typography>
            </Box>
            <style>
              {`.infinite-scroll-component::-webkit-scrollbar {
                      width: 7px !important;
                      background-color: #F5F5F5; /* Set the background color of the scrollbar */
                    }

                    .infinite-scroll-component__outerdiv {
                      height:100%
                    }

                    .infinite-scroll-component::-webkit-scrollbar-thumb {
                      background-color: #888c; /* Set the color of the scrollbar thumb */
                    }`}
            </style>
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  );
}
