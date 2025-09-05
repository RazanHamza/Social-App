import React, { useState } from "react";
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { sendRegisterData } from "../Services/authoservice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is important")
      .min(3, "name must be at least 3 characters")
      .max(20, "max 20 characters"),
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
    rePassword: zod.string().nonempty("repassword is important"),
    dateOfBirth: zod.coerce.date().refine(
      (value) => {
        const userage = value.getFullYear();
        const now = new Date().getFullYear();
        const diff = now - userage;
        return diff >= 18;
      },
      { message: "user age is not enough" }
    ),
    gender: zod.string().nonempty("gender is important"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["repassword"],
    message: "Passwords do not match",
  });

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [apierror, setapierror] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: 'onBlur'
    // mode:'onChange' render ذيادة
  });
  const navigate = useNavigate();

  async function signup(userdata) {
    setLoading(true)
    console.log(userdata)
    const response = await sendRegisterData(userdata)
    if (response.message) {

      navigate('/login')
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
          isInvalid={Boolean(errors.name)}
          errorMessage={errors.name?.message}
          variant="bordered"
          label="Name"
          {...register("name")}
          type="text"
        />

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

        <Input
          isInvalid={Boolean(errors.rePassword)}
          errorMessage={errors.rePassword?.message}
          variant="bordered"
          label="Confirm Password"
          {...register("rePassword")}
          type="password"
        />

        <div className="flex gap-5">
          <Input
            isInvalid={Boolean(errors.dateOfBirth)}
            errorMessage={errors.dateOfBirth?.message}
            variant="bordered"
            label="Date of Birth"
            {...register("dateOfBirth")}
            type="date"
          />

          <Select
            {...register("gender")}
            placeholder="Select your gender"
            isInvalid={Boolean(errors.gender)}
            errorMessage={errors.gender?.message}
            className="bg-white"
          >
            <SelectItem key="male">Male</SelectItem>
            <SelectItem key="female">Female</SelectItem>
          </Select>
        </div>

        <Button isLoading={loading} type="submit" variant="bordered">

          Register
        </Button>
                        <div>if you have account  <Link to={'/login'} className="text-blue-600" >Login</Link> </div>
        {apierror && <span className="text-center text-red-500">{apierror}</span>}
      </Form>
    </div>

  );
};


export default Register;