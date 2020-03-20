import {push} from 'connected-react-router';

import axiosApi from "../../axiosApi";

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

export const createCommentSuccess = () => ({type: CREATE_COMMENT_SUCCESS});
export const createCommentFailure = error => ({type: CREATE_COMMENT_FAILURE, error});

export const createComment = commentData => {
	return async (dispatch, getState) => {
		try {
			const user = getState().users.user;
			await axiosApi.post('/comments', commentData, {headers: {'Authorization': 'Token ' + user.token}});
			dispatch(createCommentSuccess());
			dispatch(push('/'));
		} catch (error) {
			dispatch(createCommentFailure(error));
		}
	}
};
