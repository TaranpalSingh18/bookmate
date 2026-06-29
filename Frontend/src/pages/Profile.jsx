import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_user_bookings, cancel_booking } from "../api/booking";
import { get_all_events } from "../api/event";

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelError, setCancelError] = useState(null);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/login", { state: { from: { pathname: "/profile" } } });
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [bookingsRes, eventsRes] = await Promise.all([
          get_user_bookings(userId),
          get_all_events(),
        ]);
        setBookings(bookingsRes.data || []);
        setEvents(eventsRes.data || []);
      } catch (err) {
        console.error(err);
        setError("Could not load your bookings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const findEventForBooking = (booking) =>
    events.find((event) => event.event_id === booking.event_id);

  const openCancelModal = (booking) => {
    setCancelError(null);
    setBookingToCancel(booking);
  };

  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;
    try {
      setCancelError(null);
      setIsCancelling(true);
      await cancel_booking(bookingToCancel.booking_id);
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === bookingToCancel.booking_id
            ? { ...b, confirm_booking: false }
            : b
        )
      );
    } catch (err) {
      console.error(err);
      setCancelError(
        err.response?.data?.detail || "Could not cancel booking. Please try again."
      );
    } finally {
      setIsCancelling(false);
      setBookingToCancel(null);
    }
  };

  const closeCancelModal = () => {
    if (isCancelling) return;
    setBookingToCancel(null);
    setCancelError(null);
  };

  const confirmed = bookings.filter((b) => b.confirm_booking);
  const cancelled = bookings.filter((b) => !b.confirm_booking);

  return (
    <div className="min-h-screen bg-[#0a0c12] px-6 py-16">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-red-700/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">

        {/* Page header */}
        <div className="mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            Your account
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            My bookings
          </h1>
          <p className="text-[15px] text-slate-400 leading-relaxed max-w-md">
            Every event you've reserved a spot for, all in one place.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center gap-3 text-slate-400 text-sm py-12">
            <svg className="h-4 w-4 animate-spin text-red-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading your bookings…
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/8 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && bookings.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-white/[0.02] px-6 py-14 text-center space-y-3">
            <p className="text-2xl">🎟</p>
            <p className="text-sm font-medium text-slate-400">No bookings yet</p>
            <p className="text-xs text-slate-600">Head to Events to grab your first spot in line.</p>
            <button
              onClick={() => navigate("/events")}
              className="mt-2 inline-flex rounded-full bg-red-600 px-5 py-2 text-xs font-semibold text-white hover:bg-red-500 transition"
            >
              Browse events
            </button>
          </div>
        )}

        {/* Booking list */}
        {!isLoading && !error && bookings.length > 0 && (
          <div className="space-y-8">

            {/* Confirmed */}
            {confirmed.length > 0 && (
              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 px-1">
                  Confirmed · {confirmed.length}
                </p>
                <div className="space-y-3">
                  {confirmed.map((booking) => {
                    const event = findEventForBooking(booking);
                    return (
                      <BookingRow
                        key={booking.booking_id}
                        booking={booking}
                        event={event}
                        onCancel={() => openCancelModal(booking)}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {/* Cancelled */}
            {cancelled.length > 0 && (
              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 px-1">
                  Cancelled · {cancelled.length}
                </p>
                <div className="space-y-3 opacity-50">
                  {cancelled.map((booking) => {
                    const event = findEventForBooking(booking);
                    return (
                      <BookingRow
                        key={booking.booking_id}
                        booking={booking}
                        event={event}
                        onCancel={null}
                      />
                    );
                  })}
                </div>
              </section>
            )}

          </div>
        )}
      </div>

      {/* Cancel modal */}
      {bookingToCancel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && closeCancelModal()}
        >
          <div className="w-full max-w-md">
            <div className="rounded-[28px] p-[1px] bg-gradient-to-b from-slate-700/60 to-slate-800/20 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
              <div className="rounded-[27px] bg-slate-900/95 backdrop-blur-xl p-7 space-y-5">

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">Cancel booking?</h2>
                    <p className="mt-0.5 text-xs text-slate-500">This will free up your seats for others.</p>
                  </div>
                  <button
                    onClick={closeCancelModal}
                    disabled={isCancelling}
                    className="rounded-full p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="h-px bg-slate-800" />

                {(() => {
                  const event = findEventForBooking(bookingToCancel);
                  return (
                    <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/40 px-4 py-4 space-y-1.5">
                      <p className="font-semibold text-white">{event ? event.event_name : "Unknown event"}</p>
                      {event && <p className="text-xs text-slate-400">Venue: <span className="text-slate-300">{event.event_venue}</span></p>}
                      <p className="text-xs text-slate-400">Seats booked: <span className="text-slate-300">{bookingToCancel.seats_required}</span></p>
                    </div>
                  );
                })()}

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  You'll need to book again if you change your mind later.
                </p>

                {cancelError && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-2.5 text-xs text-red-300">
                    {cancelError}
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleConfirmCancel}
                    disabled={isCancelling}
                    className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-700/30 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] transition-all duration-150"
                  >
                    {isCancelling ? "Cancelling…" : "Yes, cancel"}
                  </button>
                  <button
                    onClick={closeCancelModal}
                    disabled={isCancelling}
                    className="flex-1 rounded-full border border-slate-700 bg-white/[0.03] py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[0.07] hover:border-slate-500 disabled:opacity-50 active:scale-[0.97] transition-all duration-150"
                  >
                    Keep it
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingRow = ({ booking, event, onCancel }) => (
  <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900 to-slate-900/60 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Top accent line */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

    <div className="space-y-2 min-w-0">
      <p className="text-sm font-semibold text-white truncate">
        {event ? event.event_name : "Unknown event"}
      </p>
      {event && (
        <p className="text-xs text-slate-500 truncate">{event.event_venue}</p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 border border-slate-700/40 px-3 py-1 text-[11px] text-slate-400">
          🎟 {booking.seats_required} {booking.seats_required === 1 ? "seat" : "seats"}
        </span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium border ${
          booking.confirm_booking
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
            : "bg-slate-800/60 border-slate-700/40 text-slate-500"
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${booking.confirm_booking ? "bg-emerald-400" : "bg-slate-600"}`} />
          {booking.confirm_booking ? "Confirmed" : "Cancelled"}
        </span>
      </div>
    </div>

    {onCancel && (
      <button
        onClick={onCancel}
        className="shrink-0 self-start sm:self-auto rounded-full border border-red-500/30 bg-red-500/8 px-4 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/15 hover:border-red-500/50 active:scale-[0.97] transition-all duration-150"
      >
        Cancel
      </button>
    )}
  </div>
);

export default Profile;