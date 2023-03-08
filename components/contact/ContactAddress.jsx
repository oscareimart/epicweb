import React, { useState, useEffect } from 'react'

const ContactAddress = (props) => {
    const { dataCompany, langData } = props
    return (
        <>
            <div className="container mt-5">
                <div className="row contact-address justify-content-center">
                    {
                        dataCompany?.direcciones?.data?.map((row, i) => (
                            <div className="col-md-4 text-center text-muted" key={i}>
                                <h4 className='text-dark'>{row.attributes?.nombre || "S/N"}:</h4>
                                <p style={{ lineHeight: "30px" }}>{row.attributes?.direccion || ""}</p>
                                <p>{langData.data?.phone} : {row.attributes?.telefono || "+000 00000000"}</p>
                                <p><span className='fs-bolder text-dark'>{langData.data?.email} :</span> <a
                                    href={`mailto:${row.attributes?.correo}`}
                                    className='text-danger'
                                >{row.attributes?.correo}</a></p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ContactAddress