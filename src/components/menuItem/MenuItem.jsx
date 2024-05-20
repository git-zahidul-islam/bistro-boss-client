

const MenuItem = ({item}) => {
    const { name, price, image, recipe } = item;
    return (
        <div className="flex gap-4">
            <img style={{borderRadius: '0 200px 200px 200px'}} className="w-[100px]" src={image} alt="" />
            <div>
                <h1 className="text-2xl">{name}---------</h1>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-400">{price}</p>
        </div>
    );
};

export default MenuItem;