import React, { useEffect, useState } from 'react'
import edamamApi from '../../api/edamamApi'
import SimilarItem from '../SimilarItem'

import classnames from 'classnames/bind'
import style from './SimilarList.module.scss'

const cx = classnames.bind(style)

function SimilarList({ dishType }) {
  const [items, setItems] = useState()

  useEffect(() => {
    const getList = async () => {
      const params = { dishType: dishType[0], random: true }
      const response = await edamamApi.getRecipeSimilar({ params })
      console.log(response.hits)
      setItems(response.hits)
    }
    getList()
  }, [dishType])
  return (
    <div className={cx('similar-list')}>
      {items && items.map((item, i) => <SimilarItem key={i} item={item} />)}
    </div>
  )
}

export default SimilarList
