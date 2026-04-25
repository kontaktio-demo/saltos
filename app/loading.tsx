/**
 * Root loading UI — shown while a route segment is loading.
 * Replace with a branded skeleton / 3D preloader later.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-brand" />
    </div>
  );
}
