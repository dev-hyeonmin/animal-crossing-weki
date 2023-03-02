import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { Helmet } from "react-helmet";
import { editProfileMutation, editProfileMutationVariables } from "../../__generated__/editProfileMutation";
import { useMe } from "../../hooks/useMe";
import { FlowerType, FruitType, HemisphereType } from "../../__generated__/globalTypes";
import { useEffect } from "react";

interface IForm {
    name: string;
    email: string;
    password: string;
    checkPassword: string;
    islandName: string;
    islandCode: string;
    fruit: FruitType;
    flower: FlowerType;
    hemisphere: HemisphereType;
}

const EDITPROFILE_MUTATION = gql`
    mutation editProfileMutation($editProfileInput: EditProfileInput!) {
        editProfile(input: $editProfileInput) {
            ok
            error
        }
    }
`;

const fruitArray = [
    {
        name: FruitType.Apple,
        image: ''
    },
    {
        name: FruitType.Cherry,
        image: ''
    },
    {
        name: FruitType.Orange,
        image: ''
    },
    {
        name: FruitType.Peach,
        image: ''
    },
    {
        name: FruitType.Pear,
        image: ''
    }
];

const flowerArray = [
    {
        name: FlowerType.Anemone,
        image: ''
    },
    {
        name: FlowerType.Chry,
        image: ''
    },
    {
        name: FlowerType.Cosmos,
        image: ''
    },
    {
        name: FlowerType.Hyacinth,
        image: ''
    },
    {
        name: FlowerType.Lily,
        image: ''
    },
    {
        name: FlowerType.Pansy,
        image: ''
    },
    {
        name: FlowerType.Rose,
        image: ''
    },
    {
        name: FlowerType.Tulip,
        image: ''
    },
];

export const EditProfile = () => {
    const userData = useMe();
    const navigation = useNavigate();
    const onCompleted = async (data: editProfileMutation) => {
        const {
            editProfile: { ok }
        } = data;

        if (ok) {
            alert("Edit account success!");
        }
    };

    const { register, handleSubmit, getValues, setValue, formState: { errors, isValid } } = useForm<IForm>({ mode: 'onChange' });
    const [editAccountMutation, { data: editAccountMutationResult, loading }] = useMutation<editProfileMutation, editProfileMutationVariables>(EDITPROFILE_MUTATION, {
        onCompleted
    });

    useEffect(() => {
        if (userData) {
            setValue('name', userData.data?.me.name || '');
            setValue('email', userData.data?.me.email || '');
            setValue('islandName', userData.data?.me.islandName || '');
            setValue('islandCode', userData.data?.me.islandCode || '');

            if (userData.data?.me.fruit) {
                setValue('fruit', userData.data?.me.fruit);
            }

            if (userData.data?.me.flower) {
                setValue('flower', userData.data?.me.flower);
            }

            if (userData.data?.me.hemisphere) {
                setValue('hemisphere', userData.data?.me.hemisphere);
            }
        }
    }, [userData]);

    const onSubmit = () => {
        const { name, email, password, checkPassword, islandName, islandCode, fruit, flower, hemisphere } = getValues();

        if (password !== checkPassword) {
            alert("Please check password!");    
            return;
        }

        editAccountMutation({
            variables: {
                editProfileInput: {
                    name,
                    email,
                    password,
                    islandName,
                    islandCode,
                    fruit,
                    flower,
                    hemisphere
                }
            },
        });
    };

    const goBack = () => {
        navigation(-1);
    };

    return (
        <div className="wrapper-edit-profile">
            <Helmet>
                <title>Create Account | animal-crossing-weki</title>
            </Helmet>

            <button className="btn-back" onClick={() => goBack()}></button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <dl>
                    <dt>이름</dt>
                    <dd>
                        <input
                            type="name"
                            placeholder="name"
                            {...register("name")}
                        />
                        {errors.name?.type === "required" && <FormError errorMessage="Name is required." />}
                    </dd>

                    <dt>이메일</dt>
                    <dd>
                        <input
                            type="email"
                            placeholder="email@gmail.com"
                            {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                            disabled
                        />
                    </dd>

                    <dt>비밀번호</dt>
                    <dd>
                        <input
                            type="password"
                            placeholder="password"
                            {...register("password", { minLength: 4 })}
                        />
                        {errors.password?.type === "required" && <FormError errorMessage="Password is required." />}
                        {errors.password?.type === "minLength" && <FormError errorMessage="Password must be more than 4 chars." />}
                    </dd>

                    <dt>비밀번호 확인</dt>
                    <dd>
                        <input
                            type="password"
                            placeholder="password"
                            {...register("checkPassword", { minLength: 4 })}
                        />
                        {errors.checkPassword?.type === "required" && <FormError errorMessage="Password is required." />}
                        {errors.checkPassword?.type === "minLength" && <FormError errorMessage="Password must be more than 4 chars." />}
                    </dd>

                    <dt>섬이름</dt>
                    <dd>
                        <input
                            type="text"
                            placeholder="islandName"
                            {...register("islandName")}
                            value={userData.data?.me.islandName || ''}
                        />
                    </dd>

                    <dt>꿈번지</dt>
                    <dd>
                        <input
                            type="text"
                            placeholder="islandCode"
                            {...register("islandCode")}
                            value={userData.data?.me.islandCode || ''}
                        />
                    </dd>

                    <dt>대표 과일</dt>
                    <dd>
                        {fruitArray.map(fruit =>
                            <span key={fruit.name}>
                                <input
                                    type="radio"
                                    value={fruit.name}
                                    id={fruit.name}
                                    {...register("fruit")}
                                />
                                <label htmlFor={fruit.name}></label>
                            </span>
                        )}
                    </dd>

                    <dt>대표 꽃</dt>
                    <dd>
                        {flowerArray.map(flower =>
                            <span key={flower.name}>
                                <input
                                    type="radio"
                                    value={flower.name}
                                    id={flower.name}
                                    {...register("flower")}
                                />
                                <label htmlFor={flower.name}></label>
                            </span>
                        )}
                    </dd>

                    <dt>섬 위치</dt>
                    <dd>
                        <label htmlFor={HemisphereType.Northern}>
                            <input
                                type="radio"
                                value={HemisphereType.Northern}
                                id={HemisphereType.Northern}
                                {...register("hemisphere")}
                                checked={userData.data?.me.hemisphere === HemisphereType.Northern ? true : false}
                            />
                        </label>

                        <label htmlFor={HemisphereType.Southern}>
                            <input
                                type="radio"
                                value={HemisphereType.Southern}
                                id={HemisphereType.Southern}
                                {...register("hemisphere")}

                            />
                        </label>
                    </dd>
                </dl>

                {editAccountMutationResult?.editProfile.error && <FormError errorMessage={editAccountMutationResult?.editProfile.error} />}
                <Button
                    loading={loading}
                    canClick={isValid}
                    actionText="수정하기"
                />
            </form>
        </div>
    )
};