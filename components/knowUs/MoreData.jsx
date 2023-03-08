import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import { env_values } from './../../settings/env'

const MoreData = (props) => {
    const { modal, modalFunc, modalData } = props
    return (
        <>
            <Modal isOpen={modal} toggle={modalFunc} size="xl">
                <ModalHeader toggle={modalFunc}></ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className='text-center fs-2 fw-bolder'>{modalData.us?.titulo || ""}</h2>
                            <div className='our-history-modal-img'>
                                <Image
                                    src={`${env_values.URL_BACKEND}${modalData.us?.imagenes?.data[2]?.attributes?.url}`}
                                    alt={modalData.us?.imagenes?.data[2]?.attributes?.alternativeText}
                                    layout='fill'
                                    priority={false}
                                />
                            </div>
                            <div className='our-history-modal-desc' dangerouslySetInnerHTML={{ __html: modalData.us?.texto }}></div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default MoreData