import React, { useEffect, useRef, useState } from "react";
import CustomDialog from "../../../common/CustomDialog";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { useTheme } from "@emotion/react";
import SelectMenu from "../../../common/SelectMenu";
import { useSelector } from "react-redux";
import AutoComplete from "../../../common/AutoComplete";
import { useDispatch } from "react-redux";
import {
  followCompany,
  getFollowCompany
} from "../../../../redux/candidate/myProfileSlice";

import { setAlert, setLoading } from "../../../../redux/configSlice";
import { ALERT_TYPE, ERROR_MSG } from "../../../../utils/Constants";
import { getCompanies } from "../../../../redux/employer/empProfileSlice";


export default function AddNewCompany({
  show,
  handleOpen,
  handleAdd,
  handleNewJob,
  newTitle,
  name,
  setValue,
  value,
  dialogText,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const [newCompanyName, setNewCompanyName] = useState({})
  const [followedCompany, setFollowedCompany] = useState([]);
  const [companies, setCompanies] = useState([]);
  const getAllData = async () => {
    try {
      const company = await dispatch(getCompanies());
      console.log(company.payload.data)
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
  const handleCompVal = async (newValue) => {
    console.log(newValue)
    
    // let newCompany = { company: { name: newValue.name } };
    // const newData = [...followedCompany, newCompany];
    // console.log(newData);
    if(Object.keys(newValue).length === 0){
      dispatch(
        setAlert({
          show: true,
          type: ALERT_TYPE.ERROR,
          msg: "Please Select company",
        })
      );
    }
    else{
      await followComp(newValue.company_id);
    }
  };

  const handleValue = async (event, newValue) => {
    console.log(newValue)
    setNewCompanyName(newValue)
  }
  useEffect(() => {
    getAllData()
  }, [])
  
  return (
    <CustomDialog
      show={show}
      hideButton={false}
      dialogWidth="xs"
      showFooter={false}
      onDialogClose={handleOpen}
      padding={0}
    >
      <Box
        sx={{
          padding: 4,
        }}
      >
          <AutoComplete
            showAddOption={true}
            allowCustomInput={true}
            id="company_name"
            // value={getCompValue()}
            // value={selectedCompany}
            onChange={handleValue}
            placeholder="company you want to follow"
            data={companies}
          ></AutoComplete>
      </Box>
      <Box>
        <Button
          sx={{
            boxShadow: 0,
            fontSize: "14px",
            width: "50%",
            borderRadius: 0,
            height: "43px",
            background: "lightgray",
            color: "black",
            padding: 3,
          }}
          variant="contained"
          onClick={handleOpen}
        >
          cancel
        </Button>
        <Button
          sx={{
            boxShadow: 0,
            fontSize: "14px",
            width: "50%",
            borderRadius: 0,
            height: "43px",
            padding: 3,
          }}
          variant="contained"
          color="redButton100"
          onClick={() => handleCompVal(newCompanyName)}
        >
          add
        </Button>
      </Box>
    </CustomDialog>
  );
}
