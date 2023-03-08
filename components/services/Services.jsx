import { useState, useEffect } from 'react'
import * as consult from './../../services/ConsultServices'
import { web_data } from './../../settings/lang_data'

import FirstModal from './ServicesFirstModal'
import SecondModal from './ServicesSecondModal'

const Services = (props) => {
    const [dataServices, setDataServices] = useState({})
    const [loadDataServices, setLoadDataServices] = useState(true)

    const [firstModal, setFirstModal] = useState(false)
    const [secondModal, setSecondModal] = useState(false)
    const [modalType, setModalType] = useState(0)
    const [modalTitle, setModalTitle] = useState("")

    useEffect(() => {
        let isSubscribed = true
        const getDataServices = async () => {
            try {
                const res = await consult.getAllData('servicioss')
                const languaje = localStorage.getItem("lan_w")
                if (res.status === 200) {
                    setDataServices({
                        data: web_data[languaje].services,
                        services: res.data.data
                    })
                }
            } catch (error) {
                console.log(error)
            }
            setLoadDataServices(false)
        }
        if (isSubscribed) {
            setLoadDataServices(true)
            getDataServices()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    return (
        <>
            <div className="container mt-5">
                {
                    !loadDataServices && <>
                        <h3 className='fs-1 text-center text-uppercase text-black fw-bolder'>{dataServices.data?.title || ""}</h3>
                        <div className="row mt-5">
                            {
                                dataServices.services?.map((row, i) => (
                                    <div
                                        key={i}
                                        className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-3"
                                    >
                                        <div className='card-services' role="button" onClick={() => {
                                            if (i === 0) {
                                                setFirstModal(!firstModal)
                                                setModalTitle(dataServices?.data?.request_tour)
                                            }
                                            if (i === 1 || i === 2) {
                                                setSecondModal(!secondModal)
                                                setModalType(i)
                                                setModalTitle(i === 1 ? dataServices?.data?.request_ticket : i === 2 ? dataServices?.data?.request_insurance : "")
                                            }
                                        }}>
                                            <div>
                                                <i className={`fa fa-${row.attributes.icono} fa-3x mb-4 d-flex justify-content-center`}></i>
                                                <h4 className='text-center'>{row.attributes?.nombre}</h4>
                                            </div>
                                            <p className='text-center'>{row.attributes?.detalle}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }
            </div>
            <FirstModal
                modal={firstModal}
                modalFunc={() => setFirstModal(!firstModal)}
                modalTitle={modalTitle}
            />
            <SecondModal
                modal={secondModal}
                modalFunc={() => setSecondModal(!secondModal)}
                typeModal={modalType}
                modalTitle={modalTitle}
            />
        </>
    )
}

export default Services