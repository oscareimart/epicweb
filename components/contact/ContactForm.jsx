import React, { useState, useEffect, useRef } from 'react'
import { web_data } from './../../settings/lang_data'
import { env_values } from './../../settings/env'
import ReCAPTCHA from "react-google-recaptcha";

import * as consult from './../../services/ConsultServices'

const ContactForm = () => {
    const recaptchaRef = useRef(null)
    const [dataFormContact, setDataFormContact] = useState({})
    const [dataContact, setDataContact] = useState({
        fullname: "",
        email: "",
        phone: "",
        message: ""
    })

    useEffect(() => {
        let isSubscribed = true

        const getInitContact = async () => {
            try {
                const languaje = localStorage.getItem("lan_w")
                if (languaje) {
                    setDataFormContact({
                        data: web_data[languaje].contact
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isSubscribed) {
            getInitContact()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    const onChange = ({ name, value }) => {
        setDataContact({ ...dataContact, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        if (captchaToken) {
            if (dataContact.fullname && dataContact.email && dataContact.phone && dataContact.message) {
                let jsonSend = {
                    nombre: dataContact.fullname,
                    correo: dataContact.email,
                    telefono: dataContact.phone,
                    mensaje: dataContact.message
                }
                try {
                    const res = await consult.sendData('consultass', jsonSend, captchaToken)
                    if (res.status === 200) {
                        cancel()
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("Rellene los campos")
            }
        } else {
            console.log("No se pudo enviar el formulario, error de captcha.")
        }
    }

    const cancel = () => {
        setDataContact({
            fullname: "",
            email: "",
            phone: "",
            message: ""
        })
    }

    return (
        <>
            <div className="container mt-5">
                <h3
                    className='fs-1 text-center text-uppercase text-black fw-bolder'>
                    {dataFormContact.data?.title || ""}
                </h3>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="row mt-5">
                        <div className="col-md-4 my-1">
                            <input
                                type="text"
                                name="fullname"
                                className='form-control input-custom'
                                placeholder={dataFormContact.data?.fullname}
                                onChange={(e) => onChange(e.target)}
                                value={dataContact.fullname}
                                required
                            />
                        </div>
                        <div className="col-md-4 my-1">
                            <input
                                type="email"
                                name="email"
                                className='form-control input-custom'
                                placeholder={dataFormContact.data?.email}
                                onChange={(e) => onChange(e.target)}
                                value={dataContact.email}
                                required
                            />
                        </div>
                        <div className="col-md-4 my-1">
                            <input
                                type="number"
                                name="phone"
                                className='form-control input-custom'
                                placeholder={dataFormContact.data?.phone}
                                onChange={(e) => onChange(e.target)}
                                value={dataContact.phone}
                                required
                            />
                        </div>
                        <div className="col-md-12 my-1">
                            <textarea
                                name="message"
                                className='form-control textarea-custom'
                                rows="3"
                                placeholder={dataFormContact.data?.message}
                                onChange={(e) => onChange(e.target)}
                                value={dataContact.message}
                                required
                            />
                        </div>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={env_values.KEY_SITE}
                            size="invisible"
                        />
                        <div className="col-md-12 my-3 d-flex justify-content-center">
                            <button
                                type='submit'
                                className='btn btn-danger px-5 py-2'
                            >
                                {dataFormContact.data?.btn_submit}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactForm