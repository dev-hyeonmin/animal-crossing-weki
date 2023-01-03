import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { client } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { useMe } from "../hooks/useMe";
import { CREATEVILLAGERCOMMENT_MUTATION, DELETEVILLAGERCOMMENT_MUTATION, MYFAVORITEVILLAGER_QUERY, MYVILLAGER_QUERY, REGISTFAVORITEVILLAGER_MUTATION, REGISTMYVILLAGER_MUTATION, VILLAGERCOMMENTS_QUERY } from "../mutations";
import { createVillagerCommentMutation, createVillagerCommentMutationVariables } from "../__generated__/createVillagerCommentMutation";
import { deleteVillagerCommentMutation, deleteVillagerCommentMutationVariables } from "../__generated__/deleteVillagerCommentMutation";
import { VillagerCommentsQuery, VillagerCommentsQueryVariables } from "../__generated__/VillagerCommentsQuery";
import { VillagersQuery_villagers_villagers } from "../__generated__/VillagersQuery";
// @ts-ignore
import maleIcon from '../images/male.png';
// @ts-ignore
import femaleIcon from '../images/female.png';
// @ts-ignore
import emptyHeartIcon from '../images/empty-heart.png';
// @ts-ignore
import heartIcon from '../images/heart.png';
// @ts-ignore
import emptyHomeIcon from '../images/empty-home.png';
// @ts-ignore
import homeIcon from '../images/home.png';
import { myFavoriteVillagerQuery, myFavoriteVillagerQuery_myFavoriteVillager } from "../__generated__/myFavoriteVillagerQuery";
import { registFavoriteVillager, registFavoriteVillagerVariables } from "../__generated__/registFavoriteVillager";
import { myVillagerQuery, myVillagerQuery_myVillager } from "../__generated__/myVillagerQuery";
import { registMyVillager, registMyVillagerVariables } from "../__generated__/registMyVillager";

interface IForm {
    content: string;
}


export const Villager = () => {
    const [temp, setTemp] = useState(false);
    const { data: user } = useMe();
    const location = useLocation();
    const commentForm = useRef<any>();
    const villager: VillagersQuery_villagers_villagers = location.state;
    const { id: villagerId } = useParams();
    const { data: myFavoriteVillagerData, refetch: refetchFavor } = useQuery<myFavoriteVillagerQuery, myFavoriteVillagerQuery_myFavoriteVillager>(MYFAVORITEVILLAGER_QUERY);
    const [registFavoriteVillagerMutation] = useMutation<registFavoriteVillager, registFavoriteVillagerVariables>(REGISTFAVORITEVILLAGER_MUTATION, {
        onCompleted: () => {
            refetchFavor();
        }
    });
    const { data: myVillagerData, refetch: refetchMyVillager } = useQuery<myVillagerQuery, myVillagerQuery_myVillager>(MYVILLAGER_QUERY);
    const [registMyVillagerMutation] = useMutation<registMyVillager, registMyVillagerVariables>(REGISTMYVILLAGER_MUTATION, {
        onCompleted: () => {
            refetchMyVillager();
        }
    });
    const { data: comments, refetch } = useQuery<VillagerCommentsQuery, VillagerCommentsQueryVariables>(VILLAGERCOMMENTS_QUERY, {
        variables: {
            villagerCommentsInput: {
                villagerId: Number(villagerId),
                page: 0
            }
        }
    });
    const onCompleted = () => {
        reset();
        refetch();
    };
    const [deleteVillagerCommentMutation]
        = useMutation<deleteVillagerCommentMutation, deleteVillagerCommentMutationVariables>(DELETEVILLAGERCOMMENT_MUTATION);
    const [createVillagerCommentMutation, { data: createVillagerCommentResult, loading }]
        = useMutation<createVillagerCommentMutation, createVillagerCommentMutationVariables>(CREATEVILLAGERCOMMENT_MUTATION, {
            onCompleted
        });
    const { register, handleSubmit, getValues, reset, formState: { errors, isValid } } = useForm<IForm>({ mode: 'onChange' });
    const onSubmit = () => {
        const { content } = getValues();

        createVillagerCommentMutation({
            variables: {
                createVillagerCommentInput: {
                    content,
                    villagerId: Number(villagerId)
                }
            },
        });
    };

    const deleteComment = (id: number) => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

        deleteVillagerCommentMutation({
            variables: {
                deleteVillagerCommentInput: {
                    id
                }
            }
        });
        client.cache.evict({ id: `VillagerComment:${id}` });
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {

        });
    }, []);

    const registFavoriteVillager = (event: React.MouseEvent, villagerId: number) => {
        event.stopPropagation();
        event.preventDefault();

        registFavoriteVillagerMutation({
            variables: {
                registFavoriteVillagerInput: {
                    villagerId
                }
            }
        });
    };
    const registMyVillager = (event: React.MouseEvent, villagerId: number) => {
        event.stopPropagation();
        event.preventDefault();

        registMyVillagerMutation({
            variables: {
                registMyVillagerInput: {
                    villagerId
                }
            }
        });
    };

    const submitCommentForm = (event: React.KeyboardEvent) => {
        if (event.code === 'Enter') {
            handleSubmit(onSubmit);
        }
        return;
    }

    return (
        <>
            {villagerId &&
                <div className="wrapper-villager-detail">
                    <div className="villager-summary">
                        <div className="villager-image">
                            <img src={villager?.image ? villager?.image : ""} />
                        </div>

                        <div className="villager-info">
                            <h5>{villager.species}</h5>
                            <h2>{villager.name} <img src={villager.gender === '남' ? maleIcon : femaleIcon} /></h2>

                            <div className="btn-favorite" onClick={(event) => registFavoriteVillager(event, villager.id)}>
                                <img src={myFavoriteVillagerData?.myFavoriteVillager.favoriteVillagers.find(favor => favor.id === villager.id) ? heartIcon : emptyHeartIcon} />
                            </div>
                            <div className="btn-home" onClick={(event) => registMyVillager(event, villager.id)}>
                                <img src={myVillagerData?.myVillager.myVillagers.find(myV => myV.id === villager.id) ? homeIcon : emptyHomeIcon} />
                            </div>

                            <dl>
                                <dt>성격</dt>
                                <dd>{villager.personality}</dd>

                                <dt>말버릇</dt>
                                <dd>{villager.speak}</dd>
                            </dl>

                            <ul>
                                <li>
                                    위시리스트
                                    <span>0</span>
                                </li>

                                <li>
                                    저희 섬 주민이에요!
                                    <span>0</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {villager.favoriteTalk &&
                        <div className="box-talk">
                            {villager.favoriteTalk}
                        </div>
                    }

                    <div className="box-info" style={{ backgroundImage: `url(${villager.icon?.replaceAll(" ", "%20")})` }}>
                        <dl>
                            <dt>종류</dt>
                            <dd>{villager?.species}</dd>
                        </dl>
                        <dl>
                            <dt>생일</dt>
                            <dd>{villager?.birth}</dd>
                        </dl>
                        <dl>
                            <dt>취미</dt>
                            <dd>{villager?.hobby}</dd>
                        </dl>
                        <dl>
                            <dt>대화타입</dt>
                            <dd>{villager?.speakType}</dd>
                        </dl>
                        <dl>
                            <dt>스타일</dt>
                            <dd>{villager?.style} / {villager?.style2}</dd>
                        </dl>
                        <dl>
                            <dt>색상</dt>
                            <dd>{villager?.color} / {villager?.color2}</dd>
                        </dl>
                    </div>

                    <div className="form-comment">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <dl>
                                <dd>
                                    <input
                                        type="text"
                                        placeholder="Add Comment..."
                                        {...register("content", { required: true, minLength: 5 })}
                                        onKeyUp={(e) => submitCommentForm(e)}
                                    />
                                    {errors.content?.type === "required" && <FormError errorMessage="Content is required." />}
                                </dd>
                            </dl>

                            {createVillagerCommentResult?.createVillagerComment.error && <FormError errorMessage={createVillagerCommentResult?.createVillagerComment.error} />}
                            <Button
                                loading={loading}
                                canClick={isValid}
                                actionText="Post"
                            />
                        </form>

                        <ul className="list-comment">
                            {comments?.villagersComments.comments?.map((comment, index) =>
                                <li key={`comment_${index}`}>
                                    <div className="comment-user">
                                        {comment.user?.name}

                                        {comment.user?.id === user?.me.id &&
                                            <button onClick={() => deleteComment(comment.id)}>delete</button>
                                        }
                                    </div>
                                    {comment.content}
                                    <div className="comment-footer">
                                        <div className="comment-time">
                                            {comment.createAt.substr(0, 16)}
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            }
        </>
    );
}