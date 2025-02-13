/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { format, addDays } from "date-fns";
import Header from "../Components/Header";
import "./Agendamento.scss";

const Agendamento = (props) => {
    const today = new Date();
    const { slug, id } = useParams();
    const [selectedDay, setSelectedDay] = useState(today);
    const [availableTimes, setAvailableTimes] = useState([]);
    const days = Array.from({ length: 15 }, (_, i) =>
        format(addDays(today, i), "dd/MM")
    );

    useState(() => {
        setSelectedDay(format(today, "yyyy-MM-dd"));
    }, []);
    //const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleDayClick = (day) => {
        setSelectedDay(day);
        // Fetch available times for the selected day
        // This is just a placeholder, replace with actual data fetching logic
        setAvailableTimes(["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"]);
    };

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300; // Distância do scroll
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="container-agendamento page">
            <Header></Header>
            <h1>Agendamento Area {slug + id}</h1>

            <h2>Select a day:</h2>
            <div className="seletor-data">
                <button
                    className="arrow-button btn-left"
                    onClick={() => scroll("left")}
                >
                    left
                </button>
                <div className="dias" ref={scrollRef}>
                    {days.map((day) => (
                        <button
                            className="dia"
                            key={day}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                <button
                    className="arrow-button btn-right"
                    onClick={() => scroll("right")}
                >
                    right
                </button>
            </div>

            <div>
                <h2>Available times for {selectedDay}:</h2>

                <ul>
                    {availableTimes.map((time) => (
                        <li key={time}>{time}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Agendamento;
