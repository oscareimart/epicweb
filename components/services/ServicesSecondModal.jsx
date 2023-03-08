import React, { useState, useEffect, useRef } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import { web_data } from './../../settings/lang_data'
import { env_values } from './../../settings/env'
import ReCAPTCHA from "react-google-recaptcha";

import * as consult from './../../services/ConsultServices'
import countries from './../../services/countries.json'
import Select from 'react-select'

const SecondModal = (props) => {
    const { modal, modalFunc, modalTitle, typeModal } = props
    const recaptchaRef = useRef(null)
    const [dataSecondModal, setDataSecondModal] = useState({})
    const [dataForm, setDataForm] = useState({
        fullname: "",
        email: "",
        document: "",
        check_in: "",
        check_out: "",
        arrival_place: "",
        departure_place: "",
        adults: "",
        child: "",
        infant: ""
    })

    const [selectCountries, setSelectCountries] = useState([])
    const [loadSelectCountries, setLoadSelectCountries] = useState(true)

    const [cleanSelect, setCleanSelect] = useState({})

    useEffect(() => {
        let isSubscribed = true
        const initSecondModal = () => {
            const languaje = localStorage.getItem("lan_w")
            if (languaje) {
                setDataSecondModal({
                    data: web_data[languaje].services
                })
            }
        }

        const getDataCountries = async () => {
            const arrayTemp = await countries.data?.map((row) => {
                return {
                    label: row.name,
                    value: row.name
                }
            })
            setSelectCountries(arrayTemp)
            setLoadSelectCountries(false)
        }

        if (isSubscribed) {
            setLoadSelectCountries(true)
            initSecondModal()
            getDataCountries()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    const onChange = ({ name, value }) => {
        setDataForm({ ...dataForm, [name]: value })
    }

    const onChangeSelect = (value, name) => {
        setCleanSelect({ ...cleanSelect, [name]: value })
        if (value) {
            onChange({ name: name, value: value.value })
        } else {
            onChange({ name: name, value: "" })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        if (captchaToken) {
            if (dataForm.fullname && dataForm.email && dataForm.document &&
                dataForm.check_in && dataForm.check_out && dataForm.arrival_place &&
                dataForm.departure_place) {
                let urlSend = ""
                if (typeModal === 1) urlSend = "solicitudes-boletos-aereoss"
                if (typeModal === 2) urlSend = "solicitudes-seguros-de-viajes"
                let jsonSend = {
                    nombre_completo: dataForm.fullname,
                    correo: dataForm.email,
                    documento: dataForm.document,
                    fecha_inicio: dataForm.check_in,
                    fecha_fin: dataForm.check_out,
                    lugar_llegada: dataForm.arrival_place,
                    lugar_salida: dataForm.departure_place,
                    adultos: dataForm.adults || null,
                    ninos: dataForm.child || null,
                    infantes: dataForm.infant || null
                }
                try {
                    const res = await consult.sendData(urlSend, jsonSend, captchaToken)
                    if (res.status === 200) {
                        cancel()
                    }
                } catch (error) {
                    console.log(error.response)
                }
            }
        } else {
            console.log("No se pudo enviar el formulario, error de captcha.")
        }
    }

    const cancel = () => {
        recaptchaRef.current.reset();
        setCleanSelect({
            arrival_place: "",
            departure_place: ""
        })
        setDataForm({
            fullname: "",
            email: "",
            document: "",
            check_in: "",
            check_out: "",
            arrival_place: "",
            departure_place: "",
            adults: "",
            child: "",
            infant: ""
        })
        modalFunc()
    }

    return (
        <>
            <Modal isOpen={modal} backdrop="static" toggle={cancel} size="xl">
                <ModalHeader toggle={cancel}>{modalTitle || ""}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="row mb-4">
                                    <div className="col-md-6 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.fullname?.label || ""}</label>
                                        <input
                                            type="text"
                                            name='fullname'
                                            placeholder={dataSecondModal.data?.fullname?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.fullname}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.email?.label || ""}</label>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder={dataSecondModal.data?.email?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.email}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.document?.label || ""}</label>
                                        <input
                                            type="text"
                                            name='document'
                                            placeholder={dataSecondModal.data?.document?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.document}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.check_in?.label || ""}</label>
                                        <input
                                            type="date"
                                            name='check_in'
                                            placeholder={dataSecondModal.data?.check_in?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.check_in}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.check_out?.label || ""}</label>
                                        <input
                                            type="date"
                                            name='check_out'
                                            placeholder={dataSecondModal.data?.check_out?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.check_out}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.arrival_place?.label || ""}</label>
                                        <Select
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused ? 'gray' : '#CED4DA',
                                                    borderWidth: "0 0 2px 0",
                                                    outline: "none",
                                                    boxShadow: "none",
                                                }),
                                                input: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused ? 'gray' : '#CED4DA',
                                                    borderWidth: "0 0 2px 0",
                                                    outline: "none",
                                                    boxShadow: "none",
                                                })
                                            }}
                                            className="basic-single"
                                            isSearchable={true}
                                            isClearable={true}
                                            isLoading={loadSelectCountries}
                                            value={cleanSelect?.arrival_place}
                                            onChange={(data) => onChangeSelect(data, "arrival_place")}
                                            options={selectCountries}
                                            placeholder={dataSecondModal.data?.arrival_place?.placeholder}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.departure_place?.label || ""}</label>
                                        <Select
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused ? 'gray' : '#CED4DA',
                                                    borderWidth: "0 0 2px 0",
                                                    outline: "none",
                                                    boxShadow: "none",
                                                }),
                                                input: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused ? 'gray' : '#CED4DA',
                                                    borderWidth: "0 0 2px 0",
                                                    outline: "none",
                                                    boxShadow: "none",
                                                })
                                            }}
                                            className="basic-single"
                                            isSearchable={true}
                                            isClearable={true}
                                            isLoading={loadSelectCountries}
                                            value={cleanSelect?.departure_place}
                                            onChange={(data) => onChangeSelect(data, "departure_place")}
                                            options={selectCountries}
                                            placeholder={dataSecondModal.data?.departure_place?.placeholder}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.adults?.label || ""}</label>
                                        <input
                                            type="number"
                                            name='adults'
                                            placeholder={dataSecondModal.data?.adults?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.adults}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.child?.label || ""}</label>
                                        <input
                                            type="number"
                                            name='child'
                                            placeholder={dataSecondModal.data?.child?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.child}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className='mb-2'>{dataSecondModal.data?.infant?.label || ""}</label>
                                        <input
                                            type="number"
                                            name='infant'
                                            placeholder={dataSecondModal.data?.infant?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.infant}
                                        />
                                    </div>
                                </div>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={env_values.KEY_SITE}
                                    size="invisible"
                                />
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <button
                                            type='submit'
                                            className='btn btn-danger py-2 px-3 float-end'
                                        >
                                            {dataSecondModal.data?.btn_submit}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default SecondModal