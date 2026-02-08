import CarList from '@/components/CarList/CarList';
import Filter from '@/components/Filter/Filter';
import css from './page.module.css';

export default function CatalogPage() {
  return (
    <main className="headerOffset">
      <section className="container">
        <Filter />
        <CarList />
      </section>
    </main>
  );
}
