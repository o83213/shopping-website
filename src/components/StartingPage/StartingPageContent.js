import classes from './StartingPageContent.module.css'
import homeImg from '../../images/home-img.jpg'
const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <div className={classes.image}>
        <img src={homeImg} alt="" />
      </div>

      <div className={classes.content}>
        <span>Fresh and Delicious</span>
        <h3>World Class Seafood!</h3>
        {/* <a href="#" class="btn">get started!</a> */}
      </div>
    </section>
  )
}

export default StartingPageContent
