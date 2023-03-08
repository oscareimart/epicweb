import React, { useState, useEffect } from 'react'

const ContactMap = (props) => {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5424.540068641916!2d-68.1386882422077!3d-16.49724850388762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f219704ad66b1%3A0x7fb5b581c431e89e!2sEPIC%20TRAVEL!5e1!3m2!1ses!2sbo!4v1656799674393!5m2!1ses!2sbo"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactMap