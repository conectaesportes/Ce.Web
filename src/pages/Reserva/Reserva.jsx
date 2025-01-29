import React, { useState } from 'react';

const Reserva = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const availableTimes = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Reserva feita para o dia ${selectedDate} às ${selectedTime}`);
    };

    return (
        <div>
            <div className="quadra-header">
                <img src="link-to-quadra-image.jpg" alt="Quadra" className="quadra-image" />
                <div className="quadra-info">
                    <h2>Nome da Quadra</h2>
                    <p>Endereço: Rua Exemplo, 123</p>
                    <p>Telefone: (11) 1234-5678</p>
                </div>
            </div>
            <h1>Reserva de Quadras</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Escolha o dia:</label>
                    <input type="date" value={selectedDate} onChange={handleDateChange} required />
                </div>
                <div>
                    <label>Escolha o horário:</label>
                    <select value={selectedTime} onChange={handleTimeChange} required>
                        <option value="" disabled>Selecione um horário</option>
                        {availableTimes.map((time) => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Reservar</button>
            </form>
        </div>
    );
};

export default Reserva;