import feedparser
import datetime
import os

feeds = [
  'https://feeds.reuters.com/reuters/topNews',
  'http://feeds.bbci.co.uk/news/rss.xml',
  'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'https://www.theguardian.com/world/rss',
  'https://apnews.com/hub/ap-top-news?outputType=rss'
]

today = datetime.date.today().isoformat()
outdir = 'memory'
if not os.path.exists(outdir):
    os.makedirs(outdir)

lines = ['# Daily headlines ' + today, '']
for feed in feeds:
    try:
        d = feedparser.parse(feed)
        title = d.feed.get('title', feed)
        lines.append('## ' + title)
        for e in d.entries[:5]:
            title_text = e.get('title', 'No title').strip()
            link = e.get('link', '').strip()
            lines.append(f'- {title_text}  \n  {link}')
        lines.append('')
    except Exception as e:
        lines.append('## Failed to fetch ' + feed)
        lines.append(str(e))
        lines.append('')

with open(f'{outdir}/{today}.md','w',encoding='utf-8') as f:
    f.write('\n'.join(lines))
