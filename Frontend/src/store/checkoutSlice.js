import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventId: null,
  selectedSeats: [], // { id, row, number, type, price }
  allowedSelections: [], // NEW
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setEvent(state, action) {
      // switching events should clear any old selection
      if (state.eventId !== action.payload) {
        state.eventId = action.payload;
        state.selectedSeats = [];
      }
    },
    setAllowedSelections(state, action) {
        state.allowedSelections = action.payload;
    },
    toggleSeat(state, action) {
      const seat = action.payload;
      const index = state.selectedSeats.findIndex((s) => s.id === seat.id);
      if (index >= 0) {
        state.selectedSeats.splice(index, 1);
      } else {
        state.selectedSeats.push(seat);
      }
    },
    clearSelection(state) {
      state.selectedSeats = [];
    },
  },
});

export const { setEvent, toggleSeat, clearSelection, setAllowedSelections } = checkoutSlice.actions;
export default checkoutSlice.reducer;