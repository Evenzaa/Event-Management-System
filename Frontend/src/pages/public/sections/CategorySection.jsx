import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/common/Container';
import SectionHeader from '../../../components/common/SectionHeader';
import CategoryPill from '../../../components/event/CategoryPill';


export default function CategorySection({ categories, onCategorySelect }) {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);

  function handleSelect(category) {
    setActiveId(category.id);
    onCategorySelect?.(category);
    navigate(`/event-listing?category=${category.id}`);
  }

  function handleViewAll() {
    navigate('/event-listing');
  }

  return (
    <section className="py-12">
      <Container>
        <SectionHeader
          title="Browse by Category"
          actionLabel="View All"
          onActionClick={handleViewAll}
        />
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <CategoryPill
              key={category.id}
              category={category}
              isActive={category.id === activeId}
              onClick={handleSelect}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
