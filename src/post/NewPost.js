import React, { Component } from 'react';

import { create } from "./apiPost";
import { isAuthenticated } from "../auth/Index";
import Loading from '../loading/Loading';
import { Redirect } from 'react-router-dom';



class NewPost extends Component {

    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({user: isAuthenticated().user});
    }

    isValid = () => {
        const { title, body, fileSize, photo } = this.state;
        if (fileSize > 1000000) {
            this.setState({ error: "File size should be less than 1 MB", loading: false });
            return false;
        }
        if(photo.length === 0){
            this.setState({ error: "Photo is required", loading: false });
            return false;
        }
        if (title.length === 0) {
            this.setState({ error: "Title is required", loading: false });
            return false;
        }
        if (body.length === 0) {
            this.setState({ error: "Body is required", loading: false });
            return false;
        }
        return true;
    }
    shandleChange = e => {

        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        const fileSize = e.target.name === 'photo' ? e.target.files[0].size : 0;
        //Form Data method set
        this.postData.set(e.target.name, value);
     

        this.setState({
            error: "",
            [e.target.name]: value,
            fileSize,
          
        });
    };

    handleChange = e => {

        const value = e.target.name === 'photo' ? e.target.files[0] : e.target.value;
        const fileSize = e.target.name === 'photo' ? e.target.files[0].size : 0;
        //Form Data method set
        this.postData.set(e.target.name, value);
     

        this.setState({
            error: "",
            [e.target.name]: value,
            fileSize,
            [e.target.name]: URL.createObjectURL(e.target.files[0])
        });
    };

    clickSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true })
        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            create(userId, token, this.postData)
                .then(data => {
                    if (data.error) {
                        this.setState({ error: data.error, loading: false });
                    } else {
                        this.setState({ 
                            title: "",
                            body: "",
                            photo: "",
                            loading: false,
                            redirectToProfile: true
                        });
                        //console.log("NEW POST ",data);
                    }
                });
        }
    };

    newPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted"></label>
                <img src={this.state.photo} alt="photo"/>

                <input
                    onChange={this.handleChange}
                    name="photo"
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.shandleChange}
                    name="title"
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.shandleChange}
                    type="text"
                    name="body"
                    className="form-control"
                    value={body}
                />
            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create Post</button>
        </form>
    );

    render() {

        const { title, body, user, loading, error, redirectToProfile } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`}></Redirect>
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    this.newPostForm(title, body)
                )}
            </div>
        );
    }
}

export default NewPost;