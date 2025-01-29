import React from "react";
import "./FilterBar.scss"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';




const FilterBar = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    //Controles para abrir e fechar modal
    const [openPrice, setOpenPrice] = React.useState(false);
    const [openDistance, setOpenDistance] = React.useState(false);
    const [openRelevance, setOpenRelevance] = React.useState(false);

    //Valores dos sliders
    const [priceValue, setPriceValue] = React.useState(100);
    const [distanceValue, setDistanceValue] = React.useState(5);
    const [selectedDateTime, setSelectedDateTime] = React.useState(new Date());


    function handleOpen(setOpen) {
        setOpen(true);
    };
    function handleClose(setOpen) {
        setOpen(false);
    };

    function handleChange(event, newValue) {
        if (event.target === undefined) {
            setSelectedDateTime(newValue)
        } else {
            const { name } = event.target;
            if (name == 'price') {
                setPriceValue(newValue);
            } else if (name == 'distance') {
                setDistanceValue(newValue)
            }
        }
        console.log(newValue);
    };

    return (
        <div className="bar">
            <p>Filtrar por:</p>
            {/* <FontAwesomeIcon icon={faFilter} className="icon"></FontAwesomeIcon> */}
            <button className="buttonBar" onClick={() => { handleOpen(setOpenPrice) }}>Preço</button>
            <button className="buttonBar" onClick={() => { handleOpen(setOpenDistance) }}>Distância</button>
            <button className="buttonBar" onClick={() => { handleOpen(setOpenRelevance) }}>Data e Hora</button>
            <Modal
                open={openPrice}
                onClose={() => { handleClose(setOpenPrice) }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="parent-modal-title">Preço</h2>
                    <Slider name="price" min={0} max={200} valueLabelFormat={(number) => { return `R$${number}` }} valueLabelDisplay="on" aria-label="Volume" value={priceValue} onChange={handleChange} />
                    <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        marginBottom={4}>

                        <Typography>
                            R$0
                        </Typography>
                        <Typography>
                            R$200
                        </Typography>
                    </Stack>
                    <Button variant="contained" color="success">
                        Filtrar
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openDistance}
                onClose={() => { handleClose(setOpenDistance) }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="parent-modal-title">Distância</h2>
                    <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                        marginBottom={4}
                    >
                        <Typography>
                            1km
                        </Typography>
                        <Slider name="distance" min={1} max={15} valueLabelFormat={(number) => { return `${number}km` }} valueLabelDisplay="on" value={distanceValue} onChange={handleChange} />
                        <Typography>
                            15km
                        </Typography>
                    </Stack>
                    <Button variant="contained" color="success">
                        Filtrar
                    </Button>

                </Box>
            </Modal>
            <Modal
                open={openRelevance}
                onClose={() => { handleClose(setOpenRelevance) }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="parent-modal-title">Data e Hora</h2>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <MobileDateTimePicker name="date" onChange={handleChange} defaultValue={dayjs(selectedDateTime)} />
                    </LocalizationProvider>
                    <Button sx={{ marginTop: '20px' }} variant="contained" color="success">
                        Filtrar
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default FilterBar;