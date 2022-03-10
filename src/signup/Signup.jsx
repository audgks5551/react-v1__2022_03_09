import React from 'react';
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserActions } from "_actions";

function Signup() {
    console.log("Signup()");
    const userActions = useUserActions();

    /**
     * 유효성 검증
     */
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("아이디를 입력해주세요"),
        password: Yup.string().required("비밀번호를 입력해주세요"),
        name: Yup.string().required("이름을 입력해주세요")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password, name }) {
        return userActions.signup(username, password, name)
            .catch(error => {
                console.log("error: " + error);
                setError("apiError", { message: error });
            });
    }

    return (
        <div>
            <div>
                <h1>회원가입</h1>
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
                <div>
                    <label>Name</label>
                    <input name="name" type="text" {...register("name")}/>
                    <div>{errors.name?.message}</div>
                </div>
                <button disabled={isSubmitting}>
                    회원가입
                </button>

            </form>
        </div>
    );
}

export { Signup };