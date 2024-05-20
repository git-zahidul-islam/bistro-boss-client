
import serviceImage from '../../assets/home/chef-service.jpg'

const SafeService = () => {

    return (
        <div
            style={{
                backgroundImage: `url(${serviceImage})`, height: '450px',
                backgroundPosition: 'center', backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
            className='flex justify-center items-center mb-8'
        >
            <div className='w-10/12 bg-white h-4/6 flex flex-col items-center justify-center'>
                <h1 className='uppercase text-3xl font-semibold'>bistro boss</h1>
                <p className='w-8/12'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quis! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis dolor quas velit ratione veniam quidem dignissimos neque sint ad molestiae.</p>
            </div>
        </div>
    );
};

export default SafeService;