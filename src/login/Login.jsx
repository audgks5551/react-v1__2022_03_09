import React from 'react';
import {useUserActions} from "../_actions";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useForm} from "react-hook-form";

function Login() {
    console.log("Login()");
    const userActions = useUserActions();

    /**
     * 유효성 검증
     */
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("아이디를 입력해주세요"),
        password: Yup.string().required("비밀번호를 입력해주세요"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return userActions.login(username, password)
            .catch(error => {
                console.log("error: " + error);
                setError("apiError", { message: error });
            });
    }

    return (
        <div>
            <div>
                <h1>로그인</h1>
            </div>

            {errors.apiError &&
                <div>{errors.apiError?.message}</div>
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input name="username" type="text" {...register("username")} />
                    <div>{errors.username?.message}</div>
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" {...register("password")} />
                    <div>{errors.password?.message}</div>
                </div>
                <button disabled={isSubmitting}>
                    로그인
                </button>
            </form>
        </div>
    );
}

export { Login };