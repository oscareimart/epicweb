import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Image from 'next/image'

import * as consult from './../../services/ConsultServices'
import { env_values } from './../../settings/env'

const RecommendedTours = (props) => {
    const [dataTours, setDataTours] = useState([])
    const [loadDataTours, setLoadDataTours] = useState(true)

    useEffect(() => {
        let isSubscribed = true

        const getDataTours = async () => {
            let arrayTemp = []
            for (let i = 0; i < 2; i++) {
                let numberRandom = Math.floor(Math.random() * 50)
                let foundTour = false
                while (!foundTour) {
                    // console.log(numberRandom)
                    try {
                        const res = await consult.getSingleData('tourss', numberRandom)
                        // console.log(res)
                        if (res.status === 200) {
                            // setDataTours(res.data?.data)
                            arrayTemp.push(res.data?.data)
                            foundTour = true
                        }
                    } catch (error) {
                        // console.log(error)
                        foundTour = false
                        numberRandom = Math.floor(Math.random() * 50)
                    }
                }
            }
            // console.log(arrayTemp)
            setDataTours(arrayTemp)
            setLoadDataTours(false)
        }

        if (isSubscribed) {
            setLoadDataTours(true)
            getDataTours()
        }
    }, [])

    return (
        <>
            <div className="container">
                <div className="row tour_suggest justify-content-center">
                    <div className="col-md-4 col-sm-5 col-8 mb-3">
                        <Link href={`/detail_tour/${dataTours[0]?.id}`} className="card tour_suggest_card">
                            <div className="tour_suggest_card_img">
                                {
                                    dataTours[0]?.attributes?.imagenes?.data[0]?.attributes?.url && <Image
                                        src={`${env_values.URL_BACKEND}${dataTours[0]?.attributes?.imagenes?.data[0]?.attributes?.url}`}
                                        className="card-img-top"
                                        alt={dataTours[0]?.attributes?.imagenes?.data[0]?.attributes?.alternativeText}
                                        layout='fill'
                                        priority={false}
                                    />
                                }
                            </div>
                            <div className="card-body">
                                <h4>
                                    {dataTours[0]?.attributes?.nombre || ""}
                                </h4>
                                <p className="card-text">
                                    {dataTours[0]?.attributes?.nombre || ""}
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4 col-sm-2"></div>
                    <div className="col-md-4 col-sm-5 col-8 mb-3">
                        <Link href={`/detail_tour/${dataTours[1]?.id}`} className="card tour_suggest_card">
                            <div className="tour_suggest_card_img">
                                {
                                    dataTours[1]?.attributes?.imagenes?.data[0]?.attributes?.url && <Image
                                        src={`${env_values.URL_BACKEND}${dataTours[1]?.attributes?.imagenes?.data[0]?.attributes?.url}`}
                                        className="card-img-top"
                                        alt={dataTours[1]?.attributes?.imagenes?.data[0]?.attributes?.alternativeText}
                                        layout='fill'
                                        priority={false}
                                    />
                                }
                            </div>
                            <div className="card-body">
                                <h4>
                                    {dataTours[1]?.attributes?.nombre || ""}
                                </h4>
                                <p className="card-text">
                                    {dataTours[1]?.attributes?.nombre || ""}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendedTours