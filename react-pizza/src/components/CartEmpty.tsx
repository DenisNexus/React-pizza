import {Link} from 'react-router-dom'

const CartEmpty = () => {
  return (
    <div className="content">
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Кошик пустий 😕</h2>
        <p>
          Найімовірніше, ви не замовляли ще піцу.<br />
          Для того, щоб замовити піцу, перейди на головну сторінку.
        </p>
        <img src="/img/empty-cart.png" alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутися назад</span>
        </Link>
      </div>
      </div>
      </div>
  )
}

export default CartEmpty