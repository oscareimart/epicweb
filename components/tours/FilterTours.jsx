import { useState, useEffect } from 'react'
import { withRouter, useRouter } from 'next/router'
import { web_data } from './../../settings/lang_data'
import * as consult from './../../services/ConsultServices'

const FilterTours = (props) => {
    const routerPage = useRouter()
    const { dataFilter, filterResponse, loadFilterResponse, currentPage, router } = props
    const [dataFormFilter, setDataFormFilter] = useState({})
    const [collapseFilter, setCollapseFilter] = useState(false)

    const [selectModalities, setSelectModalities] = useState([]);
    const [selectCountries, setSelectCountries] = useState([])
    const [selectDurations, setSelectDurations] = useState([])
    const [selectCategories, setSelectCategories] = useState([])
    const [loadDataFormFilter, setLoadDataFormFilter] = useState(true)

    useEffect(() => {
        let isSubscribed = true

        const getDataFormFilter = () => {
            const languaje = localStorage.getItem("lan_w")
            if (languaje) {
                setDataFormFilter({
                    data: web_data[languaje].tours
                })
            }
            setLoadDataFormFilter(false)
        }

        const getDataModalities = async () => {
            try {
                const res = await consult.getAllData('modalidadess')
                if (res.status === 200) {
                    setSelectModalities(res.data?.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getDataCountries = async () => {
            try {
                const res = await consult.getAllData('paiss')
                if (res.status === 200) {
                    setSelectCountries(res.data?.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getDataDurations = async () => {
            try {
                const res = await consult.getAllData('duracioness')
                if (res.status === 200) {
                    setSelectDurations(res.data?.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getDataCategories = async () => {
            try {
                const res = await consult.getAllData('categorias')
                if (res.status === 200) {
                    setSelectCategories(res.data?.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getListTours = async () => {
            await getDataListTours()
            loadFilterResponse.func(false)
        }

        if (isSubscribed) {
            setLoadDataFormFilter(true)
            loadFilterResponse.func(true)
            getDataModalities()
            getDataCountries()
            getDataDurations()
            getDataCategories()
            getDataFormFilter()
            getListTours()
        }
        return () => {
            isSubscribed = false
        }
    }, [])

    const onChange = ({ name, value }) => {
        dataFilter.func({ ...dataFilter.state, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        let urlFilter = ""
        if (dataFilter.state?.modality) {
            urlFilter = `${urlFilter}${urlFilter.includes("?") ? '&' : '?'}modality=${dataFilter.state.modality}`
        }
        if (dataFilter.state?.country) {
            urlFilter = `${urlFilter}${urlFilter.includes("?") ? '&' : '?'}country=${dataFilter.state.country}`
        }
        if (dataFilter.state?.duration) {
            urlFilter = `${urlFilter}${urlFilter.includes("?") ? '&' : '?'}duration=${dataFilter.state.duration}`
        }
        if (dataFilter.state?.category) {
            urlFilter = `${urlFilter}${urlFilter.includes("?") ? '&' : '?'}category=${dataFilter.state.category}`
        }

        if (urlFilter && urlFilter !== "") {
            routerPage.push(`/Tour${urlFilter}`)
        }
    }

    const getDataListTours = async () => {
        const params = new URLSearchParams(document.location.search)
        const country = params.get("country")
        const category = params.get("category")
        const modality = params.get("modality")
        const duration = params.get("duration")
        const filter = params.get('filter')
        const search = params.get('search')
        if (filter && filter === "1") {
            setCollapseFilter(true)
        }
        let query = []
        if (country)
            query.push({ name: "pais", value: country, type: 1, field: "nombre", sentence: "eq" })
        if (duration)
            query.push({ name: "duracions", value: duration, type: 1, field: "nombre", sentence: "eq" })
        if (modality)
            query.push({ name: "modalidades", value: modality, type: 1, field: "nombre", sentence: "eq" })
        if (category)
            query.push({ name: "categoria", value: category, type: 1, field: "nombre", sentence: "eq" })
        if (search) query.push({ name: "nombre", value: search, type: 0, sentence: "contains" })
        // currentPage.func(1)
        dataFilter.func({
            ...dataFilter.state,
            country: country || "",
            category: category || ""
        })
        try {
            const res = await consult.getAllData('tourss', {
                paginate: {
                    page: currentPage.state,
                    pageSize: 9
                }
            }, query)
            if (res.status === 200) {
                filterResponse.func(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let isSubscribed = true

        const getlistToursPage = async () => {
            await getDataListTours()
            loadFilterResponse.func(false)
        }
        if (isSubscribed) {
            loadFilterResponse.func(true)
            getlistToursPage()
        }
        return () => {
            isSubscribed = false
        }
    }, [currentPage.state, router]);

    useEffect(() => {
        let isSubscribed = true
        const changeUrl = () => {
            currentPage.func(1)
        }
        if (isSubscribed) {
            changeUrl()
        }

        return () => {
            isSubscribed = false
        }
    }, [router]);

    return (
        <>
            <div className="container mt-5">
                <h3
                    className='fs-1 text-center text-uppercase text-black fw-bolder'>
                    {dataFormFilter.data?.title || ""}
                </h3>
                <div className="row mt-5">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-body">
                                <span
                                    className='fs-5 mx-3'
                                    role="button"
                                    onClick={() => setCollapseFilter(!collapseFilter)}
                                >
                                    {dataFormFilter.data?.filter}
                                </span>
                                <i
                                    className={`fa-solid ${collapseFilter ? 'fa-caret-up' : 'fa-caret-down'} float-end pt-1 fs-5`}
                                    role="button"
                                    onClick={() => setCollapseFilter(!collapseFilter)}
                                />
                                {
                                    collapseFilter && <div
                                        className="pt-3 px-4"
                                    >
                                        {
                                            loadDataFormFilter ? <></> : <form onSubmit={(e) => onSubmit(e)}>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label className='fs-5 fw-bold'>{dataFormFilter.data?.modalities}</label>
                                                        <select
                                                            name="modality"
                                                            className='form-select'
                                                            onChange={(e) => onChange(e.target)}
                                                            value={dataFilter.state?.modality}
                                                        >
                                                            <option value="">{dataFormFilter.data?.select_void}</option>
                                                            {
                                                                selectModalities?.map((row, i) => (
                                                                    <option key={i} value={row.attributes?.nombre}>{row.attributes?.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className='fs-5 fw-bold'>{dataFormFilter.data?.country}</label>
                                                        <select
                                                            name="country"
                                                            className='form-select'
                                                            onChange={(e) => onChange(e.target)}
                                                            value={dataFilter.state?.country}
                                                        >
                                                            <option value="">{dataFormFilter.data?.select_void}</option>
                                                            {
                                                                selectCountries?.map((row, i) => (
                                                                    <option key={i} value={row.attributes?.nombre}>{row.attributes?.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className='fs-5 fw-bold'>{dataFormFilter.data?.duration}</label>
                                                        <select
                                                            name="duration"
                                                            className='form-select'
                                                            onChange={(e) => onChange(e.target)}
                                                            value={dataFilter.state?.duration}
                                                        >
                                                            <option value="">{dataFormFilter.data?.select_void}</option>
                                                            {
                                                                selectDurations?.map((row, i) => (
                                                                    <option key={i} value={row.attributes?.nombre}>{row.attributes?.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className='fs-5 fw-bold'>{dataFormFilter.data?.category}</label>
                                                        <select
                                                            name="category"
                                                            className='form-select'
                                                            onChange={(e) => onChange(e.target)}
                                                            value={dataFilter.state?.category}
                                                        >
                                                            <option value="">{dataFormFilter.data?.select_void}</option>
                                                            {
                                                                selectCategories?.map((row, i) => (
                                                                    <option key={i} value={row.attributes?.nombre}>{row.attributes?.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <button
                                                            className='btn btn-danger btn-lg float-end mt-2'
                                                            style={{ width: "50%" }}
                                                            type='submit'
                                                        >
                                                            {dataFormFilter.data?.btn_submit}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(FilterTours)