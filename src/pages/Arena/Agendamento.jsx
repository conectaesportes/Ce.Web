/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { format, addDays, addMinutes , parse} from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "../Components/Header";
import Foto from "./components/Foto";
import "./Agendamento.scss";
import { useTimeSelection } from "../../hooks/useTimeSelection";
import ModalError from "../Components/ModalError";

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

    // Obtendo o intervalo e calculando o preço
    const firstTime = selectedTimes[0];
    const lastTime = selectedTimes[selectedTimes.length - 1];
    const pricePerHour = 50; // Defina o valor por hora
    const totalPrice = selectedTimes.length * pricePerHour;

    return (
        <div className="container-agendamento page">
            <Header></Header>
            <div className="header">
                <Foto link={quadra.imgLink}></Foto>
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
                        {times.slice(0, -1).map((time, index) => (
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
                                <div className="horario-text">
                                    {time + " às " + times[index + 1]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ModalError message={error} onClose={() => setError("")} />

                {/* Div Botton que aparece quando há horários selecionados */}
                {selectedTimes.length > 0 && (
                    <div className="bottom-up">
                        <p className="text-lg font-bold">
                            Intervalo: {firstTime} - {format(addMinutes(parse(lastTime, "HH:mm", new Date()),60), 'HH:mm')}
                        </p>
                        <p className="text-md">
                            Total: R$ {totalPrice.toFixed(2)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Agendamento;
