import React from "react";
import api from "../Api/axios";
import { useBusStore } from "../store/useBusStore";
import { useNavigate } from "react-router-dom";
import { usePostBooking } from "../Api/fetchApi";

import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import WestIcon from "@mui/icons-material/West";

import { message } from "antd";

export default function Booking() {
  const navigate = useNavigate();
  const { buses, selectedSeats, totalPrice, customer, setCustomer, resetData } =
    useBusStore();

  const mutation = usePostBooking();
  const [messageApi, contextHolder] = message.useMessage();

  const fieldsWarning = () => {
    messageApi.open({
      type: "error",
      content: "Please Fill all Fields!!",
      duration: 5,
    });
  };

  const pnoWarning = () => {
    messageApi.open({
      type: "error",
      content: "Phone Number must be 10 Digits!",
      duration: 5,
    });
  };

  if (!buses) {
    return (
      <>
        <Typography
          variant="h5"
          className="text-center text-red-600"
          sx={{ marginTop: "40px", fontWeight: "bold" }}
        >
          No bus selected!!
        </Typography>
        <Typography className="text-center text-red-600">
          Please go back and select a Bus and Seats.
        </Typography>
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!customer.name || !customer.phoneNumber || !customer.email) {
        fieldsWarning();
        return;
      } else if (customer.phoneNumber.length != 10) {
        pnoWarning();
        return;
      }

      const bookingData = {
        customer,
        busId: buses.id,
        busType: buses.busType,
        busName: buses.busName,
        from: buses.from,
        to: buses.to,
        selectedSeats,
        totalPrice,
        bookingDate: new Date().toISOString(),
      };

      await mutation.mutateAsync(bookingData);

      await api.patch(`/Bus/${buses.id}`, {
        bookedSeats: [buses.bookedSeats, ...selectedSeats].flat(),
      });

      console.log(bookingData);
      alert("are you sure want to Booking?");
      navigate("/mybookings");
      resetData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col md:flex-row min-h-screen bg-blue gap-5 dark:bg-gray"> 
      {contextHolder}
      <div className="w-80 p-8 bg-white rounded-2xl shadow-2xl md:w-100 m-5 dark:bg-dark-card dark:text-white">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex items-center mb-1"> 
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer hover:bg-gray-300 hover:rounded-full p-1 dark:hover:text-black"
            >
              <WestIcon />
            </button>
            <Typography variant="h5" className="text-center flex-1">
              Customer Details
            </Typography>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Enter User Name"
            value={customer.name}
            onChange={(e) => setCustomer("name", e.target.value)}
            className="border border-gray w-full rounded-sm p-3 mt-3 dark:border-gray-400  dark:bg-gray dark:text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={customer.email}
            onChange={(e) => setCustomer("email", e.target.value)}
            className="border border-gray w-full rounded-sm p-3 mt-5 dark:border-gray-400 dark:bg-gray dark:text-white"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={customer.phoneNumber}
            onChange={(e) => setCustomer("phoneNumber", e.target.value)}
            className="border border-gray w-full rounded-sm p-3 mt-5 dark:border-gray-400 dark:bg-gray dark:text-white"
          />
          <button
            type="submit"
            className="bg-green mt-4 w-full text-white px-4 py-2 font-bold rounded cursor-pointer"
            disabled={mutation.isPending}
          >
            Booking
          </button>
        </form>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-2xl w-80 md:w-100 m-5 dark:bg-dark-card dark:text-white">
        <Typography variant="h5" className="text-center pb-3">
          Booking Summary
        </Typography>

        <Typography
          variant="h6"
          className="text-center bg-green text-white rounded-md"
        >
          {buses.from} <DoubleArrowIcon /> {buses.to}
        </Typography>

        <Typography variant="h6" sx={{ marginTop: "12px", fontWeight: "bold" }}>
          {buses.busName} ({buses.busType})
        </Typography>

        <Typography variant="h6" sx={{ marginTop: "10px", fontWeight: "bold" }}>
          Seat Detail :
        </Typography>

        <Stack spacing={1} className="mt-3">
          <Typography variant="body1">
            Selected Seats: {selectedSeats.join(", ")}
          </Typography>
          <Typography variant="body1">
            Total Seat Selected : {selectedSeats.length || 0}
          </Typography>
          <Typography variant="body1">
            Price Per Seat : ₹{buses.price}
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          className="bg-green py-1 text-white px-4 rounded-sm"
          sx={{ marginTop: "12px", fontWeight: "bold", fontSize: "18px" }}
        >
          Total Price: ₹{totalPrice}
        </Typography>
      </div>
    </div>
  );
}
