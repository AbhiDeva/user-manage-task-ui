import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useLoginMutation, useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect, useState } from "react";

const SelectBox = ({ label, name, options, register, error, className }) => (
  <div className="w-full flex flex-col gap-1">
    <label htmlFor={name} className="text-slate-800 dark:text-slate-400 text-sm">
      {label}
    </label>
    <select
      {...register}
      className={`${className} bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 outline-none text-base focus:ring-2 ring-blue-300`}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
  </div>
);

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const handleLogin = async (data) => {
    try {
      const res = await login(data).unwrap();

      dispatch(setCredentials(res));
      toast.success("Login successful!")
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Login failed" );
    }
  };

   const handleRegister = async (data) => {
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...registerData } = data;
      
      const res = await registerUser(registerData).unwrap();
      dispatch(setCredentials(res));
      toast.success("Registration successful! Welcome aboard!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error || "Registration failed");
    }
  }

   const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset(); // Clear form when switching
  };

  const roleOptions = [
    { value: "Developer", label: "Developer" },
    { value: "Designer", label: "Designer" },
    { value: "Manager", label: "Manager" },
    { value: "Team Lead", label: "Team Lead" },
    { value: "QA Engineer", label: "QA Engineer" },
    { value: "Product Manager", label: "Product Manager" },
  ];

  const titleOptions = [
    { value: "Junior", label: "Junior" },
    { value: "Mid-Level", label: "Mid-Level" },
    { value: "Senior", label: "Senior" },
    { value: "Lead", label: "Lead" },
    { value: "Principal", label: "Principal" },
    { value: "Executive", label: "Executive" },
  ];

  const isLoading = isLogin ? isLoginLoading : isRegisterLoading;

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base dark:border-gray-700 dark:text-blue-400 border-gray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center dark:text-gray-400 text-blue-700'>
              <span>User State</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 pt-14 pb-14'
          >
            <div>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                {isLogin ? 'Welcome back!' : 'Create Account'}
              </p>
              <p className='text-center text-base text-gray-700 dark:text-gray-500'>
                 {isLogin 
                  ? 'Keep all your credentials safe!' 
                  : 'Join us and start managing your tasks!'}
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
               {!isLogin && (
                <>
                  <Textbox
                    placeholder='John Doe'
                    type='text'
                    name='name'
                    label='Full Name'
                    className='w-full rounded-full'
                    register={register("name", {
                      required: "Name is required!",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                    error={errors.name ? errors.name.message : ""}
                  />
                   <SelectBox
                    label='Role'
                    name='role'
                    options={roleOptions}
                    className='w-full rounded-full'
                    register={register("role", {
                      required: "Role is required!"
                    })}
                    error={errors.role ? errors.role.message : ""}
                  />

                  <SelectBox
                    label='Title/Level'
                    name='title'
                    options={titleOptions}
                    className='w-full rounded-full'
                    register={register("title", {
                      required: "Title is required!"
                    })}
                    error={errors.title ? errors.title.message : ""}
                  />
                </>
              )}

              <Textbox
                placeholder='you@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />

               {/* Registration-only confirm password */}
              {!isLogin && (
                <>
                  <Textbox
                    placeholder='••••••••'
                    type='password'
                    name='confirmPassword'
                    label='Confirm Password'
                    className='w-full rounded-full'
                    register={register("confirmPassword", {
                      required: "Please confirm your password!",
                      validate: (value) => 
                        value === watch('password') || "Passwords do not match"
                    })}
                    error={errors.confirmPassword ? errors.confirmPassword.message : ""}
                  />
                   <div className="flex items-center gap-2 pl-2">
                    <input
                      type="checkbox"
                      id="isAdmin"
                      {...register("isAdmin")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
                    />
                    <label 
                      htmlFor="isAdmin" 
                      className="text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                    >
                      Register as Admin
                    </label>
                  </div>
                </>
              )}

              {/* <span className='text-sm text-gray-600 hover:underline cursor-pointer'>
                Forgot Password?
              </span> */}
              {/* Login-only forgot password */}
              {isLogin && (
                <span className='text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline cursor-pointer'>
                  Forgot Password?
                </span>
              )}

            </div>
            {/* {isLoading ? (
              <Loading />
            ) : (
              <Button
                type='submit'
                label='Log in'
                className='w-full h-10 bg-blue-700 text-white rounded-full'
              />
            )} */}

            {/* Submit Button */}
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type='submit'
                label={isLogin ? 'Log in' : 'Create Account'}
                className='w-full h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-medium transition-colors'
              />
            )}

            {/* Toggle Auth Mode */}
            <div className='text-center'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type='button'
                  onClick={toggleAuthMode}
                  className='text-blue-600 dark:text-blue-400 hover:underline font-medium focus:outline-none'
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
