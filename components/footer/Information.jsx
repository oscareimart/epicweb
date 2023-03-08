import React, { useState, useEffect } from 'react'
import { env_values } from './../../settings/env'
import Image from 'next/image'
import Link from "next/link"

import * as consult from './../../services/ConsultServices'
import moment from 'moment'
import 'moment/locale/es'

const Information = (props) => {
    const { dataCompany, langData } = props
    const [dataPosts, setDataPosts] = useState([])
    const [loadDataPosts, setLoadDataPosts] = useState(true)

    useEffect(() => {
        let isSubscribed = true
        const getDataPosts = async () => {
            try {
                const res = await consult.getAllData('blogs', {
                    paginate: {
                        page: 1,
                        pageSize: 3
                    }
                })
                if (res.status === 200) {
                    setDataPosts(res.data?.data)
                }
            } catch (error) {
                console.log(error.response)
            }
            setLoadDataPosts(false)
        }

        if (isSubscribed) {
            const languaje = localStorage.getItem('lan_w')
            moment.locale(languaje)
            setLoadDataPosts(true)
            getDataPosts()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    const getFormatDate = (dateRow) => {
        let dateStr = ""
        if (dateRow) {
            dateStr = moment(dateRow).format("MMMM D, YYYY")
        }
        return dateStr
    }

    return (
        <>
            <div className="informaton_footer">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                            <h5
                                className="text-white pt-5 pb-3 text-center text-uppercase"
                            >
                                {langData.data?.company || ""}
                            </h5>
                            <p className="pt-2 text-white informaton_footer_description">
                                {dataCompany.state?.descripcion}
                            </p>
                            <br />
                            <p className="text-white informaton_footer_data">
                                <i className="fa-solid fa-location-dot"></i>&nbsp;
                                {dataCompany.state?.direccion || ""}
                            </p>
                            <p className="text-white informaton_footer_data">
                                <i className="fa-solid fa-phone"></i>&nbsp;
                                {langData.data?.phone || ""} (Bolivia) : {dataCompany.state?.codigo_pais || 0} {dataCompany.state?.telefono || "00000000"}
                            </p>
                            <p className="text-white informaton_footer_data">
                                <i className="fa-solid fa-envelope"></i>&nbsp;
                                {langData.data?.email || ""} : {dataCompany.state?.correo || ""}
                            </p>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 informaton_footer_links">-
                            <h5
                                className="text-white pt-4 pb-3 text-center text-uppercase"
                            >
                                {langData.data?.general_links || ""}
                            </h5>
                            <ul className="p-0 ms-3">
                                <li>
                                    <Link
                                        href="/privacy_policy"
                                        className="text-decoration-none"
                                    >
                                        {langData.data?.privacy_policy || ""}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms_conditions"
                                        className="text-decoration-none"
                                    >
                                        {langData.data?.Terms_conditions || ""}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/frequently_ask_questions"
                                        className="text-decoration-none"
                                    >
                                        {langData.data?.frequently_ask_questions || ""}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <h5
                                className="text-white pt-5 pb-3 text-center text-uppercase"
                            >
                                {langData.data?.latest_posts || ""}
                            </h5>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12 informaton_footer_posts">
                                    {
                                        !loadDataPosts && <>
                                            {dataPosts?.map((row, i) => (
                                                <p className="text-white" key={i}>
                                                    <Link href={`/entry/${row.id}`}>{row.attributes?.titulo || ""}</Link>
                                                    <span>{getFormatDate(row.attributes?.publishedAt)}</span>
                                                </p>
                                            ))}
                                        </>
                                    }
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <Link
                                        href="/"
                                    >
                                        <Image
                                            src="https://epicbolivia.travel/images/logo.png"
                                            alt="Information_logo"
                                            className="rounded mx-auto d-block"
                                            width={350}
                                            height={220}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Information