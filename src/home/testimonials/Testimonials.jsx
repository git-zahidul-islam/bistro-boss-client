import SectionHeading from "../../components/sectionHeading/SectionHeading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FcAdvertising } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Testimonials = () => {
    const axiosPublic = useAxiosPublic()
    const [review, setReview] = useState([])
    // console.log(review);

    useEffect(() => {
        // fetch('http://localhost:5000/reviews')
        //     .then(res => res.json())
        //     .then(data => {
        //         setReview(data)
        //     })
        axiosPublic.get(`${import.meta.env.VITE_API_COMMON}/reviews`)
        .then(res => {
            setReview(res.data)
        })

    }, [axiosPublic])

    return (
        <div className="my-20">
            <SectionHeading
                heading={'Testimonials'}
                subheading={'What our client say'}
            ></SectionHeading>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    review.map(item => <SwiperSlide
                        key={item._id}
                    >
                        
                       <div className="flex flex-col items-center mx-24 my-16 space-y-5">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={item.rating}
                            readOnly
                            />
                            <FcAdvertising size={70}></FcAdvertising>
                            <p>{item.details}</p>
                            <h1 className="text-2xl text-orange-400">{item.name}</h1>
                       </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;