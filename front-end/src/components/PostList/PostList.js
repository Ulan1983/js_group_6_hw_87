import React from 'react';
import {Card, CardBody, CardText} from "reactstrap";
import PostThumbnail from "../PostThumbnail/PostThumbnail";
import {Link} from "react-router-dom";

const PostList = props => {
	return (
		<Card style={{marginTop: '10px'}}>
			<CardBody>
				<PostThumbnail image={props.image}/>
				<CardText style={{marginTop: '10px'}}>
					{props.datetime} by
					<span> {props.user}</span>
				</CardText>
				<Link to={'/posts/' + props.id}>
					{props.title}
				</Link>
			</CardBody>
		</Card>
	);
};

export default PostList;