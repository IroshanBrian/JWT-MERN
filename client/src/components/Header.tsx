import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

const Header = () => {
     const { currentUser } = useSelector((state) => (state.user))
     return (
          <div className="font-title bg-slate-200">
               <div className="flex justify-between items-center mx-w-6xl mx-auto p-3">
                    <h1 className="font-black text-2xl">INFI</h1>
                    <ul className="font-medium text-xl flex gap-5">
                         <Link to='/'><li className="hover:bg-slate-400 p-2 rounded-[10px]">Home</li></Link>
                         <Link to='/about'><li className="hover:bg-slate-400 p-2 rounded-[10px]">About</li></Link>

                         <Link to='/profile'>
                              {currentUser ? (
                                   <img src={currentUser.profilePicture} alt="profile" className="h-12 w-12 rounded-full object-cover" />
                              ) :
                                   (<li className="hover:bg-slate-400 p-2 rounded-[10px]">Sign-In</li>)
                              }</Link>
                    </ul>
               </div>

          </div >
     )
}

export default Header
