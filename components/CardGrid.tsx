'use client'
import { CardGridProps } from "@/model";
import CardItem from "./CardItem";
import CardFilter from "./CardFilter";
import { useState, useMemo } from "react";

export default function CardGrid({ components }: CardGridProps) {
  const [filters, setFilters] = useState({ title: '', tags: [] as string[] });

  // Get unique tags from all components
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    components.forEach(component => {
      (component.tags || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [components]);

  // Filter components based on title and tags
  const filteredComponents = useMemo(() => {
    return components.filter(component => {
      const matchesTitle = component.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      
      // Handle the case where tags might be undefined
      const componentTags = component.tags || [];
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.every(tag => componentTags.includes(tag));
  
      return matchesTitle && matchesTags;
    });
  }, [components, filters]);
  
  return (
    <div className="space-y-6">
      <CardFilter 
        onFilterChange={setFilters}
        availableTags={availableTags}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredComponents.map((component) => (
          <CardItem
            key={component.slug}
            {...component}
          />
        ))}
      </div>
    </div>
  );
}
