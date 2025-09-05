import React, { useContext } from "react";
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { sendLoginData } from "../Services/authoservice";
import { useNavigate } from "react-router-dom";
 import { Link } from "react-router-dom";
 import { useState } from "react";
import { AuthContext } from "../assets/Context/AuthContext";

const schema = zod
  .object({
    email: zod
      .string()
      .nonempty("email is important")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email"
      ),
    password: zod
      .string()
      .nonempty("password is important")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must have 8+ chars, uppercase, lowercase, number & special char"
      ),
   
  });

const Login = () => {
     const [loading, setLoading] = useState(false);
    const [apierror, setapierror] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode:'onBlur'
    // mode:'onChange' render ذيادة
  });
  const navigate=useNavigate();
  const {setIsLoggedIn}=useContext(AuthContext)


   async function signup(userdata) {
        setLoading(true)
        console.log(userdata)
        const response = await sendLoginData(userdata)
        if (response.message) {
          localStorage.setItem('token',response.token);
          setIsLoggedIn(response.token) 

          navigate('/')
        }
        else {
          setapierror(response.error)
        }
        setLoading(false);
  }

  return (
    <div className="w-full flex justify-center py-10 px-6">
      <Form
        onSubmit={handleSubmit(signup)}
        className="w-2xl bg-white shadow-2xl rounded-2xl flex flex-col py-10 px-10 gap-3"
      >
      
        <Input
          isInvalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
          variant="bordered"
          label="Email"
          {...register("email")}
          type="email"
        />

        <Input
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          variant="bordered"
          label="Password"
          {...register("password")}
          type="password"
        />
          <Button isLoading={loading} type="submit" variant="bordered">
                  Login
                </Button>
                <div>If you don’t have an account, please <Link to={'/register'} className="text-blue-600" >Signup</Link> </div>
                {apierror && <span className="text-center text-red-500">{apierror}</span>}
              </Form>
    </div>
      
  );
};


export default Login;