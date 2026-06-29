import api from "./axios";

export const make_booking = (data) => {
  // data: { user_id, event_id, seats_required }
  return api.post("/booking/make", data);
};

export const get_user_bookings = (userId) => {
  return api.get(`/booking/${userId}/all`);
};

export const cancel_booking = (bookingId) => {
  return api.delete(`/booking/${bookingId}`);
};

