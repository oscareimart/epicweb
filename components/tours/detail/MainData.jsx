import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { env_values } from './../../../settings/env'

const MainData = (props) => {
    const { dataTour } = props
    const [resumenTour, setResumenTour] = useState("")

    useEffect(() => {
        let isSubscribed = true
        const initMain = () => {
            if (dataTour) {
                const regex = 'src="../../../..'
                const strResumen = dataTour.state?.attributes?.resumen?.replaceAll(regex, `src="${env_values.URL_BACKEND}`)
                setResumenTour(strResumen)
            }
        }
        if (isSubscribed) {
            initMain()
        }
        return () => {
            isSubscribed = false
        }
    }, [])

    return (
        <>
            <div className="container mt-5 general_data_tour">
                <h3
                    className='fs-1 text-center text-uppercase text-black fw-bolder'>
                    {dataTour.state?.attributes?.nombre || ""}
                </h3>
                <p className='text-center general_data_tour_desc mt-5'>
                    {dataTour.state?.attributes?.descripcion || ""}
                </p>
                <div className="row mt-4">
                    {dataTour.state?.attributes?.imagenes?.data?.length > 0 && <>
                        {dataTour.state?.attributes?.imagenes?.data?.map((row, i) => (
                            <div
                                key={i}
                                className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 general_data_tour_img"
                            >
                                <Image
                                    src={`${env_values.URL_BACKEND}${row.attributes?.url}`}
                                    alt={row.attributes?.alternativeText}
                                    layout='fill'
                                    priority={false}
                                />
                            </div>
                        ))}
                    </>}
                </div>
                <div className="row mt-4">
                    <div className="col-md-12" dangerouslySetInnerHTML={{ __html: resumenTour }} />
                </div>
            </div>
        </>
    )
}

export default MainData