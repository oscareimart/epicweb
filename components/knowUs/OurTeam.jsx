import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { env_values } from './../../settings/env'
import { web_data } from './../../settings/lang_data'
import * as consult from './../../services/ConsultServices'

import LoadingDiv from './../../components/loading/LoadingDiv'

const OurTeam = (props) => {
    const [dataTeam, setDataTeam] = useState({})
    const [loadDataTeam, setLoadDataTeam] = useState(true)

    useEffect(() => {
        let isSubscribed = true

        const getInitData = async () => {
            try {
                const res = await consult.getAllData('equipos')
                const languaje = localStorage.getItem("lan_w")
                if (res.status === 200 && languaje) {
                    setDataTeam({
                        data: web_data[languaje].teams,
                        team: res.data
                    })
                }
            } catch (error) {
                console.log(error)
            }
            setLoadDataTeam(false)
        }

        if (isSubscribed) {
            setLoadDataTeam(true)
            getInitData()
        }
        return () => {
            isSubscribed = false
        }
    }, [])

    return (
        <>
            <div className="container mt-5">
                {
                    loadDataTeam ? <div className='pt-5'><LoadingDiv /></div> : <>
                        <h3
                            className='fs-1 text-center text-uppercase text-black fw-bolder'>
                            {dataTeam.data?.title || ""}
                        </h3>
                        <div className="row justify-content-center mt-5">
                            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-12">
                                {
                                    dataTeam?.team?.data?.length ? <>
                                        {
                                            dataTeam?.team?.data?.map((row, i) => (
                                                <div className="card mb-3 team-card" key={i}>
                                                    <div className="row">
                                                        <div className={i % 2 === 0 ? "col-xl-3 col-lg-3 col-md-4 col-sm-5 col-5" : "col-xl-9 col-lg-9 col-md-8 col-sm-7 col-7"}>
                                                            {
                                                                i % 2 === 0 ?
                                                                    <div className='team-card-img'>
                                                                        <Image
                                                                            src={`${env_values.URL_BACKEND}${row.attributes?.foto?.data?.attributes?.url}`}
                                                                            alt={row.attributes?.foto?.data?.attributes?.alternativeText}
                                                                            layout='fill'
                                                                            priority={false}
                                                                        />
                                                                    </div> :
                                                                    <div className="card-body mt-3 text-sm-end">
                                                                        <h5 className="card-title">{row.attributes?.nombre || ""}</h5>
                                                                        <p className="card-text">{row.attributes?.descripcion || ""}</p>
                                                                        <div className='team-social-network'>
                                                                            {
                                                                                row.attributes?.facebook && <a
                                                                                    href={row.attributes?.facebook}
                                                                                    className="btn btn-danger mx-2"
                                                                                >
                                                                                    <i className={`${row.attributes?.icono_facebook}`}></i>
                                                                                </a>
                                                                            }
                                                                            {
                                                                                row.attributes?.instagram && <a
                                                                                    href={row.attributes?.instagram}
                                                                                    className="btn btn-danger mx-2"
                                                                                >
                                                                                    <i className={`${row.attributes?.icono_instagram}`}></i>
                                                                                </a>
                                                                            }
                                                                            {
                                                                                row.attributes?.tiktok && <a
                                                                                    href={row.attributes?.tiktok}
                                                                                    className="btn btn-danger mx-2"
                                                                                >
                                                                                    <i className={`${row.attributes?.icono_tiktok}`}></i>
                                                                                </a>
                                                                            }
                                                                            {
                                                                                row.attributes?.twitter && <a
                                                                                    href={row.attributes?.twitter}
                                                                                    className="btn btn-danger mx-2"
                                                                                >
                                                                                    <i className={`${row.attributes?.icono_twitter}`}></i>
                                                                                </a>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className={i % 2 === 0 ? "col-xl-9 col-lg-9 col-md-8 col-sm-7 col-7" : "col-xl-3 col-lg-3 col-md-4 col-sm-5 col-5"}>
                                                            {
                                                                i % 2 === 0 ?
                                                                    <div className="card-body mt-3 text-sm-start">
                                                                        <h5 className="card-title">{row.attributes?.nombre || ""}</h5>
                                                                        <p className="card-text">{row.attributes?.descripcion || ""}</p>
                                                                        <div className='team-social-network'>
                                                                            {
                                                                                row.attributes?.facebook && <a
                                                                                    href={row.attributes?.facebook}
                                                                                    className="btn btn-danger mx-2"
                                                                                >
                                                                                    <i className={`${row.attributes?.icono_facebook}`}></i>
                                                                                </a>
                                                                            }
                                                                            {
                                                                                row.attributes?.instagram && <a
                                                                                    href={row.attributes?.instagram}
                                                                                    className="btn btn-danger mx-2"
                                                                                >
                                                                                    <i className={`${row.attributes?.icono_instagram}`}></i>
                                                                                </a>
                                                                            }
                                                                            {
                                                                                row.attributes?.tiktok && <a
                                                                                    href={row.attributes?.tiktok}
                                                                                    className="btn btn-danger mx-2"
                                                                                >
                                                                                    <i className={`${row.attributes?.icono_tiktok}`}></i>
                                                                                </a>
                                                                            }
                                                                            {
                                                                                row.attributes?.twitter && <a
                                                                                    href={row.attributes?.twitter}
                                                                                    className="btn btn-danger mx-2"
                                                                                >
                                                                                    <i className={`${row.attributes?.icono_twitter}`}></i>
                                                                                </a>
                                                                            }
                                                                        </div>
                                                                    </div> : <div className='team-card-img'>
                                                                        <Image
                                                                            src={`${env_values.URL_BACKEND}${row.attributes?.foto?.data?.attributes?.url}`}
                                                                            alt={row.attributes?.foto?.data?.attributes?.alternativeText}
                                                                            layout='fill'
                                                                            priority={false}
                                                                        />
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </> : <div>
                                        <label className='fs-3'>No se encontraron registros</label>
                                    </div>
                                }

                                {/* <div className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">

                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default OurTeam