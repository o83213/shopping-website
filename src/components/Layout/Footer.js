import {
  FaShip,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa'
import classes from './Footer.module.css'
const locationContent = (
  <ul>
    <li>Taiwan</li>
    <li>India</li>
    <li>Usa</li>
    <li>China</li>
    <li>Japan</li>
  </ul>
)
const quickLinkContent = (
  <ul>
    <li>Home</li>
    <li>Category</li>
    <li>Product</li>
    <li>Deal</li>
    <li>Contact</li>
  </ul>
)
const downAppContent = (
  <ul>
    <li>Google Play</li>
    <li>Apple Store</li>
  </ul>
)
const Footer = (props) => {
  return (
    <section className={classes.footer}>
      <div className={classes['box-container']}>
        <div className={classes.box}>
          <div className={classes.logo}>
            <FaShip /> <span>Mr.Sea</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. At
            elementum eu facilisis sed odio.
          </p>
          <div className={classes.share}>
            <div className={classes.logo}>
              <FaFacebook />
            </div>
            <div className={classes.logo}>
              <FaTwitter />
            </div>
            <div className={classes.logo}>
              <FaInstagram />
            </div>
            <div className={classes.logo}>
              <FaLinkedin />
            </div>
          </div>
        </div>
        <div className={classes.box}>
          <h3>Our location</h3>
          {locationContent}
        </div>

        <div className={classes.box}>
          <h3>Quick Links</h3>
          {quickLinkContent}
        </div>

        <div className={classes.box}>
          <h3>Download App</h3>
          {downAppContent}
        </div>
      </div>
      <h1 className={classes.credit}>
        create by <span> brain </span> |all rights reserved!|
      </h1>
    </section>
  )
}
export default Footer
