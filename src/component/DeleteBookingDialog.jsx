import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import Typography from "@mui/material/Typography";

export default function DeleteBookingDialog({
  open,
  onClose,
  onDelete,
  booking,
}) {
  if (!booking) return null;
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "22px",
            bgcolor: "var(--color-green)",
            color: "white",
          }}
        >
          Confirm Delete Booking
        </DialogTitle>
        <DialogContent sx={{ padding: "25px", marginTop: "15px" }}>
            
          <Typography variant="body1">
            Name : {booking.customer.name}
          </Typography>
          <Typography variant="body1">
            Email : {booking.customer.email}
          </Typography>
          <Typography variant="body1">
            Phone Number : {booking.customer.phoneNumber}
          </Typography>
          <Typography variant="body1">Bus Name : {booking.busName}</Typography>
          <Typography variant="body1">Bus Type : {booking.busType}</Typography>
          <Typography variant="body1">
            Route : {booking.from} to {booking.to}
          </Typography>
          <Typography variant="body1">
            Selected Seats : {booking.selectedSeats.join(", ")}
          </Typography>
          <Typography variant="body1">
            Total Fare Price : ₹{booking.totalPrice}
          </Typography>
          <Typography variant="body1">
            Booking Date : {booking.bookingDate}
          </Typography>
          <Typography
            className="font-bold"
            variant="body1"
            sx={{ marginTop: "8px" }}
          >
            <InfoOutlineIcon /> Are you sure want to delete this booking?
          </Typography>

        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              onDelete(booking);
              onClose();
            }}
            className="bg-green text-white px-4 py-1 font-bold rounded -mt-4 cursor-pointer "
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-green text-white px-4 py-1 font-bold rounded -mt-4 cursor-pointer"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
