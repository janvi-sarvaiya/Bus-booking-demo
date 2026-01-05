import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import Typography from "@mui/material/Typography";

export default function DeleteBookingDialog({ open, onClose, onDelete }) {
  return (
    <>
      <Dialog open={open} onClose={onClose} >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            bgcolor: "var(--color-green)",
            color: "white",
          }}
        >
          Confirm Delete All Bookings
        </DialogTitle>

        <DialogContent sx={{ padding: "25px", marginTop: "15px" }}>
          <Typography variant="body1" className="font-bold ">
            <InfoOutlineIcon /> Are you sure want to delete All this bookings?
          </Typography>
        </DialogContent>

        <DialogActions>
          <button
            onClick={() => {
              onDelete();
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
