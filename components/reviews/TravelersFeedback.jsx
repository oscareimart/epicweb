import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import { web_data } from './../../settings/lang_data'
import * as consult from './../../services/ConsultServices'

const TravelersFeedback = (props) => {
    const [dataFeedBack, setDataFeedBack] = useState([])
    const [loadDataFeedBack, setLoadDataFeedBack] = useState(true)

    useEffect(() => {
        let isSubscribed = true
        const getDataFeedBack = async (props) => {
            try {
                const res = await consult.getAllData('testimonioss')
                const languaje = localStorage.getItem("lan_w")
                if (res.status === 200 && languaje) {
                    setDataFeedBack({
                        data: web_data[languaje].travelers_feedback,
                        feedback: res.data?.data
                    })
                }
            } catch (error) {
                console.log(error)
            }
            setLoadDataFeedBack(false)
        }

        if (isSubscribed) {
            setLoadDataFeedBack(true)
            getDataFeedBack()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    return (
        <>
            <div className="container mt-5">
                <h3
                    className='fs-1 text-center text-uppercase text-black fw-bolder'>
                    {dataFeedBack?.data?.title || ""}
                </h3>
                <div className="row">
                    {
                        !loadDataFeedBack && <div className="col-md-12">
                            {
                                dataFeedBack?.feedback?.length > 0 ? <Swiper
                                    navigation={true}
                                    modules={[Autoplay, Navigation]}
                                    className="feedback_travelers"
                                    loop={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                >
                                    {
                                        dataFeedBack?.feedback?.map((row, i) => (
                                            <SwiperSlide key={i}>
                                                <div className="row feedback_comment">
                                                    <h3>{row.attributes?.nombre || ""}</h3>
                                                    <p>{row.attributes?.comentario || ""}</p>
                                                    <div>
                                                        <a
                                                            className='btn btn-danger feedback_comment_btn'
                                                            href={row.attributes?.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <i className='fa-brands fa-facebook-f'></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper> : <label className='fs-3'>{dataFeedBack?.data?.msg_void || ""}</label>
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default TravelersFeedback