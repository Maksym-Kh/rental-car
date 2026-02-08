'use client';

import { useEffect } from 'react';
import CarCard from '../CarCard/CarCard';
import css from './CarList.module.css';
import { useCarStore } from '@/store/useCarStore';
import clsx from 'clsx';
import Loader from '../Loader/Loader';

export default function CarList() {
  const { cars, page, totalPages, isLoading, fetchCars } = useCarStore();

  useEffect(() => {
    fetchCars(1);
  }, []);

  const handleLoadMore = () => {
    fetchCars(Number(page) + 1);
  };

  return (
    <div className={css.listContainer}>
      <div className={css.carListGrid}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {isLoading && <Loader text="Searching for your perfect car..." />}
      <div className={css.loadMoreBtnWrapper}>
        {page < totalPages && !isLoading && (
          <button
            className={clsx('primaryBtn', css.loadMoreBtn)}
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
