module.exports = {
    title: 'Limw',
    keys: "Limw,源码解析,前端,Vue,Vue3,Es6,Javascript",
    description: 'Limw,源码解析,前端,Vue,Vue3,Es6,Javascript',
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'path/to/some/dir'
            }
        }
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: 'https://www.baidu.com' },
            { text: 'GitHub', link: 'https://github.com/lmw0221' },
        ],
        sidebar: [
            {
                title: '深入浅出 Vue3',
                children: [
                    {
                      title: 'vite篇',   // 必要的
                      path: '/resource-analysis/vue3_vite',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'reactive篇',   // 必要的
                        path: '/resource-analysis/vue3_reactive',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'effect篇',   // 必要的
                        path: '/resource-analysis/vue3_effect',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'ref和computed',   // 必要的
                        path: '/resource-analysis/vue3_computed',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    }
                ]
            },
            {
                title: 'Vue2 && React',   // 必要的
                children: [
                    {
                        title: 'Vue 2.x 源码解析',   // 必要的
                        path: '/resource-analysis/vue2',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'React 简况',   // 必要的
                        path: '/mvvm/react',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    }
                ]
            },
            {
                title: '计算机基础',   // 必要的
                children: [
                    {
                        title: '前端安全性',   // 必要的
                        path: '/browser/security_code',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: '关于Http',   // 必要的
                        path: '/browser/http',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: '页面加载过程',   // 必要的
                        path: '/browser/page_load',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: '设计模式',   // 必要的
                        path: '/browser/design_model',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                ]
            },
            {
                title: '算法基础',   // 必要的
                children: [
                  {
                    title: '基本概念',   // 必要的
                    path: '/algorithm/base',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  },
                ]
            },
            {
                title: '前端基础',   // 必要的
                children: [
                    {
                        title: '移动端-适配',   // 必要的
                        path: '/css/mobile.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'PC端-布局',   // 必要的
                        path: '/css/layout.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: '性能优化',   // 必要的
                        path: '/sse/optimization.md',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'JS运行机制',   // 必要的
                        path: '/sse/event_loop',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'JS垃圾回收机制',   // 必要的
                        path: '/browser/garbage_collection',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'CSS基础篇',   // 必要的
                        path: '/review/css_base',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'JS数据类型篇',   // 必要的
                        path: '/review/js_type',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'JS函数篇',   // 必要的
                        path: '/review/js_function',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: 'Webpack篇',   // 必要的
                        path: '/review/webpack',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    }
                ]
            },
            {
                title: '手写代码合集',   // 必要的
                children: [
                  {
                    title: '各种手写代码实现 ',   // 必要的
                    path: '/review/js_code',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  },
                ]
            },
            {
                title: '经验之谈',   // 必要的
                children: [
                    {
                        title: 'git命令 ',   // 必要的
                        path: '/other/git',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                    {
                        title: '面试问题',   // 必要的
                        path: '/other/interview',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    },
                ]
            },
            '/Node', 
            '/TypeScript', 
        ]
      }
  }