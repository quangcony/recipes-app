import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import RecipeItem from '../../components/RecipeItem'
import edamamApi from '../../api/edamamApi'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCarrot,
  faMagnifyingGlass,
  faPizzaSlice,
  faWheatAwn,
  faWineGlass,
} from '@fortawesome/free-solid-svg-icons'

import Input from '../../components/Input'
import { Link } from 'react-router-dom'

import classnames from 'classnames/bind'
import style from './RecipeGrid.module.scss'
import ButtonOutline from '../ButtonOutline'

const cx = classnames.bind(style)

const RecipeGrid = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [nextLink, setNextLink] = useState()
  const [itemTo, setItemTo] = useState(1)
  const [count, setCount] = useState(0)
  const { pathname } = useLocation()
  const { keyword, country } = useParams()

  const cuisineType = [
    {
      display: 'All',
      icon: faWheatAwn,
      path: '/',
    },
    {
      display: 'Chinese',
      icon: faPizzaSlice,
      path: '/Chinese',
    },
    {
      display: 'French',
      icon: faWineGlass,
      path: '/French',
    },
    {
      display: 'Japanese',
      icon: faCarrot,
      path: '/Japanese',
    },
  ]

  const active = cuisineType.findIndex((e) => {
    return e.path === pathname.substring(pathname.lastIndexOf('/'))
  })

  useEffect(() => {
    const getList = async () => {
      let response = null

      if (keyword === undefined) {
        const params =
          country === undefined
            ? { q: 'chicken' }
            : { q: 'chicken', cuisineType: country }
        response = await edamamApi.getRecipeSearch({ params })
        console.log(response)
      } else {
        const params =
          country === undefined
            ? {
                q: keyword,
              }
            : { q: keyword, cuisineType: country }

        response = await edamamApi.getRecipeSearch({ params })
      }

      setItems(shuffle(response.hits))
      setNextLink(response._links['next'].href)
      setLoading(false)
      setCount(response.count)
    }
    getList()
  }, [keyword, country])

  const shuffle = (arr) => {
    let currentIndex = arr.length,
      randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ]
    }
    return arr
  }

  const loadMore = async () => {
    const response = await axios.get(nextLink).then((response) => response.data)
    console.log(response)
    setItems([...items, ...response.hits])
    setNextLink(response._links['next'].href)
    setItemTo(response.to)
  }

  return (
    <>
      <div className={cx('content-top')}>
        <div className={cx('search')}>
          <RecipeSearch keyword={keyword} />
          <div className={cx('icon-search')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        <nav>
          <div className={cx('nav')}>
            <ul className={cx('nav-list')}>
              {cuisineType.map((e, i) => (
                <li
                  key={i}
                  className={cx('nav-item', i === active ? 'active' : '')}
                >
                  <Link
                    to={
                      keyword === undefined
                        ? e.path
                        : '/search/' + keyword + e.path
                    }
                  >
                    <FontAwesomeIcon icon={e.icon} className={cx('icon')}/>
                    <p>{e.display}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className={cx('content-body')}>
        <section className={cx('section')}>
          <h3 className={cx('title')}>
            Recipe
            {keyword !== undefined && country !== undefined ? (
              <span>
                {' '}
                "{keyword}-{country}"
              </span>
            ) : keyword !== undefined ? (
              <span> "{keyword}"</span>
            ) : country !== undefined ? (
              <span> "{country}"</span>
            ) : (
              ''
            )}
          </h3>
          <div className={cx('recipes')}>
            {loading &&
              Array(4)
                .fill(0)
                .map((e, i) => <RecipeItem.Loading key={i} />)}
            {!loading &&
              items.map((item) => (
                <RecipeItem key={item.recipe.uri.split('_')[1]} item={item} />
              ))}
          </div>
        </section>
        <div className={cx('loadmore')}>
          {itemTo < count && (
            <ButtonOutline
              onClick={loadMore}
              text="Load more"
              className="btn-loadmore"
            />
          )}
        </div>
      </div>
    </>
  )
}

const RecipeSearch = (props) => {
  let navigate = useNavigate()
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/search/${keyword}/`)
      document.querySelector('[type="search"]').blur()
    }
  }, [keyword, navigate])

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault()
      if (e.keyCode === 13) {
        goToSearch()
      }
    }
    document.addEventListener('keyup', enterEvent)
    return () => {
      document.removeEventListener('keyup', enterEvent)
    }
  }, [keyword, goToSearch])

  return (
    <>
      <Input
        type="search"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <ButtonOutline onClick={(e) => goToSearch()} icon={true} text={''} />
    </>
  )
}

export default RecipeGrid
