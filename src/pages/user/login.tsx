import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { LOCALSTORAGE_TOKEN } from "../../constans";
import { loginMutation, loginMutationVariables } from "../../__generated__/loginMutation";

interface IForm {
    email: string;
    password: string;
}

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`;

export const Login = () => {    
    const navigation = useNavigate();
    const onCompleted = async (data: loginMutation) => {
        const {
            login: { ok, token }
        } = data;
        
        if (ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            
            isLoggedInVar(true);
            authTokenVar(token);
        }
    };
    
    const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<IForm>({ mode: 'onChange' });
    const [loginMutation, { data: loginMutationResult, loading }] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted
    });
    
    const onSubmit = () => {
        const { email, password } = getValues();
        loginMutation({
            variables: {
                loginInput: {
                    email,
                    password
                }
            },
        });
    };

    return (
        <div className="wrapper-login">
            <Helmet>
                <title>Login | animal-crossing-weki</title>
            </Helmet>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>안녕하세요! 👋</h3>
                <h6>
                    모여봐요 동물의 숲 위키에 오신 것을 환영합니다. <br />
                    세계각국의 무인도 대표님들을 만날 준비가 되었나요?
                </h6>

                <dl>
                    <dt>이메일</dt>
                    <dd>
                        <input
                            type="email" 
                            placeholder="email@gmail.com"
                            {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                        />
                        {errors.email?.type === "required" && <FormError errorMessage="Email is required." />}
                        {errors.email?.type === "pattern" && <FormError errorMessage="Please enter a valid email." />}
                    </dd>

                    <dt>비밀번호</dt>
                    <dd>
                        <input
                            type="password" 
                            placeholder="password"
                            {...register("password", { required: true, minLength: 4 })}
                        />
                        {errors.password?.type === "required" && <FormError errorMessage="Password is required." />}
                        {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more than 4 chars." />}
                    </dd>
                </dl>
                
                {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult?.login.error}/>}
                <Button
                    loading={loading}
                    canClick={isValid}
                    actionText="로그인"
                />
            </form>

            <div className="tag-create_account">
                아직 가입하지 않으셨나요?
                <Link to="/create-account">회원가입</Link>
            </div>
        </div>
    )
};