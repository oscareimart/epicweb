import Image from 'next/image'
import { env_values } from './../../settings/env'
import bannerTour from './../../public/images/servicios.webp'
const Banner = (props) => {
    const { dataCompany } = props
    return (
        <>
            <div className='tour_banner'>
                <Image
                    src={bannerTour}
                    alt="BannerTour"
                    layout='fill'
                    priority={true}
                />
            </div>
        </>
    )
}

export default Banner