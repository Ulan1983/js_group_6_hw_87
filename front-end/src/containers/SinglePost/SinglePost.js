import React, {Component} from 'react';
import {fetchPost} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardText, Col, Form, FormGroup, Input, Label} from "reactstrap";
import PostThumbnail from "../../components/PostThumbnail/PostThumbnail";
import {createComment} from "../../store/actions/commentsActions";

class SinglePost extends Component {
	state = {
		comment: ''
	};

	componentDidMount() {
		this.props.fetchPost(this.props.match.params.id);
	}

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	createComment = async (event) => {
		event.preventDefault();

		await this.props.createComment(this.state);
	};

	render() {
		if (!this.props.post) return null;

		return (
			<Card>
				<CardBody>
					<PostThumbnail image={this.props.post.image}/>
					<CardText style={{marginTop: '10px'}}>
						<strong>Datetime: </strong>
						{this.props.post.datetime}
						<span> by <strong>{this.props.post.user.username}</strong></span>
					</CardText>
					<CardText>
						<strong>Title: </strong>
						{this.props.post.title}
					</CardText>
					<CardText>
						<strong>Description: </strong>
						{this.props.post.description}
					</CardText>
				</CardBody>
				{this.props.user ?
					<Form style={{padding: '10px', marginTop: '50px'}}
						onSubmit={this.createComment}
					>
						<h4>Add comment</h4>
						<FormGroup row>
							<Label sm={2} for="comment">Comment</Label>
							<Col sm={10}>
								<Input
									type="text" required
									name="comment" id="comment"
									placeholder="Enter comment"
									value={this.state.comment}
									onChange={this.inputChangeHandler}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Col sm={{offset:2, size: 10}}>
								<Button type="submit" color="primary">Add</Button>
							</Col>
						</FormGroup>
					</Form>
				: null }
			</Card>
		);
	}
}

const mapStateToProps = state => ({
	post: state.posts.post,
	postError: state.posts.postError,
	user: state.users.user
});

const mapDispatchToProps = dispatch => ({
	fetchPost: id => dispatch(fetchPost(id)),
	createComment: commentData => dispatch(createComment(commentData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);