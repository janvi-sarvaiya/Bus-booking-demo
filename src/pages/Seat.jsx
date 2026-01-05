import React from "react";
import { useBusStore } from "../store/useBusStore";
import { useNavigate } from "react-router-dom";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import WestIcon from "@mui/icons-material/West";

export default function Seat() {
  const navigation = useNavigate();
  const { buses, selectedSeats, totalPrice, selectSeats } = useBusStore();

  if (!buses) {
    return (
      <Typography
        className="text-center text-red-600"
        variant="h5"
        sx={{ marginTop: "40px" }}
      >
        No bus selected. Please go back!!
      </Typography>
    );
  }

  function generateNumber(n) {
    let numbers = [];
    for (let i = 1; i <= n; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  const seats = generateNumber(buses.seatsAvailable);

  return (
    <div className="flex justify-center items-center h-212 bg-blue dark:bg-gray">
      <div className="p-5 px-8 bg-white rounded-2xl shadow-2xl w-90 md:w-120 dark:bg-dark-card">
        <div className="flex items-center mb-2">
          <button
            onClick={() => navigation(-1)}
            className="cursor-pointer hover:bg-gray-300 hover:rounded-full p-1 dark:text-white dark:hover:text-black"
          >
            <WestIcon />
          </button>
          <Typography
            variant="h5"
            className="text-center flex-1 dark:text-white"
          >
            {buses.busName} ({buses.busType})
          </Typography>
        </div>

        <Typography
          variant="h6"
          className="text-center bg-green text-white rounded-md"
        >
          {buses.from} <DoubleArrowIcon /> {buses.to}
        </Typography>

        <div className="grid grid-cols-4 mt-4 gap-2 w-70 mr-auto ml-auto dark:text-white">
          {seats.map((val, idx) => {
            const isBooked = buses.bookedSeats.includes(val);
            const isSelected = selectedSeats.includes(val);

            let bg = "border-2 border-green-500";
            if (isBooked) {
              bg = "bg-gray-300 cursor-not-allowed dark:text-black";
            } else if (isSelected) {
              bg = "bg-green-500 text-white";
            }
            return (
              <div
                key={val}
                className={`flex flex-col items-center ${
                  (idx + 1) % 2 === 0 ? "mr-10" : ""
                }`}
              >
                <button
                  key={val}
                  disabled={isBooked}
                  onClick={() => selectSeats(val)}
                  className={`w-10 py-4 rounded ${bg}`}
                >
                  {val}
                </button>
              </div>
            );
          })}
        </div>

        <Stack
          spacing={1.5}
          direction="row"
          className="items-center justify-center gap-3 md:gap-6 mt-4 bg-blue shadow-md text-center p-4 rounded-md dark:bg-gray"
        >
          <Badge badgeContent={selectedSeats.length || 0} color="error">
            <Box className="bg-green-500 w-19 md:w-22 py-2 rounded-md text-white">
              Selected
            </Box>
          </Badge>

          <Badge
            badgeContent={
              buses.seatsAvailable -
              buses.bookedSeats.length -
              selectedSeats.length
            }
            color="error"
          >
            <Box className="border-2 border-green-500 w-19 md:w-22 py-2 rounded-md dark:text-white">
              Available
            </Box>
          </Badge>

          <Badge badgeContent={buses.bookedSeats.length} color="error">
            <Box className="bg-gray-300 w-19 md:w-22 py-2 rounded-md">
              Booked
            </Box>
          </Badge>
        </Stack>

        <div className="mt-5 dark:text-white">
          <Stack spacing={1.5} className="mb-2">
            <Typography variant="body1">
              Price Per Seat : ₹{buses.price}
            </Typography>
            {/* <Typography variant="body1">
              Total Seat Selected : {selectedSeats.length || 0}
            </Typography> */}
            <Typography variant="body1">
              Selected Seats : {selectedSeats.join(", ") || 0}
            </Typography>
            <Typography variant="body1">
              Total Fare Price : ₹{totalPrice}
            </Typography>
          </Stack>

          <Divider />
          <button
            onClick={() => navigation("/booking")}
            className={`mt-3 w-full text-white px-4 py-2 font-bold rounded ${
              selectedSeats.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green cursor-pointer"
            }`}
            disabled={selectedSeats.length === 0}
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}
