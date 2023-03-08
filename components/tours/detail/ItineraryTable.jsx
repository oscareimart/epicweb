import React, { useState, useEffect } from 'react'

const ItineraryTable = (props) => {
    const { rowData } = props
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead className="table-dark">
                        </thead>
                        <tbody>
                            <tr className='table-dark'>
                                <th className='px-3 text-uppercase border border-gray'>Required Time</th>
                                <th className='px-3 text-uppercase border border-gray'>Transport</th>
                                <th className='px-3 text-uppercase border border-gray'>Entry of the sites</th>
                            </tr>
                            <tr>
                                <td>{rowData.tiempo_requerido || '-'}</td>
                                <td>{rowData.transporte || '-'}</td>
                                <td>{rowData.entradas || '-'}</td>
                            </tr>
                            <tr className='table-dark'>
                                <th className='px-3 text-uppercase border border-gray'>Guia</th>
                                <th className='px-3 text-uppercase border border-gray'>Altitud of the journey</th>
                                <th className='px-3 text-uppercase border border-gray'>Best Moment of year</th>
                            </tr>
                            <tr>
                                <td>{rowData.guia || '-'}</td>
                                <td>{rowData.altitud_circuito || '-'}</td>
                                <td>{rowData.mejor_epoca_visita || '-'}</td>
                            </tr>
                            <tr className='table-dark'>
                                <th className='px-3 text-uppercase border border-gray'>Equipement</th>
                                <th className='px-3 text-uppercase border border-gray'>Meals</th>
                                <th className='px-3 text-uppercase border border-gray'>Hotel</th>
                            </tr>
                            <tr>
                                <td>{rowData.equipo || '-'}</td>
                                <td>{rowData.comida || '-'}</td>
                                <td>{rowData.hotel || '-'}</td>
                            </tr>
                            <tr className='table-dark'>
                                <th className='px-3 text-uppercase border border-gray'>Difficulty level</th>
                            </tr>
                            <tr>
                                <td>{rowData.nivel_dificultad || '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ItineraryTable