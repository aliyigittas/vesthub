import { Modal } from 'antd';
import { currentUrl } from '../Pages/SearchPage';
import SingleMarkerMap from './SingleMarkerMap';
import { CCarousel, CCarouselItem, CImage,CCarouselCaption } from '@coreui/react';

function HomeModal({ show, setShow, home }: { show: boolean; setShow: () => void; home: { id: number, name: string, photo: any , price: string, coordinates: {lat: number, lng: number}} }) {
    return (
        <Modal
            open={show}
            onCancel={setShow}
            footer={null}
            width={window.innerWidth > 768 ? "75%" : "100%"}
            style={{ top: 0}}
            afterClose={() => {
                window.history.pushState({}, '', currentUrl);
            }}
            centered
        >
            <div>
            <CCarousel controls={true} indicators={true} touch dark>
                <CCarouselItem className=''>
                    <CCarouselCaption>
                        <h3>{home.name}</h3>
                        <p>{home.price}</p>
                    </CCarouselCaption>
                    <CImage src={home.photo} alt="slide 1" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src={home.photo} alt="slide 2" />
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src={home.photo} alt="slide 3" />
                </CCarouselItem>
                </CCarousel>
                <SingleMarkerMap marker={home} />
            </div>
        </Modal>
    );
}
export default HomeModal;
