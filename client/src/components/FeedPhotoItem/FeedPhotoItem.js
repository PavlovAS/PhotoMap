import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import PhotoModal from '../../modals/PhotoModal';
import './styles.css';

export class FeedPhotoItem extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>
                <div className="text-center" id="feedPhotoItem">
                    <div onClick={this.open}>
                        <img src={this.props.photo.url} alt="photo"/>
                        <h1>{this.props.photo.title}</h1>
                        <p>{this.props.photo.description}</p>
                        <p>by {this.props.photo.name}</p>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
<<<<<<< HEAD
=======
                    contentLabel="Minimal Modal Example"
                    className="modal"
>>>>>>> c9c7fa980b289650c4c129c67ab8e375154fda28
                >
                    <PhotoModal photoId={this.props.photo._id} close={this.close}></PhotoModal>
                </Modal>
            </div>
        );
    }
}

export default FeedPhotoItem
