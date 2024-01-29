"use client";

import {
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  username?: string; // Make it optional because login page doesn't have username
  email: string;
  password: string;
}

interface AuthFormProps {
  type: "register" | "login";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      type === "register"
        ? { username: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let res;

    if (type === "register") {
      res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        toast.error("Something went wrong");
      }
    }

    if (type === "login") {
      res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res && res.ok) {
        router.push("/");
      } else if (res && res.error) {
        toast.error("Invalid credentials!");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="auth">
      <div className="overlay">
        <div className="content">
          <img src="/assets/logo.png" alt="logo" className="logo" />

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {type === "register" && (
              <div>
                <div className="input">
                  <input
                    {...register("username", {
                      required: "Username is required",
                      validate: (value: string | undefined) => {
                        if (!value || value.length < 2) {
                          return "Username must be more than 1 character";
                        }
                        return true;
                      },
                    })}
                    type="text"
                    placeholder="Username"
                    className="input-field"
                  />
                  <PersonOutlined sx={{ color: "white" }} />
                </div>
                {errors.username && (
                  <p className="text-red-1">{errors.username.message}</p>
                )}
              </div>
            )}

            <div className="error">
              <div className="input">
                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
                <EmailOutlined sx={{ color: "white" }} />
              </div>
              {errors.email && (
                <p className="text-red-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="input">
                <input
                  {...register("password", {
                    required: "Password is required",
                    // validate: (value: string | undefined) => {
                    //   if (!value || value.length < 5 || !value.match(/[^a-zA-Z0-9]/g)) {
                    //     return "Password must be more than 5 characters and contain at least 1 special";
                    //   }
                    // },
                  })}
                  type="password"
                  placeholder="Password"
                  className="input-field"
                />
                <LockOutlined sx={{ color: "white" }} />
              </div>
              {errors.password && (
                <p className="text-red-1 max-w-80">{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className="button">
              {type === "register" ? "Join Now" : "Let's Watch"}
            </button>
          </form>

          {type === "register" ? (
            <Link href="/login" passHref>
              <p className="link">Already have an account? Sign In Here</p>
            </Link>
          ) : (
            <Link href="/register" passHref>
              <p className="link">Don't have an account? Register Here</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
