
const SectionHeading = ({heading,subheading}) => {
    return (
        <div className="md:w-3/12 my-10 text-center mx-auto">
            <p className="text-yellow-500 border-b-2">----{subheading}----</p>
            <h1 className="text-3xl border-b-2 py-4">{heading}</h1>
        </div>
    );
};

export default SectionHeading;