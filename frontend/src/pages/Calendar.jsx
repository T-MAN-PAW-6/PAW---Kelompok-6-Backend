import React, { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionGridPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useRef } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import useFetch from "../hooks/useFetch";

const Calendar = () => {
    const { tasks, dispatch, isPending, error, setLoading, setError } = useTasksContext();
    const [popup, setPopup] = useState(false);
    const url = "/api/tasks";

    const togglePopup = () => {
        setPopup(!popup);
    };

    useFetch({ url, dispatch, setError, setLoading, type: "GET_TASKS" });

    return (
        <div className="py-10 px-28 h-screen">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev next today",
                    center: "title",
                    right: "dayGridMonth timeGridWeek timeGridDay",
                }}
                height={700}
                contentHeight={700}
                events={tasks}
            />{" "}
        </div>
    );
};

export default Calendar;
