import React, { Component } from 'react';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.search(this.state.searchTerm);
        this.setState({ searchTerm: "" });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="mt-3 mb-3">
                <div className="input-group md-form form-sm form-2 pl-0">
                    <label htmlFor="searchTerm"></label>
                    <input 
                        id="searchTerm" 
                        name="searchTerm"
                        value={this.state.searchTerm}
                        placeholder="Search"
                        onChange={this.handleChange}
                        className="form-control my-0 py-1" 
                    />
                    <button className="input-group-text lighten-3"><i className="fa fa-search"></i></button>
                </div>
            </form>
        );
    }
}

export default SearchBar
