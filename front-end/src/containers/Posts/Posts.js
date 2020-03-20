import React, {Component, Fragment} from 'react';
import {fetchPosts} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import PostList from "../../components/PostList/PostList";

class Posts extends Component {
	componentDidMount() {
		this.props.fetchPosts();
	}

	render() {
		return (
			<Fragment>
				{this.props.posts.map(post => (
					<PostList
						key={post._id}
						id={post._id}
						image={post.image}
						datetime={post.datetime}
						user={post.user.username}
						title={post.title}
					/>
				))}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	posts: state.posts.posts,
	postsError: state.posts.postsError
});

const mapDispatchToProps = dispatch => ({
	fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);