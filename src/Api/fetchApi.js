import api from "./axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetchBuses = () => {
  const fetchBuses = async () => {
    const response = await api.get("/Bus");
    return response.data;
  };

  return useQuery({
    queryKey: ["buses"],
    queryFn: fetchBuses,
  });
};

export const usePostBooking = () => {
  const queryClient = useQueryClient();
  const postData = async (bookingData) => {
    const response = await api.post("/Booking", bookingData);
    return response.data;
  };

  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
};

export const useFetchBooking = () => {
  const fetchBooking = async () => {
    const response = await api.get("/Booking");
    return response.data;
  };

  return useQuery({
    queryKey: ["booking"],
    queryFn: fetchBooking,
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const deleteBooking = async (booking) => {
    await api.delete(`/Booking/${booking.id}`);

    const fetchBus = await api.get(`/Bus/${booking.busId}`);
    const bus = fetchBus.data;

    const updateBookedSeats = bus.bookedSeats.filter(
      (seat) => !booking.selectedSeats.includes(seat)
    );

    await api.patch(`/Bus/${booking.busId}`, {
      bookedSeats: updateBookedSeats,
    });
    return true;
  };

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
};

export const useDeleteAllBookings = () => {
  const queryClient = useQueryClient();
  const deleteAllBookings = async () => {
    const { data: bookings } = await api.get("/Booking");

    for (const booking of bookings) {
      const fetchBus = await api.get(`/Bus/${booking.busId}`);
      const bus = fetchBus.data;

      const updatedBookedSeats = bus.bookedSeats.filter(
        (seat) => !booking.selectedSeats.includes(seat)
      );

      await api.patch(`/Bus/${booking.busId}`, {
        bookedSeats: updatedBookedSeats,
      });

      await api.delete(`/Booking/${booking.id}`);
    }
  };

  return useMutation({
    mutationFn: deleteAllBookings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
};
