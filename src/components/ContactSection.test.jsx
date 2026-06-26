import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactSection from '@/components/ContactSection'
import { config } from '@/data/config'

describe('ContactSection (config-driven)', () => {
  it('renders the heading and subtitle from config', () => {
    render(<ContactSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      config.contact.title
    )
    expect(screen.getByText(config.contact.subtitle)).toBeInTheDocument()
  })

  it('renders one link per channel with the configured href, label, and rel', () => {
    render(<ContactSection />)
    const channels = Object.entries(config.contact.links)

    for (const [key, { url, label }] of channels) {
      const link = screen.getByRole('link', { name: key }) // aria-label={key}
      expect(link).toHaveAttribute('href', url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
      expect(link).toHaveTextContent(label)
    }

    expect(screen.getAllByRole('link')).toHaveLength(channels.length)
  })
})
