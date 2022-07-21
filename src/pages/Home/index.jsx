import RecipeGrid from '../../components/RecipeGrid'
import classnames from 'classnames/bind'
import style from './Home.module.scss'

const cx = classnames.bind(style)

function Home() {
  return (
    <div className={cx('container')}>
      <RecipeGrid />
    </div>
  )
}

export default Home
