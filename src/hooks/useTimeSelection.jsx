import { se } from "date-fns/locale";
import { useState } from "react";

export function useTimeSelection(times) {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);


  const handleSelectTime = (time) => {
    if (selectedTimes.length === 0) {
      setSelectedTimes([time]);
      setTotalPrice(time.price_per_hour);
      return;
    }

    const sortedSelected = [...selectedTimes].sort(
      (a, b) => times.indexOf(a) - times.indexOf(b)
    );

    const firstTime = sortedSelected[0];
    const lastTime = sortedSelected[sortedSelected.length - 1];

    if (selectedTimes.includes(time)) {
      // Remove um horário se for o primeiro ou o último do intervalo
      if (time === firstTime || time === lastTime) {
        setSelectedTimes(selectedTimes.filter((t) => t !== time));
        setTotalPrice(totalPrice - time.price_per_hour);
      }
    } else {
      // Só permite adicionar horários adjacentes ao intervalo
      const index = times.indexOf(time);
     // Verifica se o horário não é consecutivo
     if (
        index !== times.indexOf(firstTime) - 1 &&
        index !== times.indexOf(lastTime) + 1
      ) { 
        setError("Você só pode selecionar horários consecutivos!");
        console.log("Você só pode selecionar horários consecutivos!");
        return;

      }

      setSelectedTimes([...selectedTimes, time]);
      setTotalPrice(totalPrice + time.price_per_hour);
    }
  };

  return { selectedTimes, handleSelectTime,error, setError, totalPrice, setTotalPrice,setSelectedTimes };
}
