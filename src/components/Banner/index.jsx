import { default as imgs } from '../../assets/images'

import classnames from 'classnames/bind'
import style from './Banner.module.scss'

const cx = classnames.bind(style)

function Banner({ item }) {
  const image = item.images.LARGE || item.images.REGULAR
  return (
    <div
      className={cx('banner')}
      style={{ backgroundImage: 'url(' + image.url + '' }}
    >
      <img src={imgs.chef} className={cx('img-banner')} alt="Chef Banner" />
      <div className={cx('info')}>
        <h3 className={cx('title')}>{item.label}</h3>
        <div className={cx('nutrs-block')}>
          <ul className={cx('nutr', 'nutr-left')}>
            <li>
              Calories:{' '}
              {Math.round(item.calories / item.yield) + 'Kcal/' + item.yield}
            </li>
            <li>Meal type: {item.mealType}</li>
            <li>Cuisine type: {item.cuisineType}</li>
            <li>Total time: {item.totalTime} minute</li>
          </ul>
          <ul className={cx('nutr', 'nutr-right')}>
            {Object.keys(item.totalNutrients).map((key, i) => {
              if (key.startsWith('VIT')) {
                return (
                  <li key={i}>
                    {item.totalNutrients[key].label}
                    <span className={cx('quantity')}>
                      {Math.round(item.totalNutrients[key].quantity) +
                        item.totalNutrients[key].unit}
                    </span>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
      <div className={cx('overlay-bg')}></div>
    </div>
  )
}

export default Banner
