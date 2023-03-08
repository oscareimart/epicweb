import React, { useState, useEffect } from 'react'
import TravelersFeedback from "./../components/reviews/TravelersFeedback"

const TravelersReviews = () => {
    return (
        <>
            <div className="container pt-5">
                <div className="row pt-5">
                    <div className="col-md-12">
                        <TravelersFeedback />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TravelersReviews