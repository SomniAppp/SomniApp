function LaunchBadge({ className = '' }) {
  return (
    <span
      className={`inline-block rounded-full border border-[#9B6BF2]/30 bg-surface px-4 py-1.5 font-body text-xs font-medium uppercase tracking-wider text-textSecondary ${className}`}
    >
      Precio de lanzamiento
    </span>
  )
}

export default LaunchBadge
