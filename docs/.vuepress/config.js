module.exports = {
    title: 'Limw',
    description: 'Just playing around',
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'path/to/some/dir'
            }
        }
    },
    themeConfig: {
        sidebar: [
            '/', 
            '/HTML5', 
            '/CSS3', 
            '/JavaScript', 
            '/JQuery',
            '/Node', 
            '/RequestJs',
            '/ES6',
            '/webpack',
            '/Vue',
            '/React',
            '/Eslint', 
            '/TypeScript', 
            '/Vim', 
            '/demo'
        ],
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'GitHub', link: 'https://github.com/lmw0221' },
            // {
            //     text: 'Languages',
            //     ariaLabel: 'Language Menu',
            //     items: [
            //       { text: 'Chinese', link: '/language/chinese/' },
            //       { text: 'Japanese', link: '/language/japanese/' }
            //     ]
            // }
        ]
      }
  }