module.exports = {
    title: 'learn-note',
    keys: "源码解析,前端,Vue,Vue3,Es6,Javascript",
    description: '源码解析,前端,Vue,Vue3,Es6,Javascript',
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
            { text: 'GitHub', link: 'https://github.com/limeiwang' },
        ],
        sidebar: [
            {
                title: '深入浅出 Vue3',
                children: [
                    {
                      title: 'vite篇',
                      path: '/resource-analysis/vue3_vite',
                    },
                    {
                        title: 'reactive篇',
                        path: '/resource-analysis/vue3_reactive',
                    },
                    {
                        title: 'effect篇',
                        path: '/resource-analysis/vue3_effect',
                    },
                    {
                        title: 'ref和computed',
                        path: '/resource-analysis/vue3_computed',
                    }
                ]
            },
            {
                title: 'Vue2 && React',
                children: [
                    {
                        title: 'Vue 2.x 源码解析',
                        path: '/resource-analysis/vue2',
                    },
                    {
                        title: 'React 简况',
                        path: '/mvvm/react',
                    }
                ]
            },
            {
                title: '计算机基础',
                children: [
                    {
                        title: '前端安全性',
                        path: '/browser/security_code',
                    },
                    {
                        title: '关于Http',
                        path: '/browser/http',
                    },
                    {
                        title: '页面加载过程',
                        path: '/browser/page_load',
                    },
                    {
                        title: '设计模式',
                        path: '/browser/design_model',
                    },
                ]
            },
            {
                title: '算法基础',
                children: [
                  {
                    title: '基本概念',
                    path: '/algorithm/base',
                  },
                ]
            },
            {
                title: '前端基础',
                children: [
                    {
                        title: '移动端-适配',
                        path: '/css/mobile.md',
                    },
                    {
                        title: 'PC端-布局',
                        path: '/css/layout.md',
                    },
                    {
                        title: '性能优化',
                        path: '/sse/optimization.md',
					},
					
                    {
                        title: 'async await',
                        path: '/sse/async_await.md',
                    },
                    {
                        title: '模块化',
                        path: '/sse/module.md',
                    },
                    {
                        title: 'JS运行机制',
                        path: '/sse/event_loop',
                    },
                    {
                        title: 'JS垃圾回收机制',
                        path: '/browser/garbage_collection',
					},
					{
                        title: 'Promise',
                        path: '/review/js_promise',
                    },
                    {
                        title: 'CSS基础篇',
                        path: '/review/css_base',
                    },
                    {
                        title: 'JS数据类型篇',
                        path: '/review/js_type',
                    },
                    {
                        title: 'JS函数篇',
                        path: '/review/js_function',
                    },
                    {
                        title: 'Webpack篇',
                        path: '/review/webpack',
                    }
                ]
            },
            {
                title: '手写代码合集',
                children: [
                  {
                    title: '各种手写代码实现 ',
                    path: '/review/js_code',
                  },
                ]
            },
            {
                title: '经验之谈',
                children: [
                    {
                        title: 'git命令 ',
                        path: '/other/git',
                    },
                    {
                        title: '面试问题',
                        path: '/other/interview',
                    },
                    {
                        title: 'node经验包',
                        path: '/other/node',
                    },
                ]
            },
            {
              title: 'Vue组件',
              children: [
                {
                  title: '折叠',
                  path: 'components/collapse'
                },
                {
                  title: '穿梭框',
                  path: 'components/transfer'
                },
                {
                  title: '上次文件',
                  path: 'components/upload'
                },
                {
                  title: '弹窗',
                  path: 'components/dialog'
                },
                {
                  title: '滚动加载',
                  path: 'components/loadmore'
                }
              ]
            }
        ]
      }
  }