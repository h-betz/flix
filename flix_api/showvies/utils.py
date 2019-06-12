PROVIDERS = ['netflix', 'hulu', 'amazon prime', 'hbo']

def parse_post_data(data):
    clean_data = {}
    for k, v in clean_data:
        if k in PROVIDERS:
            clean_data['providers'] = clean_data.pop('providers', []) + [k]
        elif k == 'genre':
            clean_data['genre'] = v
        else:
            clean_data[k] = v
    
    return clean_data