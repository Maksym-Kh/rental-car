'use client';

import { useEffect, useState, useRef } from 'react';
import css from './Filter.module.css';
import { getBrands } from '@/lib/clientApi';
import { useCarStore } from '@/store/useCarStore';
import clsx from 'clsx';

export default function Filter() {
  const { fetchCars } = useCarStore();
  const [brands, setBrands] = useState<string[]>([]);

  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const priceOptions: number[] = [];
  for (let i = 30; i <= 200; i += 10) {
    priceOptions.push(i);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        brandRef.current &&
        !brandRef.current.contains(event.target as Node)
      ) {
        setIsBrandOpen(false);
      }
      if (
        priceRef.current &&
        !priceRef.current.contains(event.target as Node)
      ) {
        setIsPriceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    getBrands().then(data => setBrands(data));
  }, []);

  const handleSearch = () => {
    const cleanMin = minMileage.replaceAll(',', '');
    const cleanMax = maxMileage.replaceAll(',', '');

    const filters = {
      brand: brand,
      rentalPrice: price ? String(price) : undefined,
      minMileage: cleanMin ? Number(cleanMin) : undefined,
      maxMileage: cleanMax ? Number(cleanMax) : undefined,
    };

    fetchCars(1, filters);
  };

  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchBrandsData();
  }, []);

  // Formatting mileage with a space separator
  const formatNumber = (value: string) => {
    if (!value) return '';
    const number = value.replace(/\D/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleMileageChange = (value: string, type: 'min' | 'max') => {
    const cleanValue = value.replace(/,/g, '');
    if (isNaN(Number(cleanValue)) && cleanValue !== '') return;

    if (type === 'min') {
      setMinMileage(cleanValue);
    } else {
      setMaxMileage(cleanValue);
    }
  };

  return (
    <div className={css.filterWrapper}>
      <div className={css.selectWrapper} ref={brandRef}>
        <span className={css.filterInfo}>Car brand</span>
        <div
          className={css.customSelect}
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
          <span className={clsx(!brand && css.placeholder)}>
            {brand || 'Choose a brand'}
          </span>
          <svg
            className={clsx(css.selectIcon, isBrandOpen && css.rotated)}
            width="16"
            height="16"
          >
            <use href="/sprite.svg#chevron-down"></use>
          </svg>
        </div>

        {isBrandOpen && (
          <ul className={css.optionsList}>
            {brands.map(b => (
              <li
                key={b}
                className={clsx(css.option, b === brand && css.optionSelected)}
                onClick={() => {
                  setBrand(b);
                  setIsBrandOpen(false);
                }}
              >
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={css.selectWrapper} ref={priceRef}>
        <span className={css.filterInfo}>Price/ 1 hour</span>
        <div
          className={css.customSelect}
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <span className={clsx(!price && css.placeholder)}>
            {price ? `To $${price}` : 'Choose a price'}
          </span>
          <svg
            className={clsx(css.selectIcon, isPriceOpen && css.rotated)}
            width="16"
            height="16"
          >
            <use href="/sprite.svg#chevron-down"></use>
          </svg>
        </div>

        {isPriceOpen && (
          <ul className={css.optionsList}>
            {priceOptions.map(p => (
              <li
                key={p}
                className={clsx(css.option, p === price && css.optionSelected)}
                onClick={() => {
                  setPrice(p);
                  setIsPriceOpen(false);
                }}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={css.filterInfoWrapper}>
        <span className={css.filterInfo}>Сar mileage / km</span>
        <div className={css.mileageWrapper}>
          <label className={css.mileageLabel}>
            <span>From</span>
            <input
              id="mileage-left-input"
              type="text"
              className={css.mileageInputLeft}
              value={formatNumber(minMileage)}
              onChange={e => handleMileageChange(e.target.value, 'min')}
            />
          </label>
          <label className={css.mileageLabel}>
            <span>To</span>
            <input
              id="mileage-right-input"
              type="text"
              className={css.mileageInputRight}
              value={formatNumber(maxMileage)}
              onChange={e => handleMileageChange(e.target.value, 'max')}
            />
          </label>
        </div>
      </div>
      <button
        className={clsx('primaryBtn', css.filterBtn)}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
