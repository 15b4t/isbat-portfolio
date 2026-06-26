import { describe, it, expect } from 'vitest'
import { config } from '@/data/config'

describe('config integrity', () => {
  it('has core identity fields', () => {
    expect(config.name).toBeTruthy()
    expect(Array.isArray(config.projects)).toBe(true)
    expect(config.projects.length).toBeGreaterThan(0)
  })

  it('every project has a title, description, and at least one tag', () => {
    for (const project of config.projects) {
      expect(project.title, 'project title').toBeTruthy()
      expect(project.description, `${project.title} description`).toBeTruthy()
      expect(
        Array.isArray(project.tags) && project.tags.length > 0,
        `${project.title} tags`
      ).toBe(true)
    }
  })

  it('every contact link is a {url,label} object (hero CTA depends on links.github.url)', () => {
    const links = config.contact.links
    expect(links.github?.url, 'github url').toBeTruthy()
    for (const [key, channel] of Object.entries(links)) {
      expect(typeof channel.url, `${key}.url`).toBe('string')
      expect(channel.url, `${key}.url`).toBeTruthy()
      expect(channel.label, `${key}.label`).toBeTruthy()
    }
  })

  it('exposes a contact heading and subtitle for the section', () => {
    expect(config.contact.title).toBeTruthy()
    expect(config.contact.subtitle).toBeTruthy()
  })
})
