import { CardGridProps } from "@/model";
import CardItem from "./CardItem";

export default function CardGrid({ components }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {components.map((component) => (
        <CardItem
            key={component.slug}
            {...component}
        />
      ))}
    </div>
  );
}
