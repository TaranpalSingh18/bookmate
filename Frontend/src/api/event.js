import api from "./axios";

export const get_all_events = () => {
    return api.get("/event/all")
}

export const get_single_event = (eventID) =>{
    return api.get(`/event/${eventID}`)
}

export const post_event_details = (event_payload) => {
    return api.post("/event/create", event_payload)
}