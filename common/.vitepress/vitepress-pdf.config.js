/**
 * @type {import('vitepress-export-pdf').UserConfig}
 */
const config = {
  routePatterns: ['!/**/index.md', '!/**/Trivia-*.*', '!/**/README.md', '!/**/_index.md', '!/**/_sidebar.md', '!/**/about.md'],
  sorter: (pageA, pageB) => {
    if (pageA.path.includes('toc')) return -1;
    if (pageB.path.includes('toc')) return 1;
    return 0;
  },
  pdfOptions: {
    format: 'Letter',
    displayHeaderFooter: false,
    printBackground: true,
    preferCSSPageSize: false,
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px'
    }
  },
  pdfOutlines: true,
  outlineContainerSelector: '.VPDoc',
  puppeteerLaunchOptions: {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },

  beforePageRender: async (page) => {
    await page.addStyleTag({
      content: `
        .VPNav,
        .VPNavBar,
        .VPLocalNav,
        .VPDocFooter,
        .VPSidebar,
        .VPDocAsideOutline,
        .VPDocAside,
        .VPNavBarTitle,
        .VPNavBarMenu,
        .aside-container,
        .outline-title,
        nav,
        aside,
        header,
        [class*="NavBar"],
        [class*="Aside"],
        [class*="Sidebar"] {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          overflow: hidden !important;
        }
        .VPDoc,
        .vp-doc {
          padding-left: 0 !important;
          padding-top: 0 !important;
          max-width: 100% !important;
        }
        .content-container,
        .VPContent {
          max-width: 100% !important;
        }
        body {
          padding-top: 0 !important;
        }
        @page {
          margin: 10px 20px;
        }
      `
    });
    await page.evaluate(() => {
      // document.title = 'OnMind-PUB';
      const elements = document.querySelectorAll('.VPNav, .VPNavBar, .VPLocalNav, .VPDocFooter, .VPSidebar, .VPDocAsideOutline, .VPDocAside, aside, nav, header');
      elements.forEach(el => el.remove());
    });
    await page.waitForSelector('.VPDoc', { timeout: 5000 }).catch(() => {});
  }
}

export default config
