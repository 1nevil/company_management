import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";

function ViewDepartment() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "Department",
      headerName: "Department",
      width: 290,
      editable: true,
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} title="Edit">
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    alert(id);
  };

  const handleEdit = (id) => {
    alert(id);
  };

  const Tasks = [
    { id: 1, Department: "Snow" },
    { id: 2, Department: "Lannister" },
    { id: 3, Department: "Lannister" },
  ];

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ height: "450px" }}
          xs={12}
          sm={6}
          md={7}
          rows={Tasks}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 15, 10, 25, 50, 100, 200]}
        />
      </div>
    </div>
  );
}

export default ViewDepartment;
