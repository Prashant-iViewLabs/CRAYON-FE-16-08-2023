import { Box } from "@mui/material";
import React from "react";
import NameInfo from "./NameInfo";
import { DataGrid } from "@mui/x-data-grid";

export default function MemberInfo({ rows, role }) {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      renderCell: (params) => {
        console.log(params); // Console logging the params

        return (
          <div>
            <NameInfo
              avatarInitial={params.value.avatarInitial}
              name={params.value.fullname}
              email={params.value.email}
              userID={params?.row?.userId}
              role={role}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        // onRowSelectionModelChange={handleSelectionChange}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
