import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_all_events } from "../api/event";
import { make_booking } from "../api/booking";
import EventCard from "../components/EventCard";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [seats, setSeats] = useState(1);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingError, setBookingError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await get_all_events();
                setEvents(response.data || []);
            } catch (err) {
                console.error(err);
                setError("Could not load events. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleBook = (event) => {
        if (!event) return;
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { state: { from: { pathname: "/events" } } });
            return;
        }
        setSelectedEvent(event);
        setSeats(1);
        setBookingError(null);
    };

    const handleConfirmBooking = async () => {
        if (!selectedEvent) return;
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            setBookingError("User information missing. Please log in again.");
            navigate("/login", { state: { from: { pathname: "/events" } } });
            return;
        }
        try {
            setIsBooking(true);
            setBookingError(null);
            await make_booking({
                user_id: userId,
                event_id: selectedEvent.event_id,
                seats_required: Number(seats),
            });
            alert("Your booking is confirmed!");
            setSelectedEvent(null);
        } catch (err) {
            console.error(err);
            setBookingError(
                err.response?.data?.detail || "Could not complete booking. Please try again."
            );
        } finally {
            setIsBooking(false);
        }
    };

    const closeBookingCard = () => {
        setSelectedEvent(null);
        setSeats(1);
        setBookingError(null);
    };

    return (
        <div className="min-h-screen bg-[#0a0c12] px-6 py-16">

            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-red-700/8 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-6xl">

                {/* Header */}
                <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            Bookmate
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                            Upcoming events
                        </h1>
                        <p className="text-[15px] text-slate-400 max-w-md leading-relaxed">
                            Browse live and upcoming events. Pick one and book your spot in the queue.
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 self-start md:self-auto rounded-full border border-slate-700/60 bg-white/[0.03] px-4 py-2 text-xs text-slate-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {events.length > 0
                            ? `${events.length} event${events.length > 1 ? "s" : ""} available`
                            : "No events available"}
                    </div>
                </header>

                {/* States */}
                {isLoading && (
                    <div className="flex items-center gap-3 text-slate-400 text-sm py-12">
                        <svg className="h-4 w-4 animate-spin text-red-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Loading events…
                    </div>
                )}

                {error && !isLoading && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/8 px-5 py-4 text-sm text-red-300">
                        {error}
                    </div>
                )}

                {!isLoading && !error && events.length === 0 && (
                    <div className="rounded-2xl border border-slate-800 bg-white/[0.02] px-6 py-12 text-center text-sm text-slate-500">
                        No events yet — check back soon.
                    </div>
                )}

                {!isLoading && !error && events.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <EventCard
                                key={event.event_id || event.id || event._id}
                                event={event}
                                onBook={handleBook}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Booking modal */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
                    onClick={(e) => e.target === e.currentTarget && closeBookingCard()}
                >
                    <div className="w-full max-w-md">
                        {/* Gradient border wrapper */}
                        <div className="rounded-[28px] p-[1px] bg-gradient-to-b from-slate-700/60 to-slate-800/20 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
                            <div className="rounded-[27px] bg-slate-900/95 backdrop-blur-xl p-7 space-y-5">

                                {/* Modal header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-bold text-white tracking-tight">
                                            Confirm booking
                                        </h2>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            Review the details before confirming.
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeBookingCard}
                                        className="rounded-full p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-slate-800" />

                                {/* Event info */}
                                <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/40 px-4 py-4 space-y-1.5">
                                    <p className="font-semibold text-white">{selectedEvent.event_name}</p>
                                    <p className="text-xs text-slate-400">
                                        Venue: <span className="text-slate-300">{selectedEvent.event_venue}</span>
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Available seats: <span className="text-slate-300">{selectedEvent.available_seats}</span>
                                    </p>
                                </div>

                                {/* Seats input */}
                                <div className="space-y-1.5">
                                    <label htmlFor="seats" className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        Seats required
                                    </label>
                                    <input
                                        id="seats"
                                        type="number"
                                        min="1"
                                        value={seats}
                                        onChange={(e) => setSeats(e.target.value)}
                                        className="w-full rounded-xl bg-slate-800/60 border border-slate-700/60 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 transition"
                                    />
                                </div>

                                {/* Consent copy */}
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                    By clicking &quot;I give consent&quot; you confirm you want to book this event and agree to the venue&apos;s terms.
                                </p>

                                {/* Booking error */}
                                {bookingError && (
                                    <div className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-2.5 text-xs text-red-300">
                                        {bookingError}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3 pt-1">
                                    <button
                                        onClick={handleConfirmBooking}
                                        disabled={isBooking}
                                        className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-700/30 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] transition-all duration-150"
                                    >
                                        {isBooking ? "Booking…" : "I give consent"}
                                    </button>
                                    <button
                                        onClick={closeBookingCard}
                                        className="flex-1 rounded-full border border-slate-700 bg-white/[0.03] py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[0.07] hover:border-slate-500 active:scale-[0.97] transition-all duration-150"
                                    >
                                        Cancel
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

export default Events;