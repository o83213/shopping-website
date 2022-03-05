import classes from './Products.module.css'
import ProductItem from './ProductItem'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Products = (props) => {
  const [product, setProduct] = useState([])
  const { items, sortingType, sortingValue } = useSelector(
    (state) => state.product,
  )
  useEffect(() => {
    const sortedProductItems = items.filter((item) => {
      if (!sortingType) {
        return true
      }
      return (
        `${item[sortingType]}`.toLowerCase() === `${sortingValue}`.toLowerCase()
      )
    })
    setProduct(sortedProductItems)
  }, [items, sortingType, sortingValue])

  return (
    <section className={classes['product']}>
      <h1 className={classes['heading']}>
        Latest <span>Product</span>
      </h1>

      <div className={classes['box-container']}>
        {product.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            discount={item.discount}
            imgURL={item.imgURL}
          />
        ))}
      </div>
    </section>
  )
}
export default Products
