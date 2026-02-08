import Image from 'next/image';
import { Car } from '@/type/car';
import css from './CarCard.module.css';
import Link from 'next/link';
import { useCarStore } from '@/store/useCarStore';
import clsx from 'clsx';

export default function CarCard({ car }: { car: Car }) {
  // Extracting city and country from address string
  const addressParts = car.address.split(',');
  const city = addressParts[addressParts.length - 2];
  const country = addressParts[addressParts.length - 1];

  const { favorites, toggleFavorite } = useCarStore();

  const isFavorite = favorites.includes(String(car.id));

  const handleFavoriteClick = () => {
    toggleFavorite(String(car.id));
  };

  return (
    <div className={css.card}>
      <div className={css.cardImageWrapper}>
        <Image
          src={car.img}
          alt={car.model}
          height={276}
          width={268}
          className={css.cardImage}
        ></Image>

        <button
          type="button"
          className={css.favoriteBtn}
          onClick={handleFavoriteClick}
          aria-label="Add to favorite"
        >
          <svg
            className={clsx(css.heartIcon, isFavorite && css.isFavorite)}
            width="18"
            height="18"
          >
            <use
              href={
                isFavorite ? '/sprite.svg#heart-filled' : '/sprite.svg#heart'
              }
            ></use>
          </svg>
        </button>
      </div>

      <div className={css.cardInfoTitle}>
        <div className={css.titleText}>
          <span>{car.brand}&nbsp;</span>
          <span className={css.model}>{car.model}</span>
          <span>, {car.year}</span>
        </div>
        <span className={css.cardPrice}>
          ${car.rentalPrice.toLocaleString()}
        </span>
      </div>

      <div className={css.cardDetails}>
        <p className={css.detailItem}>{city}</p>
        <span className={css.separator}>|</span>
        <p className={css.detailItem}> {country}</p>
        <span className={css.separator}>|</span>
        <p className={css.detailItem}>{car.rentalCompany}</p>
        <span className={css.separator}>|</span>

        <div className={css.break}></div>

        <p className={css.detailItem}>{car.type}</p>
        <span className={css.separator}>|</span>
        <p className={css.detailItem}>{car.mileage.toLocaleString()} km</p>
      </div>

      <Link
        href={`/catalog/${car.id}`}
        className={clsx('primaryBtn', css.cardBtn)}
      >
        Read more
      </Link>
    </div>
  );
}
