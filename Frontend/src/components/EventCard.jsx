import React from "react";

const EventCard = ({ event, onBook }) => {
    const eventDate = event?.event_date
        ? new Date(event.event_date)
        : null;

    const formattedDate = eventDate
        ? eventDate.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "TBA";

    const day = eventDate
        ? eventDate.toLocaleDateString(undefined, { day: "2-digit" })
        : "--";

    const month = eventDate
        ? eventDate.toLocaleDateString(undefined, { month: "short" })
        : "--";

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-[0_18px_50px_rgba(0,0,0,0.7)] hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-2">
            {/* Accent gradient border */}
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-red-500 via-amber-400 to-red-500 opacity-60" />

            <div className="p-5 md:p-6 flex flex-col gap-4">
                {/* Top row: date + venue */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center rounded-xl bg-slate-800 px-3 py-2 border border-slate-700">
                            <span className="text-xs uppercase tracking-wide text-amber-300">
                                {month}
                            </span>
                            <span className="text-lg font-semibold text-white leading-tight">
                                {day}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                {formattedDate}
                            </p>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-gray-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                {event?.event_venue || "Venue TBD"}
                            </p>
                        </div>
                    </div>

                    <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-gray-300">
                        {event?.event_type || "Featured event"}
                    </span>
                </div>

                {/* Title + description */}
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                        {event?.event_name || "Untitled Event"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                        {event?.event_description ||
                            "No description has been added for this event yet."}
                    </p>
                </div>

                {/* Meta info */}
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-300">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1">
                        <span className="text-red-400">●</span>
                        <span>
                            {event?.available_seats ?? "—"} seats available
                        </span>
                    </div>
                    {event?.duration && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1">
                            ⏱
                            <span>{event.duration}</span>
                        </div>
                    )}
                    {event?.category && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-3 py-1">
                            #<span>{event.category}</span>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <button
                    onClick={() => onBook && onBook(event)}
                    className="mt-4 w-full rounded-xl bg-gradient-to-r from-red-600 to-amber-500 py-2.5 md:py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-red-600/40 hover:shadow-red-500/50 hover:brightness-110 transition-all duration-200"
                >
                    Book now
                </button>
            </div>
        </div>
    );
};

export default EventCard;