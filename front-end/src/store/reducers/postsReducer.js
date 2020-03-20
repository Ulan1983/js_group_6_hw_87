import {
	CREATE_POST_FAILURE,
	FETCH_POST_FAILURE,
	FETCH_POST_SUCCESS,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS
} from "../actions/postsActions";

const initialState = {
	posts: [],
	postsError: null,
	post: null,
	postError: null,
	createPostError: null
};

const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS_SUCCESS:
			return {...state, posts: action.posts};
		case FETCH_POSTS_FAILURE:
			return {...state, postsError: action.error};
		case FETCH_POST_SUCCESS:
			return {...state, post: action.post};
		case FETCH_POST_FAILURE:
			return {...state, postError: action.error};
		case CREATE_POST_FAILURE:
			return {...state, createPostError: action.error};
		default:
			return state;
	}
};

export default postsReducer;