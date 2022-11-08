import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { client } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { useMe } from "../hooks/useMe";
import { CREATEVILLAGERCOMMENT_MUTATION, DELETEVILLAGERCOMMENT_MUTATION, VILLAGERCOMMENTS_QUERY } from "../mutations";
import { createVillagerCommentMutation, createVillagerCommentMutationVariables } from "../__generated__/createVillagerCommentMutation";
import { deleteVillagerCommentMutation, deleteVillagerCommentMutationVariables } from "../__generated__/deleteVillagerCommentMutation";
import { VillagerCommentsQuery, VillagerCommentsQueryVariables } from "../__generated__/VillagerCommentsQuery";
import { VillagersQuery_villagers_villagers } from "../__generated__/VillagersQuery";

interface IForm {
    content: string;
}


export const Villager = () => {
    const {data: user} = useMe();
    const location = useLocation();
    const villager: VillagersQuery_villagers_villagers = location.state;
    const { id: villagerId } = useParams();
    const { data: comments } = useQuery<VillagerCommentsQuery, VillagerCommentsQueryVariables>(VILLAGERCOMMENTS_QUERY, {
        variables: {
            villagerCommentsInput: {
                villagerId: Number(villagerId),
                page: 0
            }
        }
    });
    const onCompleted = () => {
        reset();
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

    return (
        <>
            {villagerId &&
                <div className="wrapper-villager-detail">
                    <div className="villager-detail-inner">
                        <div className="villager-image">
                            <img src={villager?.image ? villager?.image : ""} />
                            <span>{villager?.name} <i>{villager?.species}</i></span>
                        </div>

                        <p>{villager?.favoriteTalk}</p>

                        <div className="box-info">
                            <dl>
                                <dt>생일 👑</dt>
                                <dd>{villager?.birth}</dd>
                            </dl>
                            <dl>
                                <dt>성격</dt>
                                <dd>{villager?.personality}</dd>
                            </dl>
                            <dl>
                                <dt>성별</dt>
                                <dd>{villager?.gender}</dd>
                            </dl>
                            <dl>
                                <dt>취미</dt>
                                <dd>{villager?.hobby}</dd>
                            </dl>
                            <dl>
                                <dt>말버릇</dt>
                                <dd>{villager?.speak}</dd>
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
                    </div>

                    <div className="form-comment">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <dl>
                                <dd>
                                    <input
                                        type="text"
                                        placeholder=""
                                        {...register("content", { required: true, minLength: 10 })}
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
                                    {comment.content}
                                    <div className="comment-footer">
                                        <div className="comment-user">
                                            by. {comment.user?.name}
                                        </div>

                                        <div className="comment-time">
                                            {comment.createAt.substr(0, 16)}
                                        </div>
                                    </div>

                                    {comment.user?.id === user?.me.id &&
                                        <button onClick={() => deleteComment(comment.id)}>delete</button>
                                    }
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            }
        </>
    );
}