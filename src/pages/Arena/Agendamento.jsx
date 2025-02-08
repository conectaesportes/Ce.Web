/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom';

const Agendamento = (props) => {

  const { slug, id } = useParams(); 
  return (
    <div>AgendamentoArea ${slug + id}</div>
  )
}

export default Agendamento;