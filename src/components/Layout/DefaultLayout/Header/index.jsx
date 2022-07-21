import React from 'react'
import { Link } from 'react-router-dom'

import images from '../../../../assets/images'

import classnames from 'classnames/bind'
import style from './Header.module.scss'

const cx = classnames.bind(style)

function Header() {
  return (
    <>
      <header>
        <div className="container">
          <div className={cx('header')}>
            <Link to="/">
              <div className={cx('logo')}>
                <img
                  src={images.logo}
                  className={cx('img-logo')}
                  alt="Recipe Food"
                />
                <span className={cx('text-logo')}>Delicious</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
