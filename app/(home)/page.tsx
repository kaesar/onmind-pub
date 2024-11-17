import Link from 'next/link';
import CardGrid from '@/components/CardGrid';
import { promises as fs } from 'fs';
import path from 'path';

export default async function HomePage() {
  /*let components = [{
    "slug": "button",
    "title": "Button",
    "description": "A button component",
    "type": "button"
  }]*/
  const indexPath = path.join(process.cwd(), 'content/docs/_index.json');
  const components = JSON.parse(await fs.readFile(indexPath, 'utf8'));
  
  return (
    <main className="flex flex-1 flex-col items-center p-8">
      <h1 className="mb-8 text-3xl font-bold">Component Showcase</h1>
      <CardGrid components={components} />
      <p className="mt-8 text-fd-muted-foreground">
        View complete{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          documentation
        </Link>
      </p>
    </main>
  );
}

/* <main className="flex flex-1 flex-col justify-center text-center">
  <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
  <p className="text-fd-muted-foreground">
    You can open{' '}
    <Link
      href="/docs"
      className="text-fd-foreground font-semibold underline"
    >
      /docs
    </Link>{' '}
    and see the documentation.
  </p>
</main> */
