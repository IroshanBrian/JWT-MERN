import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from "react-redux";


const SignIn = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const [formData, setFormData] = useState({});
     const { loading, error } = useSelector((state) => state.user)
     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, [e.target.id]: e.target.value })
     }

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          try {
               dispatch(signInStart());
               const res = await axios.post('/api/auth/signin', formData, {
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               const data = res.data;
               dispatch(signInSuccess(data))


               if (data.success === false) {
                    dispatch(signInFailure(data));
                    return;
               }

               navigate('/');
          } catch (error) {
               dispatch(signInFailure(error));
          }

     }


     return (
          <div className="p-3 max-w-lg mx-auto font-title">
               <h1 className="text-3xl text-center font-bold my-7">Sign In</h1>
               <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                    <p className="text-red-700 mt-5 max-w-lg mx-auto">{error ? error || 'Something went wrong!' : ''}</p>
                    <input type="email" id="email" onChange={handleChange} placeholder="Email" className="bg-slate-100 p-3 rounded-lg" />
                    <input type="password" id="password" onChange={handleChange} placeholder="Password" className="bg-slate-100 p-3 rounded-lg" />
                    <button type="submit" disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">Sign In</button>
               </form>
               <div className="flex gap-1 justify-center mt-4">
                    <p>Don't Have an account?</p>
                    <Link to='/sign-up'>
                         <span className="text-blue-500">Sign up</span>
                    </Link>
               </div>
          </div>
     )
}

export default SignIn
