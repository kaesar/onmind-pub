import { Dispatch, SetStateAction } from 'react';

export interface Component {
    title: string;
    description?: string;
    slug: string;
    tags?: string[];
}
  
export interface CardProps extends Component {}
  
export interface CardGridProps {
    components: Component[];
    defaultTags?: string[];
}

export interface CardFilterProps {
    onFilterChange: Dispatch<SetStateAction<{ title: string; tags: string[] }>>;
    availableTags: string[];
    defaultTags?: string[];
}
