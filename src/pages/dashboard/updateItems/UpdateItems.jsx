import { useLoaderData } from "react-router-dom";
import SectionHeading from "../../../components/sectionHeading/SectionHeading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const UpdateItems = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { name, price, category, recipe, _id } = useLoaderData()
    // const { name, price, category, recipe,image } = loaderData;

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data);
        if (res.data.success) {
            // here send the database
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }
            // data post 
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Good job!",
                    text: "The item is updated!",
                    icon: "success"
                });
            }
        }


    }

    return (
        <div className="px-5">
            <SectionHeading heading={"Update The Items"} subheading={"update"}></SectionHeading>
            <div>
                <section className="p-6 text-gray-900">
                    <form onSubmit={handleSubmit(onSubmit)} className="container flex flex-col mx-auto space-y-12">
                        <fieldset className="p-6 rounded-md shadow-2xl">
                            <div className="grid grid-cols-2 gap-5">
                                <div className=" col-span-2">
                                    <label htmlFor="username" className="text-sm">Items Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        id="name"
                                        defaultValue={name}
                                        type="text" placeholder="items name"
                                        className="w-full rounded-md border-2 border-gray-600 p-2" />
                                    {errors.name && <span>This field is required</span>}
                                </div>
                                <div className="">
                                    <label htmlFor="username" className="text-sm">Items Name</label>
                                    <select defaultValue={category} {...register("category", { required: true })} className="border-2 border-gray-600 p-2 rounded-md w-full">
                                        <option disabled value={'default'}>Select the Category</option>
                                        <option value={'Salad'}>Salad</option>
                                        <option value={'Pizza'}>Pizza</option>
                                        <option value={'Soup'}>Soup</option>
                                        <option value={'Dessert'}>Dessert</option>
                                        <option value={'Drinks'}>Drinks</option>
                                    </select>
                                    {errors.category && <span>This field is required</span>}
                                </div>
                                <div className="">
                                    <label htmlFor="price" className="text-sm">Price</label>
                                    <input
                                        {...register("price", { required: true })}
                                        id="price"
                                        defaultValue={price}
                                        type="number" placeholder="price" className="w-full rounded-md border-2 border-gray-600 p-2" />
                                    {errors.price && <span>This field is required</span>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="des" className="text-sm">Recipe Items</label>
                                    <textarea
                                        {...register("recipe", { required: true })}
                                        id="des"
                                        defaultValue={recipe}
                                        className="w-full rounded-md border-2 border-gray-600 p-2 resize-none h-32"></textarea>
                                    {errors.recipe && <span>This field is required</span>}
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="bio" className="text-sm">Photo</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            {...register("image", { required: true })}
                                            type="file"
                                            // defaultValue={image}
                                            className="file-input file-input-bordered file-input-warning w-full max-w-xs" />
                                        {errors.image && <span>This field is required</span>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input className="px-6 py-2 bg-orange-400 my-5 cursor-pointer" type="submit" value="Update Items" />
                            </div>
                        </fieldset>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default UpdateItems;