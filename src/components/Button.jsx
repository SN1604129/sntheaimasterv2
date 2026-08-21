import { Link } from 'react-router-dom'

const variantClass = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  text: 'btn-text',
}

export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const classes = `${variantClass[variant] || variantClass.primary} ${className}`.trim()
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span>{loading ? 'Loading...' : children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </button>
  )
}
