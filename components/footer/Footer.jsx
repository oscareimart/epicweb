import React, { useState, useEffect } from 'react'
import Copyright from './Copyright'
import Sponsors from './Sponsors'
import Information from './Information'
import Navbar from './Navbar'
import { web_data } from './../../settings/lang_data'

const Footer = (props) => {
    const { dataCompany } = props
    const [dataFooter, setDataFooter] = useState({})

    useEffect(() => {
        let isSubscribed = true

        const getDataLanguaje = () => {
            try {
                const languaje = localStorage.getItem("lan_w")
                if (languaje) {
                    setDataFooter({
                        data: web_data[languaje].footer
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isSubscribed) {
            getDataLanguaje()
        }

        return () => {
            isSubscribed = false
        }
    }, []);
    return (
        <>
            <Sponsors />
            <Information
                dataCompany={dataCompany}
                langData={dataFooter}
            />
            <Navbar
                dataCompany={dataCompany}
            />
            <Copyright
                dataCompany={dataCompany}
            />
        </>
    )
}

export default Footer