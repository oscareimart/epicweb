import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Banner from './../../components/tours/Banner'
import MainData from './../../components/tours/detail/MainData'
import ItineraryData from './../../components/tours/detail/ItineraryData'
import TourMap from './../../components/tours/detail/TourMap'
import RecommendedTours from './../../components/tours/RecommendedTours'
import * as consult from './../../services/ConsultServices'
import { web_data } from './../../settings/lang_data'

const DetailTour = (props) => {
    const { dataCompany } = props
    const { query } = useRouter();
    const [dataTour, setDataTour] = useState({})
    const [dataLang, setDataLang] = useState({})
    const [loadDataTour, setLoadDataTour] = useState(true)

    useEffect(() => {
        let isSubscribed = true
        const getDataTour = async () => {
            try {
                const res = await consult.getSingleData("tourss", query.id, { populate: "deep,4" })
                // console.log(res)
                const languaje = localStorage.getItem("lan_w")
                if (languaje) {
                    setDataLang({
                        data: web_data[languaje].detail_tour
                    })
                }
                if (res.status === 200) {
                    setDataTour(res.data?.data)
                }
            } catch (error) {
                console.log(error)
            }
            setLoadDataTour(false)
        }
        if (isSubscribed) {
            setLoadDataTour(true)
            getDataTour()
        }
        return () => {
            isSubscribed = false
        }
    }, [query.id]);

    return (
        <>
            <div>
                <Banner
                    dataCompany={{ state: dataCompany }}
                />
                {
                    !loadDataTour && <>
                        <MainData
                            dataTour={{ state: dataTour, func: (dat) => setDataTour(dat) }}
                        />
                        <ItineraryData
                            dataTour={{ state: dataTour, func: (dat) => setDataTour(dat) }}
                            dataCompany={dataCompany}
                            langData={dataLang}
                        />
                        {/* <TourMap /> */}
                        <RecommendedTours />
                    </>
                }
            </div>
        </>
    )
}

export default DetailTour