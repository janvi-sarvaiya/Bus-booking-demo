import React, { useMemo, useState } from "react";
import {
  useFetchBooking,
  useDeleteBooking,
  useDeleteAllBookings,
} from "../Api/fetchApi";
import DeleteBookingDialog from "../component/DeleteBookingDialog";
import DeleteAllBookingDialog from "../component/DeleteAllBookingDialog";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Popover } from "antd";

const StyledDataGrid = styled(DataGrid)(() => ({
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "var(--color-green)",
    color: "white",
    fontSize: 16,
  },
  "& .MuiDataGrid-cell": {
    backgroundColor: "#EEEEEE",
    color: "black",
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "var(--color-green)",
    color: "white",
  },
}));

export default function MyBooking() {
  const { data: Booking, isLoading, error } = useFetchBooking();
  const deleteMutation = useDeleteBooking();

  const deleteAllBooking = useDeleteAllBookings();

  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openAllDelete, setOpenAllDelete] = useState(false);

  const filterData = useMemo(() => {
    if (!Array.isArray(Booking)) return [];

    const tableData = searchData.toLowerCase();
    return Booking.filter(
      (val) =>
        val.customer.name.toLowerCase().includes(tableData) ||
        val.customer.email.toLowerCase().includes(tableData) ||
        val.customer.phoneNumber.toLowerCase().includes(tableData) ||
        val.busType.toLowerCase().includes(tableData) ||
        val.busName.toLowerCase().includes(tableData) ||
        val.from.toLowerCase().includes(tableData) ||
        val.to.toLowerCase().includes(tableData) ||
        val.selectedSeats.join().toLowerCase().includes(tableData) ||
        val.totalPrice.toString().includes(tableData.toString()) ||
        val.bookingDate.toLowerCase().includes(tableData)
    );
  }, [Booking, searchData]);

  if (error) {
    return (
      <div className="text-center text-2xl mt-10 font-bold text-red-600">
        Error: {error.message}
      </div>
    );
  }

  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleDeleteBooking = (booking) => {
    deleteMutation.mutate(booking);
  };

  const handleCloseDialog = () => {
    setSelectedBooking(null);
    setOpen(false);
  };

  const handleDeleteAllBooking = () => {
    deleteAllBooking.mutate();
  };

  const columns = [
    { field: "id", headerName: "Id", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 90,
      renderCell: (params) => params.row.customer.name,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      renderCell: (params) => params.row.customer.email,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      renderCell: (params) => params.row.customer.phoneNumber,
    },
    { field: "busName", headerName: "Bus Name", width: 150 },
    { field: "busType", headerName: "Bus Type", width: 120 },
    {
      field: "route",
      headerName: "Route",
      width: 200,
      valueGetter: (value, row) => `${row.from} >> ${row.to}`,
    },
    { field: "selectedSeats", headerName: "Selected Seats", width: 120 },
    { field: "totalPrice", headerName: "Price", width: 90 },
    { field: "bookingDate", headerName: "Booking Date", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 95,
      renderCell: (params) => {
        return (
          <>
            <Popover
              content="Are you want to delete the Booking?"
              title="Delete the Booking!"
              trigger="hover"
              placement="right"
            >
              <button
                className="bg-green h-10 my-1.5 text-white p-1 rounded ml-4 cursor-pointer"
                onClick={() => handleOpenDialog(params.row)}
              >
                <DeleteIcon className="mb-5" />
              </button>
            </Popover>
          </>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div className="min-h-screen w-screen bg-blue dark:bg-gray dark:text-white">
      <Container maxWidth="xl" className="pt-7">
        <Typography variant="h4" className="text-center">
          Customer Details
        </Typography>

        <input
          type="text"
          name="searchData"
          placeholder="Search here..."
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="border border-gray rounded-sm py-2 px-3 mt-3 ml-5 dark:border-gray-400  dark:bg-dark-card dark:text-white"
        />
    
        <button
          className="mt-6 bg-green text-white px-4 py-2 font-bold rounded cursor-pointer ml-5"
          onClick={() => setOpenAllDelete(true)}
        >
          Delete All Bookings
        </button>

        <StyledDataGrid
          rows={filterData}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          hideFooterSelectedRowCount
          disableColumnSorting={true}
          loading={isLoading}
          sx={{
            border: "1px solid gray",
            textAlign: "center",
            margin: "20px",
          }}
        />

        <DeleteBookingDialog
          open={open}
          onClose={handleCloseDialog}
          onDelete={handleDeleteBooking}
          booking={selectedBooking}
        />

        <DeleteAllBookingDialog
          open={openAllDelete}
          onClose={() => setOpenAllDelete(false)}
          onDelete={handleDeleteAllBooking}
        />
      </Container>
    </div>
  );
}
