import React, { useState, useEffect } from 'react'

const WhatsappMessage = (props) => {
    const { dataCompany } = props
    return (
        <>
            <a
                href={`https://wa.me/${dataCompany?.state?.telefono}?text=Más informacion de los Tours, Por favor.`}
                className='whatsapp_float_container'
                role="button"
                target="_blank"
                rel="noopener noreferrer"
                title='Whatsapp-Contacto'
            >
                <i className="fa-brands fa-whatsapp text-light"></i>
            </a>
        </>
    )
}

export default WhatsappMessage