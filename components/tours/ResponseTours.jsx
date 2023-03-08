import { useState, useEffect } from 'react'
import Link from "next/link";
import Image from 'next/image'
import { web_data } from './../../settings/lang_data'
import { env_values } from './../../settings/env'
import LoadingDiv from './../loading/LoadingDiv'
import Pagination from '@mui/material/Pagination';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: red[600]
        }
    }
})

const ResponseTours = (props) => {
    const { filterResponse, loadFilterResponse, currentPage } = props
    const [dataLabelsTour, setDataLabelsTour] = useState({})

    useEffect(() => {
        let isSubscribed = true

        const getLabelsTour = () => {
            const languaje = localStorage.getItem("lan_w")
            if (languaje) {
                setDataLabelsTour({
                    data: web_data[languaje].tours
                })
            }
        }

        if (isSubscribed) {
            getLabelsTour()
        }
        return () => {
            isSubscribed = false
        }
    }, [])

    const onChangePaginate = (e, page) => {
        if (page) currentPage.func(page)
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="container">
                {
                    loadFilterResponse.state ? <LoadingDiv /> : <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            {
                                filterResponse.state?.data?.length > 0 ? <>
                                    <div className="row">
                                        {
                                            filterResponse.state?.data?.map((row, i) => (
                                                <div key={i} className="col-md-4 my-2">
                                                    <Link href={`/detail_tour/${row.id}`} className="card tour_card">
                                                        <div className="tour_card_img">
                                                            <Image
                                                                src={`${env_values.URL_BACKEND}${row.attributes?.imagenes?.data[0]?.attributes?.url}`}
                                                                className="card-img-top"
                                                                alt={row.attributes?.imagenes?.data[0]?.attributes?.alternativeText}
                                                                layout='fill'
                                                                priority={false}
                                                            />
                                                        </div>
                                                        <div className="card-body">
                                                            <h4>{row.attributes?.nombre}</h4>
                                                            <p className="card-text">{row.attributes?.nombre}</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="row my-5">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center">
                                            <Pagination
                                                count={filterResponse?.state?.meta?.pagination?.pageCount || 10}
                                                page={filterResponse?.state?.meta?.pagination?.page || 1}
                                                defaultPage={1}
                                                color="primary"
                                                size="large"
                                                onChange={(e, page) => onChangePaginate(e, page)}
                                            />
                                        </div>
                                    </div>
                                </>
                                    : <h4 className='p-4'>{dataLabelsTour.data?.msg_void}</h4>
                            }
                        </div>
                    </div>
                }
            </div>
        </ThemeProvider>
    )
}

export default ResponseTours