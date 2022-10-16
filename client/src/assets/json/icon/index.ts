import videoAudio from './video-audio'
import community from './community'
import news from './news'
import shopping from './shopping'
import tool from './tool'
import travel from './travel'

const list = [
  {
    name: '影音娱乐',
    key: 'videoAudio',
    data: videoAudio
  },
  {
    name: '社区通讯',
    key: 'community',
    data: community
  },
  {
    name: '新闻阅读',
    key: 'news',
    data: news
  },
  {
    name: '购物比价',
    key: 'shopping',
    data: shopping
  },
  {
    name: '实用工具',
    key: 'tool',
    data: tool
  },
  {
    name: '旅游出行',
    key: 'travel',
    data: travel
  }
]

export default list
