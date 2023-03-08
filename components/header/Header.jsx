import { useState, useEffect } from 'react'
import { env_values } from './../../settings/env'
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from 'next/router'
import { navbar_menu } from './../../settings/menu'
import { web_data } from './../../settings/lang_data'
import esFlag from './../../public/images/spain.png'
import enFlag from './../../public/images/united-states.png'
import SecondModal from './../services/ServicesSecondModal'

const Header = (props) => {
    const { dataCompany } = props
    const router = useRouter()
    const [navbarMenu, setNavbarMenu] = useState([])
    const [dataSearch, setDataSearch] = useState({})
    const [searchStatus, setSearchStatus] = useState(false)
    const [secondModal, setSecondModal] = useState(false)
    const [dataHeader, setDataHeader] = useState({})

    const [modalTitle, setModalTitle] = useState("")
    const [modalType, setModalType] = useState(0)

    useEffect(() => {
        let isSubscribed = true

        const getMenu = async () => {
            const languaje = localStorage.getItem("lan_w")
            if (!languaje) {
                setNavbarMenu(navbar_menu.en)
            } else {
                setDataHeader({
                    data: web_data[languaje].header
                })
                if (languaje === "es") setNavbarMenu(navbar_menu.es?.menu || [])
                if (languaje === "en") setNavbarMenu(navbar_menu.en?.menu || [])
            }
        }

        if (isSubscribed) {
            getMenu()
        }
        return () => {
            isSubscribed = false
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault()
        router.push(`/Tour?search=${dataSearch.search}`)
    }

    const onChange = ({ name, value }) => {
        setDataSearch({ ...dataSearch, [name]: value })
    }

    return (
        <>
            <nav
                className="navbar navbar-expand-lg bg-light py-3 d-block navigation-container">
                <div className="container-fluid">
                    <Link className="navbar-brand me-4 ms-2" href="/">
                        {dataCompany.state?.logotipo?.data?.attributes?.url && <Image
                            className="d-inline-block align-text-top"
                            src={`${env_values.URL_BACKEND}${dataCompany.state?.logotipo?.data?.attributes?.url}`}
                            alt="Logo Epic"
                            width={140}
                            height={36}
                            priority
                        />}
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                navbarMenu?.length > 0 && <>
                                    {
                                        navbarMenu?.map((row, i) => {
                                            if (row.children) {
                                                return (
                                                    <li className="nav-item dropdown mx-1" key={i}>
                                                        <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {row.txt}
                                                        </span>
                                                        <ul className="dropdown-menu">
                                                            {row.children?.map((child, j) => (
                                                                <li key={j}>
                                                                    {
                                                                        child.toggle ? <span
                                                                            role="button"
                                                                            className='dropdown-item'
                                                                            onClick={() => {
                                                                                setModalTitle(child.txt)
                                                                                setModalType(child.type)
                                                                                setSecondModal(!secondModal)
                                                                            }}
                                                                        >
                                                                            {child.txt}
                                                                        </span> : <Link
                                                                            className="dropdown-item"
                                                                            href={child.path}
                                                                            target={child.extern ? `_blank` : `_self`}
                                                                            rel="noopener noreferrer"
                                                                            scroll={child.hashid && false}
                                                                        >
                                                                            {child.txt}
                                                                        </Link>
                                                                    }
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                )
                                            } else {
                                                return (
                                                    <li className="nav-item mx-1" key={i}>
                                                        {row.toggle ? <span
                                                            role="button"
                                                            className='nav-link'
                                                            onClick={() => {
                                                                setModalTitle(row.txt)
                                                                setModalType(row.type)
                                                                setSecondModal(!secondModal)
                                                            }}
                                                        >
                                                            {row.txt}
                                                        </span> : <Link
                                                            className="nav-link"
                                                            href={row.path}
                                                        >
                                                            {row.txt}
                                                        </Link>}
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </>
                            }
                        </ul>
                        <div>
                            <span
                                role="button"
                                className='mx-1'
                                onClick={() => {
                                    localStorage.setItem("lan_w", "es")
                                    location.reload()
                                }}
                            >
                                <Image
                                    src={esFlag}
                                    alt="es-lang"
                                    width={30}
                                    height="auto"
                                />
                            </span>
                            <span
                                role="button"
                                className='mx-1'
                                onClick={() => {
                                    localStorage.setItem("lan_w", "en")
                                    location.reload()
                                }}
                            >
                                <Image
                                    src={enFlag}
                                    alt="en-lang"
                                    width={30}
                                    height="auto"
                                />
                            </span>
                        </div>
                        <div className='ms-4 me-4'>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => setSearchStatus(!searchStatus)}
                            >
                                {
                                    searchStatus ? <i className="fa-solid fa-xmark"></i> :
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                {
                    searchStatus && <div className='search-container'>
                        <form onSubmit={(data) => onSubmit(data)}>
                            <input
                                name="search"
                                type="search"
                                placeholder={`${dataHeader.data?.search || ""} ...`}
                                onChange={(e) => onChange(e.target)}
                            />
                        </form>
                    </div>
                }
            </nav>
            <SecondModal
                modal={secondModal}
                modalFunc={() => setSecondModal(!secondModal)}
                modalTitle={modalTitle}
                modalType={modalType}
            />
        </>
    )
}

export default Header