import { apiNext } from './api';
import { Car, CarsResponse, CarFilters } from '@/type/car';

export const getBrands = async (): Promise<string[]> => {
  const { data } = await apiNext.get<string[]>('/brands');
  return data;
};

export const getCars = async (
  filters: CarFilters = {}
): Promise<CarsResponse> => {
  const { data } = await apiNext.get<CarsResponse>('/cars', {
    params: filters,
  });
  return data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const { data } = await apiNext.get<Car>(`/cars/${id}`);
  return data;
};
