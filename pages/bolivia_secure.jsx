import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import * as consult from './../services/ConsultServices'
import LoadingDiv from './../components/loading/LoadingDiv'
import { env_values } from './../settings/env'
import RecommendedTours from './../components/tours/RecommendedTours'

const BoliviaSecure = (props) => {
    const [dataEntry, setDataEntry] = useState({})
    const [loadDataEntry, setLoadDataEntry] = useState(true)
    const [blogContent, setBlogContent] = useState("")

    useEffect(() => {
        let isSubscribed = true

        const getDataEntry = async () => {
            try {
                const res = await consult.getAllData("bolivia-secure")
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
            setLoadDataEntry(true)
            getDataEntry()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    return (
        <>
            <div className="container pt-5 entry_blog">
                <div className="row my-4">
                    <div className="col-md-12 mt-5 mb-3">
                        {
                            loadDataEntry ? <div style={{ marginTop: "10%", marginBottom: "10%" }}><LoadingDiv /> </div> : <>
                                <h2 className='fs-1'>{dataEntry.attributes?.titulo || "S/N"}</h2>
                                <div className='entry_blog_es_img'>
                                    {
                                        dataEntry.attributes?.imagen?.data && <Image
                                            src={`${env_values.URL_BACKEND}${dataEntry.attributes?.imagen?.data?.attributes?.url}`}
                                            alt={dataEntry.attributes?.imagen?.data?.attributes?.alternativeText}
                                            fill
                                        />
                                    }
                                </div>
                                <div className='mt-5 mb-5' dangerouslySetInnerHTML={{ __html: blogContent }} />
                            </>
                        }
                    </div>
                </div>
            </div>
            <RecommendedTours />
        </>
    )
}

export default BoliviaSecure