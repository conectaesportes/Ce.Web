/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { format, addDays, addMinutes, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "../Components/Header";
import Foto from "./components/Foto";
import "./Agendamento.scss";
import { useTimeSelection } from "../../hooks/useTimeSelection";
import ModalError from "../Components/ModalError";
import { getAvailability } from "../../services/arenas";

const Agendamento = () => {
    const location = useLocation();
    const quadra = location.state.quadra;
    const today = new Date();
    const [selectedDay, setSelectedDay] = useState(today);
    const [availableTimes, setAvailableTimes] = useState([]);
    const days = Array.from({ length: 15 }, (_, i) => addDays(today, i));
    const [times, setTimes] = useState([
    ]);

    // useEffect(() => {
    //     setSelectedDay(today);
    // }, [today]);
    //const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    

    useEffect(() => {
        async function load() {
            const numberDay = selectedDay.getDay();
            const data = await getAvailability(quadra.id, numberDay);
            setAvailableTimes(data);

            const slots = [];
            data.forEach((timeSlot) => {
                // Validação: verificar se starttime e endtime existem
                //console.log(timeSlot);
                if (!timeSlot.start_time || !timeSlot.end_time) {
                    console.warn("TimeSlot inválido:", timeSlot);
                    return;
                }

                const start = parse(timeSlot.start_time, "HH:mm:ss", new Date());
                const end = parse(timeSlot.end_time, "HH:mm:ss", new Date());
                let cursor = start;

                // safety: ignore invalid ranges
                if (!(start < end)) return;

                while (cursor < end) {
                    const intervalStart = cursor;
                    const intervalEnd = addMinutes(intervalStart, 60);

                    // don't create an interval that starts at/after the end
                    if (intervalStart >= end) break;

                    const startStr = format(intervalStart, "HH:mm");
                    const endStr = format(intervalEnd > end ? end : intervalEnd, "HH:mm");

                    slots.push({
                        start: startStr,
                        end: endStr,
                        price_per_hour: timeSlot.price_per_hour,
                        isAvailable: true,
                    });

                    cursor = intervalEnd;
                }
            });
            console.log("Slots disponíveis:", slots);
            setTimes(slots);
        }
        load();
    }, [selectedDay]);

    const { selectedTimes, handleSelectTime, error, setError, totalPrice, setTotalPrice, setSelectedTimes } =
        useTimeSelection(times);

    const handleDayClick = (day) => {
        setSelectedDay(day);

        console.log(selectedDay === day);
        console.log(day);
        console.log(selectedDay);
        // Fetch available times for the selected day
        // This is just a placeholder, replace with actual data fetching logic
        setAvailableTimes(times);
        setSelectedTimes([]); // Limpa os horários selecionados ao mudar o dia  
        setTotalPrice(0);
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

    return (
        <div className="container-agendamento page">
            <Header></Header>
            <div className="header">
                <Foto link={quadra.image_url}></Foto>
                <div className="container-info">
                    <h3 className="title">{quadra.name}</h3>
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
                                <div className="horario-text">
                                    {time.start + " às " + time.end}
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
                            Intervalo: {firstTime.start} -{" "}
                            {lastTime.end}
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
