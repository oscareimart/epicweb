import React, { useState, useEffect } from 'react'

const TourMap = () => {
    return (
        <>
            <div className="container">
                {/* se puede volver un componente
                pero se necesita que la url del mapa sea dinamica y no estatica */}
                <div className="row mt-5">
                    <div className="col-md-12">
                        <iframe
                            src="https://www.google.com/maps/d/embed?mid=1H2qIBohSuq6cIU8PI1GZyjHlezJyGVg&ehbc=2E312F"
                            width="95%"
                            height="500px"
                            className='mx-auto'
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default TourMap