import { useState, useEffect } from 'react'
import Link from "next/link"
import { navbar_menu } from './../../settings/menu'
const Navbar = (props) => {
    const { dataCompany } = props
    const [dataMenu, setDataMenu] = useState([])
    useEffect(() => {
        let isSubscribed = true
        const getDataMenu = () => {
            const languaje = localStorage.getItem("lan_w")
            if (languaje) {
                setDataMenu(navbar_menu[languaje].menu_footer || [])
            }
        }
        if (isSubscribed) {
            getDataMenu()
        }

        return () => {
            isSubscribed = false
        }
    }, []);
    return (
        <>
            <div className="navbar_footer">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 text-white my-3 text-center">
                            <i className="fa-solid fa-envelope text-danger"></i>&nbsp;
                            {dataCompany.state?.correo || ""}
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-5 col-sm-6 col-12 my-3">
                            <ul className="list-inline">
                                {dataMenu?.map((row, i) => (
                                    <li key={i} className="list-inline-item mx-4">
                                        <Link
                                            className="text-decoration-none text-white"
                                            href={row.path}
                                        >
                                            {row.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-1 text-md-end text-center navbar_footer_social">
                            {
                                dataCompany.state?.redes_sociales?.data?.map((row, i) => (
                                    <a
                                        key={i}
                                        href={row.attributes?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-danger mx-1 rounded-circle"
                                    >
                                        <i className={`${row.attributes?.icono} text-white`}></i>
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar