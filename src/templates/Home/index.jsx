import { Component } from 'react';

import './styles.css';

import { Posts } from '../../Components/Posts';
import { loadPosts } from "../../utils/load-posts";
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';
export class Home extends Component {
  state = {
    allPosts: [],
    posts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };

  async componentDidMount() {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}
          <TextInput handleChange={this.handleChange} searchValue={searchValue} />
        </div>
        {filteredPosts.length > 0 ? (<Posts posts={filteredPosts} />) : (<p>Nenhum resultado encontrado!</p>)}
        <div className='button-container'>
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    )
  }
}

export default Home;
