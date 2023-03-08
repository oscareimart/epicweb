import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";

import { env_values } from './../../settings/env'
import { web_data } from './../../settings/lang_data'
import * as consult from './../../services/ConsultServices'

import { remark } from 'remark'
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide'
import remarkHtml from 'remark-html'

import MoreData from './MoreData'
import LoadingDiv from './../../components/loading/LoadingDiv'

const OurHistory = (props) => {
    const [dataUs, setDataUs] = useState({})
    const [loadDataUs, setLoadDataUs] = useState(true)
    const [modalMoreData, setModalMoreData] = useState(false)

    useEffect(() => {
        let isSubscribed = true

        const getDataUs = async () => {
            try {
                const res = await consult.getAllData('nosotros')
                const languaje = localStorage.getItem("lan_w")
                if (res.status === 200 && languaje) {
                    const str_short_html = await transformToHtml(res.data?.data?.attributes?.texto_corto)
                    const str_html = await transformToHtml(res.data?.data?.attributes?.texto)
                    res.data.data.attributes.texto_corto = str_short_html
                    res.data.data.attributes.texto = str_html
                    setDataUs({
                        data: web_data[languaje].our_history,
                        us: res.data?.data?.attributes
                    })
                }
            } catch (error) {
                console.log(error)
            }
            setLoadDataUs(false)
        }

        if (isSubscribed) {
            setLoadDataUs(true)
            getDataUs()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    const transformToHtml = async (str) => {
        let str_html = ''
        if (str) {
            str_html = await remark()
                .use(remarkPresetLintMarkdownStyleGuide)
                .use(remarkHtml)
                .process(str)
        }
        return str_html.value
    }

    return (
        <>
            {
                loadDataUs ? <div className='pt-5'><LoadingDiv /></div> : <>
                    <div className="container mt-5">
                        <h3
                            className='fs-1 text-center text-uppercase text-black fw-bolder'>
                            {dataUs.data?.title || ""}
                        </h3>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12">
                                <div className='mt-5'>
                                    <Swiper
                                        pagination={{
                                            clickable: true
                                        }}
                                        modules={[Pagination]}
                                        className="our_history_swiper"
                                        loop={true}
                                    >
                                        {
                                            dataUs.us?.imagenes?.data?.map((row, i) => (
                                                <SwiperSlide key={i}>
                                                    <Image
                                                        src={`${env_values.URL_BACKEND}${row.attributes?.url}`}
                                                        alt={row.attributes?.alternativeText}
                                                        layout='fill'
                                                        priority={false}
                                                    />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12 our-history-main">
                                <div className='our-history-desc' dangerouslySetInnerHTML={{ __html: dataUs.us?.texto_corto }} >
                                </div>
                                <button
                                    type='button'
                                    className='btn btn-danger our-history-btn py-2 px-3'
                                    onClick={() => setModalMoreData(!modalMoreData)}
                                >
                                    {dataUs.data?.see_more || ""}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
            <MoreData
                modal={modalMoreData}
                modalFunc={() => setModalMoreData(!modalMoreData)}
                modalData={dataUs}
            />
        </>
    )
}

export default OurHistory