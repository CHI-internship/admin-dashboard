import Slider from 'react-slick';
import style from './RequestPage.module.scss';

export const Docs = ({ documents }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <div className={style.docs}>
            <Slider {...sliderSettings}>
                {documents?.map((item, index) =>
                    <div key={index}>
                        {item.split('.').pop() == 'pdf'
                            ? <iframe
                                src={"https://docs.google.com/gview?url=" + item + "&embedded=true"}
                            />
                            : <div className={style.docImage} style={{ backgroundImage: `url(${item})` }} />
                        }
                    </div>
                )}
            </Slider>
        </div>
    )
}
