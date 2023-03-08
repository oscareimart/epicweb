import Image from 'next/image'
import Link from "next/link"
import { env_values } from './../../settings/env'

const Copyright = (props) => {
    const { dataCompany } = props
    return (
        <>
            <div
                className="bg-black d-inline-block copyright-container"
            >
                <label className="pt-3 copyright_logo">
                    <Link href="/">
                        {dataCompany.state?.imagen_pie_pagina?.data?.attributes?.url && <Image
                            src={`${env_values.URL_BACKEND}${dataCompany.state?.imagen_pie_pagina?.data?.attributes?.url}`}
                            width={150}
                            height={38}
                            alt="FooterImg"
                        />}

                    </Link>
                </label>
                <p className='text-white pt-4'>
                    © 2022 Epic Travel Bolivia . All Rights Reserved | Design by&nbsp;
                    <a
                        href="https://comtech.com.bo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-decoration-none text-danger'
                    >
                        Comtech
                    </a>
                </p>
            </div>
        </>
    )
}

export default Copyright