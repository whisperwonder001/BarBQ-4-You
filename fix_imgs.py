import re

file_path = r'c:\Users\Tec Sign\OneDrive\Desktop\BBQ 4 You\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

images = {
    'biryani': 'https://images.unsplash.com/photo-1633383718081-22ac93e3db65?auto=format&fit=crop&w=600&q=80',
    'mutton': 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=600&q=80',
    'curry': 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=600&q=80',
    'bbq': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    'meat': 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80',
    'beef': 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=600&q=80',
    'stew': 'https://images.unsplash.com/photo-1548811579-017fa2aca5ea?auto=format&fit=crop&w=600&q=80',
    'naan': 'https://images.unsplash.com/photo-1565557623262-b51f2510b641?auto=format&fit=crop&w=600&q=80',
    'bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    'salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    'tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    'drinks': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568a70950?auto=format&fit=crop&w=600&q=80',
    'kebab': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    'springroll': 'https://images.unsplash.com/photo-1585238341258-fc29b71f985c?auto=format&fit=crop&w=600&q=80',
    'aloosamosa': 'https://images.unsplash.com/photo-1601050690597-df0568a70950?auto=format&fit=crop&w=600&q=80',
    'seekhkabab': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    'tikka': 'https://images.unsplash.com/photo-1599487405270-86430af532b2?auto=format&fit=crop&w=600&q=80',
    'chicken': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    'paratha': 'https://images.unsplash.com/photo-1606491956391-70868b5d0f47?auto=format&fit=crop&w=600&q=80',
    'wedding': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'event': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'buffet': 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    'catering': 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    'grill': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    'kebab': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'
}
default_food = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'

def replace_unsplash(match):
    url = match.group(0)
    try:
        keys = url.split('?')[1].split(',')
        for key in keys:
            if key.lower() in images:
                return images[key.lower()]
    except:
        pass
    return default_food

content = re.sub(r'https://source\.unsplash\.com/[^\s\'\"]+', replace_unsplash, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Images successfully updated!")
