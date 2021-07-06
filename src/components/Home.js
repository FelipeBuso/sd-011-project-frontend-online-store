import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import CategoryList from './CategoryList';
import ProductSearch from './ProductSearch';
import Search from '../img/search-solid.svg';
import '../css/Section.css';
import CartIcon from '../img/shopping-cart-solid.svg';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      categoryId: '',
      dataApi: [],
      request: false,
      sum: 0,
    };

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.sumCartItems();
  }

  onSearchTextChange(event) {
    const { target } = event;
    this.setState({
      query: target.value,
    });
  }

  fetchProducts = async (id) => {
    const { query, categoryId } = this.state;
    this.setState({ request: true, categoryId: id },
      async () => {
        const dataProducts = await api.getProductsFromCategoryAndQuery(categoryId, query);
        this.setState({
          dataApi: dataProducts.results,
          request: false,
          query: '',
        });
      });
  }

  sumCartItems = () => {
    const storage = { ...localStorage };
    const response = Object.values(storage).map((e) => JSON.parse(e));
    const total = response.reduce((acc, curr) => acc + curr.counter, 0);
    this.setState({ sum: total });
  }

  render() {
    const { dataApi, request, query, sum } = this.state;
    return (
      <>
        <div className="cart-screen">
          <span data-testid="shopping-cart-size">{ sum }</span>
          <Link to="/cart">
            <button
              type="button"
              className="cart-scree"
              data-testid="shopping-cart-button"
            >
              <img src={ CartIcon } alt="" width="20" />
            </button>
          </Link>
        </div>
        <p className="info" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CategoryList fetchProducts={ this.fetchProducts } />

        <section className="searchbar">
          <input
            className="search-txt"
            placeholder="Search"
            data-testid="query-input"
            type="text"
            onChange={ this.onSearchTextChange }

          />
          <button
            className="searchbar-btn"
            data-testid="query-button"
            type="button"
            onClick={ () => this.fetchProducts() }
            query={ query }
          >
            <img src={ Search } alt="" width="20" />
          </button>
        </section>

        <ProductSearch products={ dataApi } request={ request } />
      </>
    );
  }
}
