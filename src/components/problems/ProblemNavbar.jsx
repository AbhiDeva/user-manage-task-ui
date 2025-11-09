import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  MdAutoAwesome, 
  MdMenuBook, 
  MdDashboard, 
  MdAdd
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import CreateProblemModal from './CreateProblemModal';
//import { logout } from "../redux/slices/authSlice";


const ProblemNavbar = () => {
   const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get user from Redux store
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//  const handleCreateProblem = async (problemData) => {
//     try {
//      // await createProblem(problemData);
//       toast.success('Problem created successfully!');
//       setIsModalOpen(false);
//       // Refresh problems list
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to create problem');
//     }
//   };

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg bg-white">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
            <MdAutoAwesome className="w-6 h-6 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
              Talent IQ
            </span>
            <span className="text-xs text-base-content/60 font-medium -mt-1">
              Code Together
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to="/problems"
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
              isActive("/problems")
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
            }`}
          >
            <div className="flex items-center gap-x-2.5">
              <MdMenuBook className="w-4 h-4" />
              <span className="font-medium hidden sm:inline">Problems</span>
            </div>
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            to="/dashboard"
            className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
              isActive("/dashboard")
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
            }`}
          >
            <div className="flex items-center gap-x-2.5">
              <MdDashboard className="w-4 h-4" />
              <span className="font-medium hidden sm:inline">Dashboard</span>
            </div>
          </Link>

          {/* USER MENU OR LOGIN BUTTON */}
          {/* <div className="ml-4">
            {user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-content hover:bg-primary/90 transition-all duration-200 font-medium"
              >
                <MdPerson className="w-5 h-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div> */}

           <div>
      {/* Admin Create Button */}
      {/* {user?.isAdmin && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:scale-105 transition-transform flex items-center gap-2"
        >
          <MdAdd className="w-5 h-5" />
          Create Problem
        </button>
      )} */}

      {/* Modal */}
      {/* <CreateProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProblem}
      /> */}
    </div>
        </div>


      </div>
    </nav>
  );
}

export default ProblemNavbar