/* eslint-disable no-unused-vars */
import React from "react";
import arenas from "../../data/arenas";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams,
    useNavigate,
} from "react-router-dom";
import AreaCard from "./components/AreaCard";
import Header from "../../pages/Components/Header";
import { useEffect, useState } from "react";

import "./Arena.scss";
import Agendamento from "./Agendamento";

const Arena = () => {
    const { slug } = useParams(); // Recupera o slug da URL
    const navigate = useNavigate();
    const pageData = arenas.find((item) => item.slug === slug); // Busca dados com base no slug

    
    

    if (!pageData) {
        return <h1>Página não encontrada</h1>;
    };


    return (
        <div className="container-arena page">
            <Header></Header>
            <div className="header">
                <div className="container-logo">
                    <img src={pageData.logo}></img>
                </div>
                <div className="container-info">
                    <h3 className="title">{pageData.nome}</h3>
                    <p>
                        {pageData.endereco.rua}, {pageData.endereco.numero} -{" "}
                        {pageData.endereco.bairro}
                    </p>
                </div>
            </div>
            <div className="main-content">
                <h3>Quadras Livres</h3>

                <div className="list-areas">
                    {pageData.areasDeJogo.map((area) => {
                        return (
                                <AreaCard
                                    key={area.id}
                                    quadra={area}
                                    slug={slug}
                                ></AreaCard>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Arena;
