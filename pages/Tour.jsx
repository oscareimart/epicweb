import { useState, useEffect } from 'react'
import Banner from './../components/tours/Banner'
import FilterTours from './../components/tours/FilterTours'
import ResponseTours from './../components/tours/ResponseTours'

const Tour = (props) => {
    const { dataCompany } = props
    const [dataFilter, setDataFilter] = useState({
        modality: "",
        country: "",
        duration: "",
        category: ""
    })
    const [filterResponse, setFilterResponse] = useState([])
    const [loadFilterResponse, setLoadFilterResponse] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <>
            <div className="">
                <Banner
                    dataCompany={{ state: dataCompany }}
                />
                <FilterTours
                    dataFilter={{ state: dataFilter, func: (dat) => setDataFilter(dat) }}
                    filterResponse={{ state: filterResponse, func: (dat) => setFilterResponse(dat) }}
                    loadFilterResponse={{ state: loadFilterResponse, func: (dat => setLoadFilterResponse(dat)) }}
                    currentPage={{ state: currentPage, func: (dat) => setCurrentPage(dat) }}
                />
                <div className="container py-3">
                    <hr />
                </div>
                <ResponseTours
                    filterResponse={{ state: filterResponse, func: (dat) => setFilterResponse(dat) }}
                    loadFilterResponse={{ state: loadFilterResponse }}
                    currentPage={{ state: currentPage, func: (dat) => setCurrentPage(dat) }}
                />
            </div>
        </>
    )
}

export default Tour