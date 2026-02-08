'use client';

import { getCarById } from '@/lib/clientApi';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Car } from '@/type/car';
import Image from 'next/image';
import css from './page.module.css';
import { Toaster } from 'react-hot-toast';
import BookingForm from '@/components/BookingForm/BookingForm';
import Loader from '@/components/Loader/Loader';

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCarData = async () => {
      try {
        setLoading(true);
        const data = await getCarById(id as string);
        setCar(data);
      } catch (err) {
        console.error('Error during loading:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  if (loading) {
    <Loader text="Loading..." />;
  }

  if (error || !car) {
    return (
      <div className={css.errorContainer}>
        <p>Car not found.</p>
        <button onClick={() => router.push('/catalog')} className={css.backBtn}>
          Back to Catalog
        </button>
      </div>
    );
  }

  const addressParts = car.address.split(',');
  const city = addressParts[1]?.trim();
  const country = addressParts[2]?.trim();

  return (
    <section className="headerOffset">
      <div className="container">
        <Toaster />
        <div className={css.detailsWrapper}>
          <div>
            <div className={css.detailsImageWrapper}>
              <Image
                src={car.img}
                alt={car.brand}
                width={640}
                height={512}
                className={css.detailsImage}
                priority
              />
            </div>
            <BookingForm />
          </div>

          <div className={css.detailsContent}>
            <div className={css.mainInfo}>
              <h1 className={css.detailsTitle}>
                <span>{car.brand}&nbsp;</span>
                <span>{car.model}</span>
                <span>, {car.year}</span>
                <span className={css.detailsId}>&nbsp;{car.id}</span>
              </h1>
              <div className={css.detailsInfoWrapper}>
                <span className={css.detailsInfo}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#pin"></use>
                  </svg>
                  {city},
                </span>
                <span className={css.detailsInfo}>&nbsp;{country}</span>
                <span className={css.detailsInfo}>
                  Mileage:&nbsp;{car.mileage.toLocaleString()}&nbsp;km
                </span>
              </div>
              <div className={css.detailsPrice}>${car.rentalPrice}</div>
              <p className={css.detailsDescription}>{car.description}</p>
            </div>

            <div className={css.detailedSpecs}>
              <div className={css.rentalConditionsWrapper}>
                <h2 className={css.detailsContentTitle}> Rental Conditions:</h2>
                <div className={css.detailsContentWrapper}>
                  {car.rentalConditions.map((item, index) => (
                    <p key={index} className={css.detailsContentParagraph}>
                      <svg width="16" height="16">
                        <use href="/sprite.svg#check"></use>
                      </svg>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div className={css.carSpecificationWrapper}>
                <h2 className={css.detailsContentTitle}>Car Specifications:</h2>
                <div className={css.detailsContentWrapper}>
                  <p className={css.detailsContentParagraph}>
                    <svg width="16" height="16">
                      <use href="/sprite.svg#calendar"></use>
                    </svg>
                    Year:&nbsp;{car.year}
                  </p>
                  <p className={css.detailsContentParagraph}>
                    <svg width="16" height="16">
                      <use href="/sprite.svg#car"></use>
                    </svg>
                    Type:&nbsp;{car.type}
                  </p>
                  <p className={css.detailsContentParagraph}>
                    <svg width="16" height="16">
                      <use href="/sprite.svg#fuel"></use>
                    </svg>
                    Fuel consumption:&nbsp;{car.fuelConsumption}
                  </p>
                  <p className={css.detailsContentParagraph}>
                    <svg width="16" height="16">
                      <use href="/sprite.svg#gear"></use>
                    </svg>
                    Engine Size:&nbsp;{car.engineSize}
                  </p>
                </div>
              </div>
              <div className={css.accessories}>
                <h2 className={css.detailsContentTitle}>
                  Accessories and functionalities:
                </h2>
                <div className={css.detailsContentWrapper}>
                  {car.functionalities.map((item, index) => (
                    <p key={index} className={css.detailsContentParagraph}>
                      <svg width="16" height="16">
                        <use href="/sprite.svg#check"></use>
                      </svg>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
