import { create } from "zustand";

export const useBusStore = create((set) => ({
  buses: null,
  setBuses: (bus) => set({ buses: bus }),
  selectedSeats: [],
  totalPrice: 0,

  selectSeats: (seatNumber) =>
    set((state) => {
      const { buses, selectedSeats } = state;

      if (buses.bookedSeats.includes(seatNumber)) {
        return state;
      }

      const isSelected = selectedSeats.includes(seatNumber);
      const seatUpdate = isSelected
        ? selectedSeats.filter((val) => val !== seatNumber)
        : [...selectedSeats, seatNumber];

      const totalPrice = seatUpdate.length * buses.price;
      return { selectedSeats: seatUpdate, totalPrice };
    }),

  resetSelectedSeats: () => set({ selectedSeats: [] }),

  customer: { name: "", phoneNumber: "", email: "" },

  setCustomer: (field, value) =>
    set((state) => ({
      customer: { ...state.customer, [field]: value },
    })),

  resetData: () =>
    set({
      buses: null,
      selectedSeats: [],
      totalPrice: 0,
      customer: { name: "", phoneNumber: "", email: "" },
    }),
}));
