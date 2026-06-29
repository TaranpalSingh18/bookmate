import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCardHero from "../components/EventCardHero";
import { get_all_events } from "../api/event";

const Hero = () => {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await get_all_events();
        setEventData(res.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  if (!eventData.length) {
    return null;
  }

  const handleBookFromHero = (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: { pathname: "/events" } } });
      return;
    }
    navigate("/events");
  };

  const duplicatedEvents = [...eventData, ...eventData];

  return (
    <section className="mt-20">
      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-300/80">
              Featured events
            </p>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Discover what's live on Bookmate
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 max-w-xs">
            A live-updating strip of events gliding by. Hover any card to pause the carousel,
            see more detail, and jump into the booking flow.
          </p>
        </div>

        {/* Carousel */}
        <div className="hero-carousel">
          <div className="hero-carousel-track">
            {duplicatedEvents.map((event, index) => (
              <div
                key={`${event.event_id || index}-${index}`}
                className="hero-carousel-card"
              >
                <EventCardHero event={event} onBook={handleBookFromHero} />
              </div>
            ))}
          </div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030712] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030712] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;