import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getClassBySlug, getClasses } from '@/lib/services/classes.service';

/** ISR — revalidate every hour. */
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const classes = await getClasses();
    return classes.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const c = await getClassBySlug(slug);
    if (!c) return { title: 'Zajęcia' };
    return { title: c.title, description: c.short_description ?? undefined };
  } catch {
    return { title: 'Zajęcia' };
  }
}

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getClassBySlug(slug).catch(() => null);
  if (!c) notFound();

  return (
    <article className="container py-24">
      <h1 className="font-display text-5xl font-bold">{c.title}</h1>
      {c.short_description && (
        <p className="mt-4 max-w-2xl text-white/70">{c.short_description}</p>
      )}
    </article>
  );
}
