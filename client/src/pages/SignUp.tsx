import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";

const SignUp = () => {
     const dispatch = useDispatch();
     const [formData, setFormData] = useState({});
     const { loading, error } = useSelector((state) => state.user)
     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, [e.target.id]: e.target.value })
     }

     const navigate = useNavigate();

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          try {
               dispatch(signInStart());
               const res = await axios.post('/api/auth/signup', formData, {
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               const data = res.data;

               dispatch(signInSuccess(data));

               if (data.success === false) {
                    dispatch(signInFailure(data));
                    return;
               }
               navigate('/sign-in')
          } catch (error) {
               dispatch(signInFailure(error));
          }

     }


     return (
          <div className="p-3 max-w-lg mx-auto font-title">
               <h1 className="text-3xl text-center font-bold my-7">Sign up</h1>
               <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                    <p className="text-red-700 mt-5 max-w-lg mx-auto">{error && 'Something went wrong!'}</p>
                    <input type="username" id="username" onChange={handleChange} placeholder="Username" className="bg-slate-100 p-3 rounded-lg" />
                    <input type="email" id="email" onChange={handleChange} placeholder="Email" className="bg-slate-100 p-3 rounded-lg" />
                    <input type="password" id="password" onChange={handleChange} placeholder="Password" className="bg-slate-100 p-3 rounded-lg" />
                    <button type="submit" disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">Sign up</button>
                    <OAuth />
               </form>
               <div className="flex gap-1 justify-center mt-4">
                    <p>Have an account?</p>
                    <Link to='/sign-in'>
                         <span className="text-blue-500">Sign in</span>
                    </Link>
               </div>
          </div>
     )
}

export default SignUp
