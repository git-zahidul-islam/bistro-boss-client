import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from 'sweetalert2'

const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const { userCreate, userUpdateProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const handleSignUp = (data) => {
        const name = data?.name
        const email = data?.email
        const password = data?.password
        const photo = data?.photo
        userCreate(email, password)
            .then(result => {
                console.log(result.user);
                userUpdateProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                        }
                        axiosPublic.post('/users',userInfo)
                        .then(res => {
                            if(res.data.insertedId){
                                Swal.fire({
                                    title: "Good job!",
                                    text: "You clicked the button!",
                                    icon: "success"
                                });
                            }
                        })
                    })
                    .catch(error => console.error(error))
                navigate('/')
            })
            .catch(error => {
                console.error(error);
            })
    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className="text-red-400">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo url</span>
                            </label>
                            <input type="text" {...register("photo", { required: true })} name="photo" placeholder="photo url" className="input input-bordered" />
                            {errors.photo && <span className="text-red-400">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-400">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" {...register("password", { required: true, maxLength: 16, minLength: 6, pattern: /(?=.*\d)(?=.*[a-zA-Z])/ })} placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            {errors.password?.type === 'required' && <span className="text-red-400">This field is required</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-red-400">use password maximum 16 character</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-400">use password minimum 6 character</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-400">one uppercase , one lowercase and one digite</span>}
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="SignUp" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;