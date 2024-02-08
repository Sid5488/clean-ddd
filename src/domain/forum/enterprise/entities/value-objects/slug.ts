export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  public static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receive a string and normalize it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  public static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
