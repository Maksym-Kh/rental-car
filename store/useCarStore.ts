import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car, CarsResponse, CarFilters } from '@/type/car';
import { getCars } from '@/lib/clientApi';

interface CarStore {
  cars: Car[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  favorites: string[];
  currentFilters: CarFilters;
  fetchCars: (page: number, filters?: CarFilters) => Promise<void>;
  toggleFavorite: (carId: string) => void;
  resetCars: () => void;
}

const initialState = {
  cars: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  currentFilters: {},
};

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      favorites: [],

      // Fetches cars with filters. Resets list for new search to ensure data accuracy
      fetchCars: async (page: number, filters: CarFilters = {}) => {
        set({ isLoading: true });

        const activeFilters =
          filters !== undefined ? filters : get().currentFilters;

        if (filters !== undefined) {
          set({ currentFilters: filters });
        }

        // Resetting the car list before fetching filtered results to ensure data accuracy as per Technical Task
        if (page === 1) {
          set({ cars: [] });
        }

        try {
          const queryParams = {
            page,
            limit: 12,
            ...activeFilters,
          };

          const data: CarsResponse = await getCars(queryParams);
          set(state => ({
            cars: page === 1 ? data.cars : [...state.cars, ...data.cars],
            page: data.page,
            totalPages: data.totalPages,
          }));
        } catch (error) {
          console.error('Fetch error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      toggleFavorite: (carId: number | string) => {
        const { favorites } = get();
        const targetId = String(carId);
        const hasId = favorites.includes(targetId);
        set({
          favorites: hasId
            ? favorites.filter(i => i !== targetId)
            : [...favorites, targetId],
        });
      },

      resetCars: () => set({ ...initialState }),
    }),
    {
      name: 'car-storage',
      partialize: state => ({ favorites: state.favorites }),
    }
  )
);
