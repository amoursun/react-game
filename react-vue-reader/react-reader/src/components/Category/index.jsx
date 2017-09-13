import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Loading from '../Loading'
import imgError from '../../assets/js/imgError'

import './index.css'

class Category extends Component {
  constructor() {
    super()

    this.state = {
      categoryList: [],
      loading: false
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.getCategory(this.props.location.query.type)
  }

  getCategory(type) {
    this.setState({
      loading: true
    })
    fetch(`${this.props.api}/type?type=${type}`)
      .then(res => res.json())
      .then(res => {
        // this.loading = false
        this.setState({
          categoryList: res,
          loading: false
        })
      })
  }

  title() {
    switch (this.props.location.query.type) {
      case '1':
        return '玄幻'
      case '2':
        return '修真'
      case '3':
        return '都市'
      case '4':
        return '历史'
      case '5':
        return '网游'
      default:
        return '分类'
    }
  }

  goBack = () => {
    this.context.router.goBack()
  }

  render() {
    const {loading} = this.state
    return (
      <div className="category">
        {loading && <Loading className="loading"/>}
        {!loading &&
          <div className="category-header">
            <a onClick={this.goBack}>
              <h2><i className="iconfont icon-fanhui"></i>{this.title()}</h2>
            </a>
          </div>}
        {!loading &&
          < div className="category-list">
            < ul>
              {this.state.categoryList.map((item, idx) =>
                <li key={idx}>
                  <Link to={`/bookdetail/${item.id}`}>
                    <div className="book-image">
                      <img src={item.images} alt="" onError={imgError}/>
                    </div>
                    <div className="book-detail">
                      <h3>{item.name}</h3>
                      <p>{item.intro}</p>
                      <div className="author">
                        <i className="iconfont icon-yonghu"></i>
                        <span>{item.author}</span>
                      </div>
                      <div className="category-r">
                        <span>{this.title()}</span>
                        <span>{item.serialize}</span>
                        <span>{item.wordcount}万字</span>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  api: state.api
})

export default connect(mapStateToProps)(Category)
