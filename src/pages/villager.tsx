import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { CREATEVILLAGERCOMMENT_MUTATION, VILLAGERCOMMENTS_QUERY } from "../mutations";
import { createVillagerCommentMutation, createVillagerCommentMutationVariables } from "../__generated__/createVillagerCommentMutation";
import { VillagerCommentsQuery, VillagerCommentsQueryVariables } from "../__generated__/VillagerCommentsQuery";
import { VillagersQuery_villagers_villagers } from "../__generated__/VillagersQuery";

interface IForm {
    content: string;
}


export const Villager = () => {
    const location = useLocation();
    const villager:VillagersQuery_villagers_villagers = location.state;
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

                        <dl>
                            <dt>생일</dt>
                            <dd>{villager?.birth}</dd>

                            <dt>성격</dt>
                            <dd>{villager?.personality}</dd>

                            <dt>성별</dt>
                            <dd>{villager?.gender}</dd>

                            <dt>취미</dt>
                            <dd>{villager?.hobby}</dd>

                            <dt>말버릇</dt>
                            <dd>{villager?.speak}</dd>

                            <dt>대화타입</dt>
                            <dd>{villager?.speakType}</dd>

                            <dt>스타일</dt>
                            <dd>{villager?.style} / {villager?.style2}</dd>

                            <dt>색상</dt>
                            <dd>{villager?.color} / {villager?.color2}</dd>
                        </dl>
                    </div>

                    <div>
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
                            
                            {createVillagerCommentResult?.createVillagerComment.error && <FormError errorMessage={createVillagerCommentResult?.createVillagerComment.error}/>}
                            <Button
                                loading={loading}
                                canClick={isValid}
                                actionText="Post"
                            />
                        </form>

                        {comments?.villagersComments.comments?.map((comment) => 
                            <div>{comment.content}</div>
                        )}
                    </div>
                </div>
            }
        </>
    );
}