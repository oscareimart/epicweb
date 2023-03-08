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
import Select from 'react-select'

const FirstModal = (props) => {
    const { modal, modalFunc, modalTitle } = props
    const recaptchaRef = useRef(null)
    const [dataFirstModal, setDataFirstModal] = useState({})
    const [dataForm, setDataForm] = useState({
        fullname: "",
        email: "",
        number_people: "",
        tour: ""
    })

    const [selectTours, setSelectTours] = useState([])
    const [loadSelectTours, setLoadSelectTours] = useState(true)

    const [cleanSelect, setCleanSelect] = useState({})

    useEffect(() => {
        let isSubscribed = true
        const initFirstModal = () => {
            const languaje = localStorage.getItem("lan_w")
            if (languaje) {
                setDataFirstModal({
                    data: web_data[languaje].services
                })
            }
        }

        const getDataTours = async () => {
            try {
                const res = await consult.getAllData('Tourss', {
                    paginate: {
                        page: 1,
                        pageSize: 50
                    }
                }) // consultar sin paginacion
                if (res.status === 200) {
                    const arrayTemp = await res.data?.data?.map((row) => {
                        return {
                            value: row.id,
                            label: row.attributes?.nombre
                        }
                    })
                    setSelectTours(arrayTemp)
                }
            } catch (error) {
                console.log(error)
            }
            setLoadSelectTours(false)
        }

        if (isSubscribed) {
            setLoadSelectTours(true)
            initFirstModal()
            getDataTours()
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
            if (dataForm.email && dataForm.fullname && dataForm.number_people && dataForm.tour) {
                let jsonSend = {
                    nombre_completo: dataForm.fullname,
                    correo: dataForm.email,
                    personas: dataForm.number_people,
                    tour: dataForm.tour
                }
                try {
                    const res = await consult.sendData("solicitudes-de-tourss", jsonSend, captchaToken)
                    if (res.status === 200) {
                        cancel()
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("complete el formulario")
            }
        } else {
            console.log("No se pudo enviar el formulario, error de captcha.")
        }
    }

    const cancel = () => {
        recaptchaRef.current.reset();
        setCleanSelect({
            tour: ""
        })
        setDataForm({
            fullname: "",
            email: "",
            number_people: "",
            tour: ""
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
                                        <label className='mb-2'>{dataFirstModal.data?.fullname?.label || ""}</label>
                                        <input
                                            type="text"
                                            name='fullname'
                                            placeholder={dataFirstModal.data?.fullname?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.fullname}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className='mb-2'>{dataFirstModal.data?.email?.label || ""}</label>
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder={dataFirstModal.data?.email?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.email}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className='mb-2'>{dataFirstModal.data?.number_people?.label || ""}</label>
                                        <input
                                            type="number"
                                            name='number_people'
                                            placeholder={dataFirstModal.data?.number_people?.placeholder || ""}
                                            className='form-control input-services-custom'
                                            onChange={(e) => onChange(e.target)}
                                            value={dataForm.number_people}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className='mb-2'>{dataFirstModal.data?.tour?.label || ""}</label>
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
                                            className="basic-single input-services-custom"
                                            isSearchable={true}
                                            isClearable={true}
                                            isLoading={loadSelectTours}
                                            value={cleanSelect?.tour}
                                            onChange={(data) => onChangeSelect(data, "tour")}
                                            options={selectTours}
                                            placeholder={dataFirstModal.data?.tour?.placeholder}
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
                                            {dataFirstModal.data?.btn_submit}
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

export default FirstModal