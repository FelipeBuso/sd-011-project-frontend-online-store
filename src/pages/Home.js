import React, { Component } from 'react';
import Categories from '../components/Categories';
import SearchInput from '../components/SearchInput';
import SearchList from '../pages/SearchList';
import * as api from '../services/api';
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      inputText: [],
      products: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getQuery = async (product) => {
    const getList = await api.getProductsFromCategoryAndQuery('MLB1071', product);
    return this.setState({ products: getList.results });
  };

  componentDidMount() {
    const { product, searchQuery } = this.props;
    if (product) {
      this.getQuery(searchQuery);
    }
  }

  componentDidUpdate() {
    const { product, searchQuery } = this.props;
    this.getQuery(searchQuery);
  }

  handleInput = ({ target }) => {
    this.setState({ inputText: target.value });
  };

  handleSubmit = (event) => {
    const { inputText } = this.state;
    event.preventDefault();
    this.props.sendSubmit(inputText);
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="home-div">
        <Categories />
        <SearchInput handleSubmit={this.handleSubmit} handleInput={this.handleInput} />
        <SearchList products={this.state.products} />
      </div>
    );
  }
}
