import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadPhotoMongo } from '../../actions/photoUpload/photoUploadMongo';
import Spinner from '../layout/Spinner';

const UploadDetails = ({
	uploadPhotoMongo,
	photo: { photo, loading },
	auth: { user },
	history,
}) => {
	const [formData, setFormData] = useState({
		url: photo.url,
		imageName: photo.imageName,
		name: user.name,
		avatar: user.avatar,
		title: '',
		description: '',
		camera: '',
		focalLength: '',
		shutterSpeed: '',
		ISO: '',
		keywords: '',
	});

	const {
		url,
		imageName,
		title,
		description,
		camera,
		focalLength,
		shutterSpeed,
		ISO,
		keywords,
	} = formData;

	const uploadHandle = (e) => {
		e.preventDefault();
		console.log('$$$ user=', user);
		console.log('$$$ formData=', formData);
		uploadPhotoMongo(formData, history);
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return loading === true ? (
		<Spinner />
	) : (
		<div className="container-fluid" id="uploadDetails">
			<div className="row m-4">
				<div className="col-md-3 m-1 mr-auto text-center">
					<img src={photo.url} alt="uploading a photo" />
				</div>
				<div className="col-md-8 m-1">
					<form>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input
								value={title}
								type="text"
								className="form-control"
								name="title"
								placeholder="e.g. Cherry Blossom trees in Vancouver"
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<textarea
								value={description}
								type="text"
								className="form-control"
								name="description"
								rows="5"
								placeholder="e.g. Early April, Sequoia road in Burnaby, British Columbia, beautiful cherry blossoms."
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="keywords">Keywords</label>
							<textarea
								value={keywords}
								type="text"
								className="form-control"
								name="keywords"
								rows="5"
								placeholder="cherry blossoms, Vancouver, Brithis Columbia, Beauty in Nature, Spring, Nature, Beautiful city"
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary mr-2"
								type="button"
								onClick={(e) => uploadHandle(e)}
							>
								Upload
							</button>
							<button className="btn btn-light" type="button">
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

UploadDetails.propTypes = {
	auth: PropTypes.object.isRequired,
	photo: PropTypes.object.isRequired,
	uploadPhotoMongo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	photo: state.photoUpload,
	user: state.auth,
});

export default connect(mapStateToProps, { uploadPhotoMongo })(
	withRouter(UploadDetails)
);
