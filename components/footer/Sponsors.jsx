import Image from 'next/image'

const Sponsors = (props) => {
    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center">
                        <Image
                            src="https://epicbolivia.travel/images/tripadvisor_epic_1.png"
                            width={150}
                            height={38}
                            alt="TripAdvisor"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center">
                        <Image
                            src="https://epicbolivia.travel/images/europassistance_epic.png"
                            width={150}
                            height={38}
                            alt="TripAdvisor"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center">
                        <Image
                            src="https://epicbolivia.travel/images/marcapais_epic.png"
                            width={150}
                            height={38}
                            alt="TripAdvisor"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sponsors