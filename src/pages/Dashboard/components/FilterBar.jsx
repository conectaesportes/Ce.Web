import React from "react";
import "./FilterBar.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const FilterBar = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20rem",
    padding: "3rem",
    bgcolor: "background.paper",
    border: "none",
    borderRadius: ".5rem",
    boxShadow: 24,
    "#parent-modal-title": {
      marginBottom: "3rem",
    },
    // pt: 2,
    // px: 4,
    // pb: 3,
  };

  //Controles para abrir e fechar modal
  const [openPrice, setOpenPrice] = React.useState(false);
  const [openDistance, setOpenDistance] = React.useState(false);
  const [openRelevance, setOpenRelevance] = React.useState(false);

  //Valores dos sliders
  const [priceValue, setPriceValue] = React.useState(100);
  const [distanceValue, setDistanceValue] = React.useState(5);
  const [selectedDateTime, setSelectedDateTime] = React.useState(new Date());

  const dateNow = dayjs(new Date());

  function handleOpen(setOpen) {
    setOpen(true);
  }
  function handleClose(setOpen) {
    setOpen(false);
  }

  function handleChange(event, newValue) {
    if (event.target === undefined) {
      setSelectedDateTime(newValue);
    } else {
      const { name } = event.target;
      if (name == "price") {
        setPriceValue(newValue);
      } else if (name == "distance") {
        setDistanceValue(newValue);
      }
    }
    console.log(newValue);
  }

  return (
    <div className="bar">
      <p>Filtrar por:</p>
      {/* <FontAwesomeIcon icon={faFilter} className="icon"></FontAwesomeIcon> */}
      <button
        className="buttonBar"
        onClick={() => {
          handleOpen(setOpenPrice);
        }}
      >
        Preço
      </button>
      <button
        className="buttonBar"
        onClick={() => {
          handleOpen(setOpenDistance);
        }}
      >
        Distância
      </button>
      <button
        className="buttonBar"
        onClick={() => {
          handleOpen(setOpenRelevance);
        }}
      >
        Data e Hora
      </button>
      <Modal
        open={openPrice}
        onClose={() => {
          handleClose(setOpenPrice);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">Preço</h2>
          <Slider
            name="price"
            min={0}
            max={200}
            valueLabelFormat={(number) => {
              return `R$${number}`;
            }}
            valueLabelDisplay="on"
            aria-label="Volume"
            value={priceValue}
            onChange={handleChange}
          />
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            marginBottom={4}
          >
            <Typography>R$0</Typography>
            <Typography>R$200</Typography>
          </Stack>
          <button className="button-green" style={{ width: "100%" }}>
            Filtrar
          </button>
        </Box>
      </Modal>
      <Modal
        open={openDistance}
        onClose={() => {
          handleClose(setOpenDistance);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">Distância</h2>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            marginBottom={4}
          >
            <Typography>1km</Typography>
            <Slider
              name="distance"
              min={1}
              max={15}
              valueLabelFormat={(number) => {
                return `${number}km`;
              }}
              valueLabelDisplay="on"
              value={distanceValue}
              onChange={handleChange}
            />
            <Typography>15km</Typography>
          </Stack>
          <button className="button-green" style={{ width: "100%" }}>
            Filtrar
          </button>
        </Box>
      </Modal>
      <Modal
        open={openRelevance}
        onClose={() => {
          handleClose(setOpenRelevance);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="parent-modal-title">Data e Hora</h2>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <MobileDateTimePicker
              name="date"
              minDate={dateNow}
              minTime={dateNow}
              format="DD/MM/YYYY HH:mm"
              label="Selecione dia e horário"
              minutesStep={30}
              onChange={handleChange}
              defaultValue={dayjs(selectedDateTime)}
            />
          </LocalizationProvider>
          <button
            className="button-green"
            style={{ width: "100%", marginTop: "2rem" }}
          >
            Filtrar
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default FilterBar;
