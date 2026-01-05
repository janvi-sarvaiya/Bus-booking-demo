import React from "react";
import { useBusStore } from "../store/useBusStore";
import { useNavigate } from "react-router-dom";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function BusList({ bus }) {
  const navigate = useNavigate();

  const setBuses = useBusStore((state) => state.setBuses);
  const resetSelectedSeats = useBusStore((state) => state.resetSelectedSeats);

  const handleNavigation = () => {
    resetSelectedSeats();
    setBuses(bus);
    navigate(`/buses/${bus.id}/seats`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-2xl w-65 h-60 py-6 px-5 cursor-pointer dark:bg-dark-card"
      onClick={handleNavigation}
    >
      <Typography
        variant="h6"
        className="text-center bg-green text-white rounded-md"
        sx={{ fontWeight: "bold" }}
      >
        {bus.busName} <DirectionsBusFilledIcon />
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        className="justify-around text-lg mt-2  bg-green text-white rounded-md py-0.5"
      >
        <Typography variant="body1">{bus.from}</Typography>
        <DoubleArrowIcon />
        <Typography variant="body1">{bus.to}</Typography>
      </Stack>

      <Stack
        direction="row"
        className="justify-between text-gray-500 mt-3 dark:text-gray-300"
      >
        <Typography variant="body1">[ {bus.busType} ]</Typography>
        <Typography variant="body1">
          ( {bus.seatsAvailable - bus.bookedSeats.length} ) Seats
        </Typography>
      </Stack>

      <Typography
        variant="h6"
        sx={{ marginTop: "12px", marginBottom: "18px" }}
        className="dark:text-white"
      >
        Fare Price : ₹{bus.price}
      </Typography>
      <button
        onClick={handleNavigation}
        className="bg-green text-white px-3 py-1.5 rounded-md font-bold cursor-pointer"
      >
        View Seats
      </button>
    </div>
  );
}
