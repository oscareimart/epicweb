import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from "next/router";

import * as consult from './../../services/ConsultServices'

import moment from 'moment'
import 'moment/locale/es'

import LoadingDiv from './../../components/loading/LoadingDiv'
import { env_values } from './../../settings/env'
import { web_data } from './../../settings/lang_data'

import RecommendedTours from './../../components/tours/RecommendedTours'

const Entry = (props) => {
    const { query } = useRouter();
    const [dataEntry, setDataEntry] = useState({})
    const [dataLang, setDataLang] = useState({})
    const [loadDataEntry, setLoadDataEntry] = useState(true)
    const [blogContent, setBlogContent] = useState("")

    useEffect(() => {
        let isSubscribed = true

        const getDataEntry = async () => {
            try {
                const res = await consult.getSingleData('blogs', query.title)
                const languaje = localStorage.getItem("lan_w")
                if (languaje) {
                    setDataLang({
                        data: web_data[languaje].entry
                    })
                }
                if (res.status === 200) {
                    setDataEntry(res.data?.data)
                    const regex = 'src="../../../..'
                    const strContent = res.data?.data?.attributes?.texto?.replaceAll(regex, `src="${env_values.URL_BACKEND}`)
                    setBlogContent(strContent)
                }
            } catch (error) {
                console.log(error)
            }
            setLoadDataEntry(false)
        }

        if (isSubscribed) {
            const languaje = localStorage.getItem('lan_w')
            moment.locale(languaje)
            setLoadDataEntry(true)
            getDataEntry()
        }

        return () => {
            isSubscribed = false
        }
    }, [query.title]);

    const getPublishDate = (dateF) => {
        let dateStr = ''
        if (dateF) {
            dateStr = moment(dateF).format('DD MMMM, YYYY')
        }
        return dateStr
    }
    return (
        <>
            <div className="container pt-5 entry_blog">
                <div className="row mt-3">
                    <div className="col-md-9">
                        {
                            loadDataEntry ? <div style={{ marginTop: "10%", marginBottom: "10%" }}><LoadingDiv /> </div> : <>
                                <h2 className='pt-5 fs-2'>{dataEntry.attributes?.titulo || "S/N"}</h2>
                                <label className='text-muted'>{dataLang.data?.author}: {dataEntry?.attributes?.autor || "S/N"}</label>
                                <br />
                                <label className='text-muted'>{dataLang.data?.published}: {getPublishDate(dataEntry.attributes?.publishedAt)}</label>
                                <br />
                                <div className='mt-5 mb-5' dangerouslySetInnerHTML={{ __html: blogContent }} />
                            </>
                        }
                    </div>
                    <div className="col-md-3">
                        ads
                    </div>
                </div>
            </div>
            <RecommendedTours />
        </>
    )
}

export default Entry