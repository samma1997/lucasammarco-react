'use client'

import Link from 'next/link'
import styles from './FlipButton.module.css'

interface FlipButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
  external?: boolean
}

export default function FlipButton({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
  external = false,
}: FlipButtonProps) {
  const wrapClass = variant === 'primary' ? styles.primary : styles.secondary
  const combinedClass = [styles.wrap, wrapClass, className].filter(Boolean).join(' ')

  const content = (
    <>
      {/* Background layer */}
      <span className={styles.bg} aria-hidden="true" />

      {/* Front face — visible by default */}
      <span className={`${styles.face} ${styles.front}`}>
        <span className={styles.text}>{children}</span>
      </span>

      {/* Back face — revealed on hover via 3D flip */}
      <span className={`${styles.face} ${styles.back}`} aria-hidden="true">
        <span className={styles.text}>{children}</span>
      </span>
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={combinedClass}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} onClick={onClick} className={combinedClass}>
      {content}
    </Link>
  )
}
