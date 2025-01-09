import React from "react";
import "./FilterBar.scss"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";



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

    const [openPrice, setOpenPrice] = React.useState(false);
    const [openDistance, setOpenDistance] = React.useState(false);
    const [openRelevance, setOpenRelevance] = React.useState(false);


    function handleOpen(setOpen) {
        setOpen(true);
    };
    function handleClose(setOpen) {
        setOpen(false);
    };
    return (
        <div className="bar">
            <text>Filtrar por:</text>
            {/* <FontAwesomeIcon icon={faFilter} className="icon"></FontAwesomeIcon> */}
            <button className="buttonBar" onClick={()=>{handleOpen(setOpenPrice)}}>Preço</button>
            <button className="buttonBar" onClick={()=>{handleOpen(setOpenDistance)}}>Distância</button>
            <button className="buttonBar" onClick={()=>{handleOpen(setOpenRelevance)}}>Relevância</button>
            <Modal
                open={openPrice}
                onClose={()=>{handleClose(setOpenPrice)}}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="parent-modal-title">Preço</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </Box>
            </Modal>
            <Modal
                open={openDistance}
                onClose={()=>{handleClose(setOpenDistance)}}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="parent-modal-title">Distância</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </Box>
            </Modal>
            <Modal
                open={openRelevance}
                onClose={()=>{handleClose(setOpenRelevance)}}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="parent-modal-title">Relevância</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </Box>
            </Modal>
        </div>
    )
}

export default FilterBar;