import { useState } from 'react';

interface CardFilterProps {
  onFilterChange: (filters: { title: string; tags: string[] }) => void;
  availableTags: string[];
}

export default function CardFilter({ onFilterChange, availableTags }: CardFilterProps) {
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onFilterChange({ title: e.target.value, tags: selectedTags });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange({ title: title, tags: newTags });
  };

  return (
    <div className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={title}
        onChange={handleTitleChange}
        className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
      />
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagToggle(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
