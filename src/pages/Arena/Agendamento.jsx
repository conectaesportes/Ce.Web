/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "../Components/Header";
import "./Agendamento.scss";
import "./Modal.scss";
import { useTimeSelection } from "../../hooks/useTimeSelection";

const Agendamento = () => {
    const location = useLocation();
    const quadra = location.state.quadra;
    const today = new Date();
    const [selectedDay, setSelectedDay] = useState(today);
    const [availableTimes, setAvailableTimes] = useState([]);
    const days = Array.from({ length: 15 }, (_, i) => addDays(today, i));

    // useEffect(() => {
    //     setSelectedDay(today);
    // }, [today]);
    //const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const times = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
    ];
    const { selectedTimes, handleSelectTime, error, setError } =
        useTimeSelection(times);

    const handleDayClick = (day) => {
        setSelectedDay(day);

        console.log(selectedDay === day);
        console.log(day);
        console.log(selectedDay);
        // Fetch available times for the selected day
        // This is just a placeholder, replace with actual data fetching logic
        setAvailableTimes(times);
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
            <div className="header">
                <div className="container-logo">
                    <img src={quadra.imgLink}></img>
                </div>
                <div className="container-info">
                    <h3 className="title">{quadra.nome}</h3>
                    <p></p>
                </div>
            </div>

            <div className="main-content">
                <h3>Escolha dia e horário:</h3>
                <div className="seletor-data">
                    <button
                        className="arrow-button btn-left"
                        onClick={() => scroll("left")}
                    >
                        <i
                            className="fa fa-chevron-left"
                            aria-hidden="true"
                        ></i>
                    </button>
                    <div className="dias" ref={scrollRef}>
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => handleDayClick(day)}
                                className={`dia ${
                                    format(selectedDay, "dd/MM") ===
                                    format(day, "dd/MM")
                                        ? "selected"
                                        : ""
                                }`}
                            >
                                {format(day, "EE", { locale: ptBR })
                                    .slice(0, 3)
                                    .toLocaleUpperCase()}{" "}
                                <br />
                                {format(day, "dd/MM")}
                            </button>
                        ))}
                    </div>

                    <button
                        className="arrow-button btn-right"
                        onClick={() => scroll("right")}
                    >
                        <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>

                <div>
                    <h3>
                        Horários livres em {format(selectedDay, "dd/MM/yyyy")}:
                    </h3>

                    <div className="container-horarios">
                        {times.map((time, index) => (
                            <div
                                key={index}
                                className={
                                    "horario" +
                                    (selectedTimes.includes(time)
                                        ? " selected"
                                        : "")
                                }
                                onClick={() => {
                                    handleSelectTime(time);
                                }}
                            >
                                <i
                                    className="fa fa-check-circle"
                                    aria-hidden="true"
                                ></i>
                                <div className="horario-text">{time}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal de Erro */}
                {error && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p>{error}</p>
                            <button
                                className="close-button"
                                onClick={() => setError("")} // Fecha o modal
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Agendamento;
