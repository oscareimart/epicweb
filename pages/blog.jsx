import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Image from 'next/image'
import Pagination from '@mui/material/Pagination';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ExampleImg from './../public/images/example.jpg'
import * as consult from './../services/ConsultServices'
import LoadingDiv from './../components/loading/LoadingDiv'
import { env_values } from './../settings/env'
import { web_data } from './../settings/lang_data'
import moment from 'moment'
import 'moment/locale/es'

const theme = createTheme({
    palette: {
        primary: {
            main: red[600]
        }
    }
})

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [dataBlogs, setDataBlogs] = useState({})
    const [dataLang, setDataLang] = useState({})
    const [loadDataBlogs, setLoadDataBlogs] = useState(true)

    const onChangePaginate = (e, page) => {
        if (page) setCurrentPage(page)
    }

    useEffect(() => {
        let isSubscribed = true

        const getDataBlogs = async () => {
            const languaje = localStorage.getItem("lan_w")
            setDataLang({
                data: web_data[languaje].blog
            })
            await getDataListBlogs()
            setLoadDataBlogs(false)
        }

        if (isSubscribed) {
            const languaje = localStorage.getItem('lan_w')
            moment.locale(languaje)
            setLoadDataBlogs(true)
            getDataBlogs()
        }

        return () => {
            isSubscribed = false
        }
    }, [])

    useEffect(() => {
        let isSubscribed = true
        const getListBlogsPage = async () => {
            await getDataListBlogs()
            setLoadDataBlogs(false)
        }

        if (isSubscribed) {
            setLoadDataBlogs(true)
            getListBlogsPage()
        }

        return () => {
            isSubscribed = false
        }
    }, [currentPage]);

    const getDataListBlogs = async () => {
        try {
            const res = await consult.getAllData('blogs', {
                paginate: {
                    page: currentPage,
                    pageSize: 9
                }
            })
            if (res.status === 200) {
                setDataBlogs(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const dateTransform = (dateRow) => {
        const strDate = moment(dateRow).fromNow()
        return strDate
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className='container'>
                    <div className="row blog_container">
                        <div className="col-md-8">
                            {
                                loadDataBlogs ? <div className='mt-5'>
                                    <LoadingDiv />
                                </div> : <>
                                    {
                                        dataBlogs.data?.length > 0 ? <>
                                            {
                                                dataBlogs.data?.map((row, i) => (
                                                    <div className="card blog_card" key={i}>
                                                        <div className="row g-0">
                                                            <div className="col-md-4 blog_card_img">
                                                                <Image
                                                                    src={`${env_values.URL_BACKEND}${row.attributes?.imagen?.data?.attributes?.url}`}
                                                                    alt="image example"
                                                                    fill
                                                                />
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="card-body blog_card_body">
                                                                    <Link href={`/entry/${row.id}`}>
                                                                        <h5 className="card-title">{row.attributes?.titulo || ""}</h5>
                                                                    </Link>
                                                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: row.attributes?.descripcion }}></p>
                                                                    <p className="card-text"><small className="text-muted">{dataLang.data?.last_updated} {dateTransform(row.attributes?.updatedAt)}</small></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </> : <div className='mt-5'>
                                            <label className='fs-3'>No se encontraron blogs.</label>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row my-5">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center">
                            <Pagination
                                count={dataBlogs.meta?.pagination?.pageCount || 10}
                                page={currentPage}
                                defaultPage={1}
                                color="primary"
                                size="large"
                                onChange={(e, page) => onChangePaginate(e, page)}
                            />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

export default Blog