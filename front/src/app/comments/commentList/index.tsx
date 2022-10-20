import React, { useContext, useEffect, useState } from 'react'
import CommentSpec from './comment'
import { useQuery, useSubscription } from '@apollo/client';

import { GET_POST_COMMENTS } from '@graphql/operations/comments/commentQueries';
import { PostContext } from '@/app/posts';
import _ from 'lodash';
import { CommentType } from '@/types/posts/commentTypes';
import { CommentContext } from '@/reducers/comments/commentContext';
import { SUBS_COMMENT } from '@graphql/operations/comments/commentSubscription';

type Props = {}
type StateType = {
    comList: any;
}

const CommentList = (props: Props) => {
    const [stateD, dispatch] = React.useContext<any>(CommentContext)
    const postContext = useContext(PostContext);
    const [state, setState] = useState<StateType>({
        comList: []
    })

    const { data: postComments, refetch, loading: commentLoading } = useQuery(GET_POST_COMMENTS, {
        variables: {
            "first": 1,
            "page": 1,
            "postId": _.get(postContext, '_id'),
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    const { data: subsData, loading, error } = useSubscription(SUBS_COMMENT, {
        variables: {
            "postId": _.get(postContext, '_id')
        }
    }
    );

    // useEffect(() => {
    //     refetch()
    // }, [!stateD.active])

    useEffect(() => {
        if (postComments) {
            setState((p) => ({ ...p, comList: _.get(postComments, 'comments.data') }))
        }
    }, [postComments])

    useEffect(() => {
        if (subsData) {
            setState((p) => ({ ...p, comList: [...p.comList, _.get(subsData, "subscComment")] }))
        }
    }, [subsData])

    return (
        <div className='px-1 md:px-5'>
            {
                state.comList && state.comList.length >= 1 && _.orderBy(state.comList, 'created_at', 'desc').map((item: CommentType) => (
                    <CommentSpec data={item} />
                ))
            }
        </div>
    )
}

export default CommentList