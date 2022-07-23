import React, { useEffect, useState } from 'react'
import Banner from '../../components/Banner'

import classnames from 'classnames/bind'
import style from './Detail.module.scss'
import { useParams } from 'react-router-dom'
import edamamApi from '../../api/edamamApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import SimilarList from '../../components/SimilarList'
import ScrollButton from '../../components/ScrollButton'

const cx = classnames.bind(style)

function Detail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const getDetail = async () => {
      const params = {}
      let response = null
      response = await edamamApi.getRecipeDetail(id, { params })
      console.log(response)
      setItem(response.recipe)
    }
    getDetail()
  }, [id])

  return (
    <>
      {item && <Banner item={item} />}
      <div className="container">
        {item && (
          <div className={cx('recipe-content')}>
            <div className={cx('recipe')}>
              <div className={cx('img-recipe')}>
                <img src={item.image} alt="" />
                <span className={cx('bd-top-left')}></span>
                <span className={cx('bd-top-right')}></span>
                <span className={cx('bd-bottom-left')}></span>
                <span className={cx('bd-bottom-right')}></span>
              </div>
              <div className={cx('rating')}>
                <span>Rating: </span>
                {Array(5)
                  .fill(0)
                  .map((e, i) => (
                    <span key={i} className={cx('start')}>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  ))}
                <span> 5.0/5 (20 vote)</span>
              </div>
              <div className={cx('ingredients')}>
                <h3 className={cx('title')}>Ingredients</h3>
                <div className={cx('info')}>
                  <table>
                    <thead>
                      <tr>
                        <th>Food</th>
                        <th>Quantity</th>
                        <th>Weight</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.ingredients.map((e, i) => (
                        <tr key={i}>
                          <td>{e.text}</td>
                          <td>{Math.round(e.quantity * 100) / 100}</td>
                          <td>{Math.round(e.weight * 100) / 100}</td>
                          <td>
                            <img
                              src={e.image}
                              className={cx('img-ingredient')}
                              alt={e.food}
                              title={e.food}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <aside className={cx('similar')}>
              <h3 className={cx('title')}>Similar</h3>
              <div className={cx('similar-recipe')}>
                <SimilarList dishType={item.dishType} />
              </div>
            </aside>
          </div>
        )}
      </div>
      <ScrollButton />
    </>
  )
}

export default Detail
