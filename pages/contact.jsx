import React, { useState, useEffect } from 'react'
import Banner from './../components/tours/Banner'
import ContactForm from './../components/contact/ContactForm'
import ContactAddress from './../components/contact/ContactAddress'
import ContactMap from './../components/contact/ContactMap'
import { web_data } from './../settings/lang_data'

const Contact = (props) => {
    const { dataCompany } = props
    const [dataLang, setDataLang] = useState({})

    useEffect(() => {
        let isSubscribed = true

        const getDataLang = () => {
            try {
                const languaje = localStorage.getItem("lan_w")
                if (languaje) {
                    setDataLang({
                        data: web_data[languaje].contact_data
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isSubscribed) {
            getDataLang()
        }

        return () => {
            isSubscribed = true
        }
    }, []);
    return (
        <>
            <Banner />
            <ContactForm />
            <ContactAddress
                dataCompany={dataCompany}
                langData={dataLang}
            />
            <ContactMap />
        </>
    )
}

export default Contact