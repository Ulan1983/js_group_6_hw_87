import React, {Component, Fragment} from 'react';
import {createPost} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import PostForm from "../../components/UI/Form/PostForm";

class NewPost extends Component {
	createPost = async (postData) => {
		await this.props.createPost(postData);
	};

	render() {
		return (
			<Fragment>
				<h3>New post</h3>
				<PostForm
					onSubmit={this.createPost}
				/>
			</Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	createPost: postData => dispatch(createPost(postData))
});

export default connect(null, mapDispatchToProps)(NewPost);