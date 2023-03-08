import React, { useState, useEffect } from 'react'
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Col
} from 'reactstrap'
import ItineraryTable from './ItineraryTable'
import { reporter } from 'vfile-reporter'
import { remark } from 'remark'
import remarkPresetLintMarkdownStyleGuide from 'remark-preset-lint-markdown-style-guide'
import remarkHtml from 'remark-html'
import DateTime from "react-datetime"
import moment from 'moment'

const ItineraryData = (props) => {
    const { dataTour, dataCompany, langData } = props
    const [activeTab, setActiveTab] = useState("1")
    const [dataReserve, setDataReserve] = useState({
        date: new Date(),
        adults: 1
    })
    const [priceReserve, setPriceReserve] = useState({
        price: parseFloat(dataTour.state?.attributes?.detalle[0]?.price || 0),
        coin: dataTour.state?.attributes?.moneda,
        itinerary: dataTour.state?.attributes?.detalle[0]?.nombre
    })
    const [totalReserve, setTotalReserve] = useState(parseFloat(dataTour.state?.attributes?.detalle[0]?.price || 0))
    const [detailItinerary, setDetailItinerary] = useState([])
    const [load, setLoad] = useState(true)
    const [messageForm, setMessageForm] = useState("")

    useEffect(() => {
        let isSubscribed = true
        const initData = async () => {
            if (dataTour.state?.attributes?.detalle?.length > 0) {
                let arrayEdit = dataTour.state?.attributes?.detalle
                for (let row of arrayEdit) {
                    // console.log()
                    // let dataHtml = await transformToHtml(row.itinerario)
                    // row.itinerario = dataHtml
                }
                setDetailItinerary(arrayEdit)
                setLoad(!load)
            }
        }

        if (isSubscribed) {
            initData()
        }
        return () => {
            isSubscribed = false
        }
    }, []);


    const changeTab = (tab, dataRow) => {
        if (activeTab !== tab) {
            setActiveTab(tab)
            setDataReserve({
                adults: 1,
                date: new Date()
            })
            setPriceReserve({
                ...priceReserve,
                price: dataRow.price || 0,
                itinerary: dataRow.nombre || ""
            })
            setTotalReserve(dataRow.price || 0)
        }
    }

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

    const onChange = ({ name, value }) => {
        setDataReserve({ ...dataReserve, [name]: value })
    }

    const reserveTour = (type) => {
        if (dataReserve.date && dataReserve.adults) {
            const strDate = moment(dataReserve.date).format('DD/MM/YYYY')
            const strMessage = `Reserva por Tour ${dataTour.state?.attributes?.nombre}, ${priceReserve.itinerary} con fecha: ` +
                `${strDate}, para ${dataReserve.adults} personas, con un precio ` +
                `de ${priceReserve.coin} ${priceReserve.price} por persona, en total ` +
                `${priceReserve.coin} ${totalReserve}.`
            const messageToUrl = encodeURIComponent(strMessage)
            let str_code_country = dataCompany.codigo_pais.replace("+", "")
            if (type === 'whatsapp') {
                const urlSend = `https://wa.me/${str_code_country}${dataCompany.telefono}?text=${messageToUrl}`
                window.open(urlSend, "Diseño Web")
            }
            if (type === 'email') {
                const sLink = `mailto:${escape(dataCompany.correo)}`
                    + `?subject=${escape("Reserva")}`
                    + `&body=${strMessage}`;
                window, open(sLink, "Diseño Web")
            }
            setDataReserve({
                date: new Date(),
                adults: 1
            })
            setTotalReserve(priceReserve.price)
        } else {
            setMessageForm("Se require de todos los campos para continuar.")
            setTimeout(() => {
                setMessageForm("")
            }, 3500)
        }
    }

    useEffect(() => {
        const getTotalReserve = () => {
            if (dataReserve.adults) {
                if (parseFloat(dataReserve.adults) > 0) {
                    let total = parseFloat(priceReserve.price) * parseFloat(dataReserve.adults)
                    setTotalReserve(total)
                } else {
                    setTotalReserve(0)
                }
            }
        }
        getTotalReserve()
    }, [dataReserve.adults])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <Nav tabs>
                            {
                                dataTour?.state?.attributes?.detalle?.length > 0 && <>
                                    {
                                        dataTour?.state?.attributes?.detalle?.map((row, i) => (
                                            <NavItem key={i} role="button">
                                                <NavLink
                                                    className={`${i + 1 === parseFloat(activeTab) ? 'active' : 'text-danger'} `}
                                                    onClick={() => changeTab(`${i + 1}`, row)}
                                                >
                                                    {row.nombre}
                                                </NavLink>
                                            </NavItem>
                                        ))
                                    }
                                </>
                            }
                        </Nav>
                        <TabContent activeTab={activeTab} className="mt-3">
                            {
                                dataTour?.state?.attributes?.detalle?.length > 0 && <>
                                    {
                                        dataTour?.state?.attributes?.detalle?.map((row, i) => (
                                            <TabPane key={i} tabId={`${i + 1}`}>
                                                <ItineraryTable
                                                    rowData={row}
                                                />
                                            </TabPane>
                                        ))
                                    }
                                </>
                            }
                        </TabContent>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-reserve">
                            <div className="card-body card-body-reserve">
                                <h2>{langData.data?.reserve?.title || ""} - {priceReserve.coin} {totalReserve}</h2>
                                <hr />
                                <label>{langData.data?.reserve?.departure_date || ""}:</label>
                                <DateTime
                                    locale="es"
                                    timeFormat={false}
                                    closeOnSelect={true}
                                    onChange={(e) => onChange({ name: "date", value: e._d })}
                                    value={dataReserve?.date}
                                />
                                <label>{langData.data?.reserve?.adults || ""}:</label>
                                <input
                                    className='form-control'
                                    name='adults'
                                    type="number"
                                    min="0"
                                    placeholder='0'
                                    onChange={(e) => onChange(e.target)}
                                    value={dataReserve.adults}
                                />
                                {
                                    messageForm && <div className="alert alert-danger mt-3" role="alert">
                                        {messageForm}
                                    </div>
                                }
                                <div className='mt-4'>
                                    <button
                                        className='btn btn-danger py-3 px-4 m-1'
                                        type='button'
                                        onClick={() => reserveTour('whatsapp')}
                                    >
                                        Whatsapp <i className="fa-brands fa-whatsapp"></i>
                                    </button>
                                    <button
                                        className='btn btn-danger py-3 px-4 m-1'
                                        type='button'
                                        onClick={() => reserveTour('email')}
                                    >
                                        Email <i className="fa-solid fa-envelope"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <TabContent activeTab={activeTab} className="mt-3">
                            {
                                detailItinerary?.length > 0 && <>
                                    {
                                        detailItinerary?.map((row, i) => (
                                            <TabPane key={i} tabId={`${i + 1}`}>
                                                <div key={i} dangerouslySetInnerHTML={{ __html: row.itinerario }} />
                                            </TabPane>
                                        ))
                                    }
                                </>
                            }
                        </TabContent>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItineraryData