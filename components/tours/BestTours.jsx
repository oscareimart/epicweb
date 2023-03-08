import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from "next/link"
import * as consult from './../../services/ConsultServices'
import { web_data } from './../../settings/lang_data'
import { env_values } from './../../settings/env'

const BestTours = (props) => {
    const [dataBestTours, setDataBestTours] = useState({})
    const [loadDataBestTours, setLoadDataBestTours] = useState(true)

    useEffect(() => {
        let isSubscribed = true

        const getDataBestTours = async () => {
            try {
                const res = await consult.getAllData('tourss', {}, [{
                    name: "portada", value: true, type: 0
                }])
                const languaje = localStorage.getItem("lan_w")
                if (res.status === 200) {
                    setDataBestTours({
                        data: web_data[languaje].best_tours,
                        tours: res.data?.data
                    })
                }
            } catch (error) {
                console.log(error)
            }
            setLoadDataBestTours(false)
        }

        if (isSubscribed) {
            setLoadDataBestTours(true)
            getDataBestTours()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    return (
        <>
            <div className="container mt-5">
                <h3
                    className='fs-1 text-center text-uppercase text-black fw-bolder'
                >
                    {dataBestTours.data?.title || ""}
                </h3>
                <div className="row mt-5">
                    {
                        dataBestTours?.tours?.map((row, i) => (
                            <div key={i} className="col-md-12">
                                <div className="row mb-5">
                                    <div className={i % 2 === 0 ? "col-xl-6 col-lg-7 col-md-7 col-sm-12 col-7" :
                                        "col-xl-6 col-lg-5 col-md-5 col-sm-12 col-12"}>
                                        {i % 2 === 0 ?
                                            <Link
                                                href={`/detail_tour/${row.id}`}
                                                className="best_tours_img"
                                            >
                                                <img
                                                    src={`${env_values.URL_BACKEND}${row.attributes?.imagenes?.data[0]?.attributes?.url}`}
                                                    alt={`Imagen ${row.attributes?.nombre}`}
                                                />
                                            </Link> : <div className='p-4'>
                                                <h5 className='fs-2 fw-light text-md-start'>{row.attributes?.nombre || ""}</h5>
                                                <p className='text-md-start'>
                                                    {row.attributes?.descripcion}
                                                </p>
                                                <Link
                                                    href={`/detail_tour/${row.id}`}
                                                    className="btn btn-danger float-md-start"
                                                >
                                                    {dataBestTours.data?.btn_see_more}
                                                </Link>
                                            </div>}

                                    </div>
                                    <div className={i % 2 === 0 ? "col-xl-6 col-lg-5 col-md-5 col-sm-12 col-12" :
                                        "col-xl-6 col-lg-7 col-md-7 col-sm-12 col-12"}>
                                        {i % 2 === 0 ? <div className='p-4'>
                                            <h5 className='fs-2 fw-light text-md-end'>{row.attributes?.nombre || ""}</h5>
                                            <p className='text-md-end'>
                                                {row.attributes?.descripcion}
                                            </p>
                                            <Link
                                                href={`/detail_tour/${row.id}`}
                                                className="btn btn-danger float-md-end"
                                            >
                                                {dataBestTours.data?.btn_see_more}
                                            </Link>
                                        </div> : <Link
                                            href={`/detail_tour/${row.id}`}
                                            className="best_tours_img"
                                        >
                                            <img
                                                src={`${env_values.URL_BACKEND}${row.attributes?.imagenes?.data[0]?.attributes?.url}`}
                                                alt={`Imagen ${row.attributes?.nombre}`}
                                            />
                                        </Link>}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default BestTours