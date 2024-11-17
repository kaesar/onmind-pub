import { CardProps } from "@/model";
import Link from "next/link";

export default function Card({ slug, title, description, type }: CardProps) {
  return (
    <div
      className="group relative p-6 rounded-lg transform transition-all duration-300 hover:-translate-y-1
        bg-amber-100 dark:bg-gray-900/40
        shadow-lg dark:shadow-md dark:shadow-gray-950/50
        hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-amber-500/30
        before:absolute before:content-[''] before:left-0 before:top-0 before:w-full before:h-full before:shadow-inner before:rounded-lg
        border-t-8 border-amber-200 dark:border-amber-500
        dark:ring-1 dark:ring-amber-500/50"
    >
        {/* Subtle post-it fold effect */}
        <div className="absolute -top-[2px] -right-[2px] w-0 h-0 
            border-t-[20px] border-t-amber-200/90 dark:border-t-amber-500/90
            border-l-[20px] border-l-transparent
            transform rotate-0">
        </div>

        <div className="relative z-10">
            <h2 className="text-xl font-bold mb-3 text-amber-950 dark:text-amber-200">
              {title}
            </h2>
            <p className="mb-3 text-amber-900 dark:text-gray-300">
              {description}
            </p>
            <p className="text-sm text-amber-700 dark:text-gray-400 mb-4">
              {type}
            </p>
            <Link
              href={`/docs/sys/${slug}`}
              className="inline-block text-amber-800 dark:text-amber-300 
                hover:text-amber-950 dark:hover:text-amber-200 
                font-medium underline-offset-4 hover:underline
                transition-colors duration-200"
            >
              View Details
            </Link>
        </div>
    </div>
  );
}

/*
    <div
        key={component.slug}
        className="group relative p-6 rounded-lg transform transition-all duration-300 hover:-translate-y-1
        bg-amber-100 dark:bg-gray-900/40
        shadow-lg dark:shadow-md dark:shadow-gray-950/50
        hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-blue-500/30
        before:absolute before:content-[''] before:left-0 before:top-0 before:w-full before:h-full before:shadow-inner before:rounded-lg
        border-t-8 border-amber-200 dark:border-blue-500
        dark:ring-1 dark:ring-blue-500/50"
    >
        <div className="absolute -top-[2px] -right-[2px] w-0 h-0 
            border-t-[20px] border-t-amber-200/90 dark:border-t-blue-500/90
            border-l-[20px] border-l-transparent
            transform rotate-0">
        </div>

        <div className="relative z-10">
            <h2 className="text-xl font-bold mb-3 text-amber-950 dark:text-blue-200">
            {component.title}
            </h2>
            <p className="mb-3 text-amber-900 dark:text-gray-300">
            {component.description}
            </p>
            <p className="text-sm text-amber-700 dark:text-gray-400 mb-4">
            {component.type}
            </p>
            <Link
            href={`/docs/sys/${component.slug}`}
            className="inline-block text-amber-800 dark:text-blue-300 
                hover:text-amber-950 dark:hover:text-blue-200 
                font-medium underline-offset-4 hover:underline
                transition-colors duration-200"
            >
            View Details
            </Link>
        </div>
    </div>
*/
