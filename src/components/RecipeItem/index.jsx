import React from 'react'

import classnames from 'classnames/bind'
import style from './RecipeItem.module.scss'
import LoadingSkeleton from '../LoadingSkeleton'
import { Link } from 'react-router-dom'
const cx = classnames.bind(style)

function RecipeItem({ ...props }) {
  const item = props.item.recipe
  const id = item.uri.split('_')[1]
  return (
    <Link to={`/detail/${id}/recipe`}>
      <div className={cx('card')}>
        <div className={cx('top')}>
          <img src={item.image} className={cx('img-top')} alt="" />
          <div className={cx('info')}>
            <h3 className={cx('title')}>{item.label}</h3>
            <ul className={cx('nutritions')}>
              {item.healthLabels.map((label, index) => (
                <li key={index} className={cx('item')}>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={cx('body')}>
          <div className={cx('start')}>
            <p className={cx('quantity-servings')}>{item.yield} servings</p>
            <p className={cx('calories-total')}>
              {Math.round(item.calories / item.yield)}
              <span className={cx('unit')}> kcal</span>
            </p>
          </div>
          <div className={cx('center')}>
            <ul className={cx('digest', 'nutr-left')}>
              <li className={cx('protein')}>
                <span>{item.digest[2].label}</span>
                <span>{Math.round(item.digest[2].total) + 'g'}</span>
              </li>
              <li className={cx('fat')}>
                <span>{item.digest[0].label}</span>
                <span>{Math.round(item.digest[0].total) + 'g'}</span>
              </li>
              <li className={cx('carbs')}>
                <span>{item.digest[1].label}</span>
                <span>{Math.round(item.digest[1].total) + 'g'}</span>
              </li>
            </ul>
          </div>
          <div className={cx('end')}>
            <ul className={cx('digest', 'nutr-right')}>
              {item.digest.map(
                (nutr, index) =>
                  index > 2 &&
                  index < 9 && (
                    <li key={index}>
                      <span>{nutr.label}</span>
                      <span>{Math.round(nutr.total) + 'g'}</span>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  )
}

const Loading = () => {
  return (
    <div className={cx('card')}>
      <div className={cx('top')}>
        <LoadingSkeleton className="skeleton-img" height={150} />
        <div className={cx('info')}>
          <h3 className={cx('title')}>
            <LoadingSkeleton className="skeleton-text" height={30} />
          </h3>
          <ul className={cx('nutritions')}>
            {Array(5)
              .fill(0)
              .map((e, i) => (
                <LoadingSkeleton key={i} className="skeleton-text" />
              ))}
          </ul>
        </div>
      </div>
      <div className={cx('body')}>
        <div className={cx('start')}>
          <LoadingSkeleton className="skeleton-text" />
          <LoadingSkeleton className="skeleton-text" />
        </div>
        <div className={cx('center')}>
          <ul className={cx('digest', 'nutr-left')}>
            {Array(3)
              .fill(0)
              .map((e, i) => (
                <LoadingSkeleton key={i} className="skeleton-text" />
              ))}
          </ul>
        </div>
        <div className={cx('end')}>
          <ul className={cx('digest', 'nutr-right')}>
            {Array(4)
              .fill(0)
              .map((e, i) => (
                <LoadingSkeleton key={i} className="skeleton-text" />
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

RecipeItem.Loading = Loading

export default RecipeItem
