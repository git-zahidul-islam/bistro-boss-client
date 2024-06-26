import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../../components/socialLogin/SocialLogin";


const Login = () => {
    const [disabled,setDisabled] = useState(true)
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    // console.log("user login for items",location.state);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userInfo = { email, password }
        console.log(userInfo);
        loginUser(email,password)
        .then((result) => {
            console.log(result.user);
            navigate(from, { replace: true })
        })
        .catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    const handleValidCaptcha = (e) => {
        const data = e.target.value;
        if(validateCaptcha(data)){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidCaptcha} type="text" name="captcha" placeholder="Type your right captcha" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                        {/* TODO: make disabled */}
                            <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <small>New here <Link className="text-base font-medium text-indigo-700" to={'/signup'}>Create an account</Link></small>
                    </form>
                    <div className="divider px-2"></div> 
                    <div className="flex justify-center">
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
                <div className="text-center w-1/2 lg:text-left">
                    <input type="submit" className="text-5xl font-bold" value="login" />
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;