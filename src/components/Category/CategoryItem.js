import classes from './CategoryItem.module.css'
import { getStorage, ref, getDownloadURL } from '../../firebase'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { productAction } from '../../store/product-slice'
const CategoryItem = (props) => {
  const [url, setUrl] = useState()
  const [categoryName, setCategoryName] = useState('')
  const dispatch = useDispatch()
  //
  useEffect(() => {
    const fetchURL = async () => {
      const storage = getStorage()
      const reference = ref(storage, props.imgURL)
      const res = await getDownloadURL(reference)
      setUrl(res)
    }
    fetchURL()
    setCategoryName(props.name)
  }, [props.imgURL, props.name])
  const changeSortingHandler = () => {
    dispatch(
      productAction.changeSorting({
        sortingType: 'category',
        sortingValue: categoryName,
      }),
    )
  }
  return (
    <div className={classes['box']}>
      <h3>{props.name}</h3>
      <p>up to {`${props.discount}`}% off</p>
      <img src={url} alt="" />
      <br />
      <button className="Button" onClick={changeSortingHandler}>
        <Link to="products">shop now!</Link>
      </button>
    </div>
  )
}

export default CategoryItem
