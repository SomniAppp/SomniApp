function PhoneFrame({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-[280px] rounded-[36px] border border-textPrimary/[0.08] bg-surface p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-background">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-surface" />
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

export default PhoneFrame
