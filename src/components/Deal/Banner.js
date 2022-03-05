import classes from './Banner.module.css'
import offerImg1 from '../../images/banner-1.jfif'
import offerImg2 from '../../images/banner-2.jpg'
import BannerItem from './BannerItem'
const Banner = (props) => {
  return (
    <section className={classes['banner-container']}>
      <BannerItem imgUrl={offerImg1} message={'special offer'} discount={0.2} />
      <BannerItem imgUrl={offerImg2} message={'Limited offer'} discount={0.3} />
    </section>
  )
}
export default Banner
