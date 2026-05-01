export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`skeleton-loader ${className}`} aria-hidden="true" />
  );
}
