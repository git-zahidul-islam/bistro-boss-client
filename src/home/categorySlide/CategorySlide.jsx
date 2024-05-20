import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
// image
import img1 from '../../assets/home/slide1.jpg'
import img2 from '../../assets/home/slide2.jpg'
import img3 from '../../assets/home/slide3.jpg'
import img4 from '../../assets/home/slide4.jpg'
import img5 from '../../assets/home/slide5.jpg'
import SectionHeading from '../../components/sectionHeading/SectionHeading';

const CategorySlide = () => {


    return (
        <div className='mb-8'>
            <SectionHeading
            heading={'Order online'}
            subheading={'Open 11:00 am to 4:00 pm'}
            ></SectionHeading>
            <Swiper
                slidesPerView={4}
                spaceBetween={40}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='relative'>
                        <img src={img1} alt="image" />
                        <div className='absolute bottom-10 flex w-full justify-center'>
                            <h1 className='md:text-4xl font-semibold'>Spicy</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <img src={img2} alt="image" />
                        <div className='absolute bottom-10 flex w-full justify-center'>
                            <h1 className='md:text-4xl font-semibold'>Spicy</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <img src={img3} alt="image" />
                        <div className='absolute bottom-10 flex w-full justify-center'>
                            <h1 className='md:text-4xl font-semibold'>Spicy</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <img src={img4} alt="image" />
                        <div className='absolute bottom-10 flex w-full justify-center'>
                            <h1 className='md:text-4xl font-semibold'>Spicy</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <img src={img5} alt="image" />
                        <div className='absolute bottom flex w-full justify-center'>
                            <h1 className='md:text-4xl font-semibold'>Spicy</h1>
                        </div>
                    </div>
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default CategorySlide;