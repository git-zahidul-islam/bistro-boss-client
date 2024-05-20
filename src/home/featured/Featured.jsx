import SectionHeading from "../../components/sectionHeading/SectionHeading";

import featuredImage from '../../assets/home/featured.jpg'

const Featured = () => {

    return (
        <div
            style={{
                backgroundImage: `url(${featuredImage})`,
                height: '500px',
                backgroundAttachment: 'fixed'
            }}
            className="pt-5 my-10"
        >
            <SectionHeading
                heading={'Featured Items'}
                subheading={'Check It Out'}
            ></SectionHeading>
            <div
                className="md:flex justify-center items-center gap-4 w-full md:ps-28 py-5"
            >
                <div>
                    <img style={{ width: '640px' }} src={featuredImage} alt="" />
                </div>
                <div>
                    <h1>Hi kki khabor</h1>
                    <p>Lorem ipsum, dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quas fuga sequi tenetur molestiae repudiandae? Voluptas ipsam omnis nesciunt ullam. consectetur adipisicing elit. At.</p>
                    <button className="btn btn-success">Success</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;