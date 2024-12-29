// https://github.com/nuxt-themes/docus/blob/main/nuxt.schema.ts
export default defineAppConfig({
  docus: {
    title: 'OnMind-PUB',
    description: 'The best place to start your documentation.',
    socials: {
      github: 'https://github.com/kaesar/onmind-pub',
      nuxt: {
        label: 'OnMind',
        icon: 'simple-icons:opensourceinitiative',
        href: 'https://onmind.co'
      }
    },
    github: {
      dir: '.starters/default/content',
      branch: 'main',
      repo: 'docus',
      owner: 'nuxt-themes',
      edit: true
    },
    aside: { level: 0, collapsed: false },
    main: { padded: true, fluid: true },
    header: { logo: false, showLinkIcon: true, fluid: true },
    footer: { credits: false }
  }
})
