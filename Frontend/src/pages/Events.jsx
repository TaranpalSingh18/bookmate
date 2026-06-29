import React, { useEffect, useState } from "react";
import { get_all_events } from "../api/event";
import EventCard from "../components/EventCard";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load events from the backend when this page first shows
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
        alert(`Booking for: ${event.event_name}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10">
            <div className="mx-auto max-w-6xl">
                <header className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                            Upcoming events
                        </h1>
                        <p className="mt-2 text-sm md:text-base text-gray-400 max-w-xl">
                            Browse all live and upcoming events. Pick one and
                            book your spot in the line with LineMate.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span>
                            {events.length > 0
                                ? `${events.length} event${
                                      events.length > 1 ? "s" : ""
                                  } available`
                                : "No events available"}
                        </span>
                    </div>
                </header>

                {isLoading && (
                    <p className="text-gray-300 text-sm">
                        Loading events...
                    </p>
                )}

                {error && !isLoading && (
                    <p className="text-sm text-red-400">{error}</p>
                )}

                {!isLoading && !error && events.length === 0 && (
                    <p className="text-sm text-gray-400">
                        There are no events yet. Please check back later.
                    </p>
                )}

                {!isLoading && !error && events.length > 0 && (
                    <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <EventCard
                                key={event.id || event._id || event.event_name}
                                event={event}
                                onBook={handleBook}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;