import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function ApprovedAdmins() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpenModel = () => {
    setOpen(true);
  };
  const handleCloseModel = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "AdminName", headerName: "Admin Name", width: 120 },
    { field: "Email", headerName: "Email", width: 250 },
    {
      field: "Reject",
      headerName: "Reject",
      description: "Reject",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/admin/teamdetails/${params.row.id}`}
        >
          <CancelOutlinedIcon />
        </Link>
      ),
    },
  ];

  const teams = [
    {
      id: 1,
      AdminName: "vikram",
      Email: "Nevil@gmail.com",
    },
    {
      id: 2,
      AdminName: "nevil",
      Email: "Nevil@gmail.com",
    },
    {
      id: 3,
      AdminName: "nevil",
      Email: "Nevil@gmail.com",
    },
  ];

  return (
    <div>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={teams}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default ApprovedAdmins;
