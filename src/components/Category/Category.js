import classes from './Category.module.css'
import CategoryItem from './CategoryItem'
import { useSelector } from 'react-redux'
const Category = (props) => {
  const category = useSelector((state) => state.category.items)

  return (
    <section className={classes['category']} id="category">
      <h1 className={classes['heading']}>
        Shop by <span>Category</span>
      </h1>
      <div className={classes['box-container']}>
        {category.map((item) => (
          <CategoryItem
            key={item.id}
            id={item.id}
            discount={(item.discount * 100).toFixed()}
            name={item.name}
            imgURL={item.imgURL}
          />
        ))}
      </div>
    </section>
  )
}
export default Category
