import React, { useState, useEffect } from 'react'
import Banner from './../components/tours/Banner'

import OurHistory from './../components/knowUs/OurHistory'
import OurTeam from './../components/knowUs/OurTeam'

const KnowUs = (props) => {
    const { dataCompany } = props

    return (
        <>
            <div>
                <Banner
                    dataCompany={{ state: dataCompany }}
                />
                <OurHistory />
                <span name="team_us" id="team_us" />
                <OurTeam />
            </div>
        </>
    )
}

export default KnowUs