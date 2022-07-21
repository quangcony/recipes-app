import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classnames from 'classnames/bind'
import style from './SimilarItem.module.scss'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

const cx = classnames.bind(style)

function SimilarItem({ item }) {
  const recipe = item.recipe
  const id = recipe.uri.split('_')[1]
  return (
    <div className={cx('similar-item')}>
      <Link to={`/detail/${id}/recipe`}>
        <div className={cx('content')}>
          <img
            src={recipe.image}
            className={cx('img-similar')}
            alt={recipe.label}
            title={recipe.label}
          />
          <div className={cx('info')}>
            <p className={cx('calories')}>
              Calories: {Math.round(recipe.calories) + 'kcal/' + recipe.yield}
            </p>
            <p className={cx('time')}>
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              {recipe.totalTime + 'min'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SimilarItem
