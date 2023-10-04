import requests
from urllib import parse
from bs4 import BeautifulSoup
from tqdm import tqdm


def get_quote_by_naver(search="명언"):
    headers = {
        "Referer": "https://www.naver.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.37",
    }
    url = f"https://search.naver.com/search.naver?where=nexearch&ie=utf8&query={parse.quote(search)}"
    response = requests.get(url, headers=headers)
    if 200 <= response.status_code < 300:
        soup = BeautifulSoup(response.text, 'html.parser')
        wise = soup.select("ul.wise_sy li.lst .viewlst")
    else:
        print("check status", response)

    quote = {
        "text": "p.lngkr",
        "texteng": "p.lngeng",
        "author": "span.blind",
        "authoreng": "dt span.engnm",
        # "authorexpln": "dd.expln",
        "type": "span.ico_knd a",
    }
    quotes = [{k: q.select(v)[0].text.strip() if q.select(v) else "" for k, v in quote.items()} for q in wise]

    return quotes


def get_photo_by_unsplash(search="wallpapers"):
    access_key = ""
    secret_key = ""

    results = []
    for page in range(1, 51):
        result = get_unsplash_search(access_key, search, page)
        results += result['results']
        
        # try:
        #     # if isinstance(result, dict) or isinstance(result, list):
        # except Exception as e:
        #     print(page, result, "\nPlease Check", e)

    key = ['id', 'width', 'height', 'color', 'description', 'alt_description', "urls"]
    photos = [{k: photo[k] for k in key} for photo in results]

    return photos


def get_unsplash_search(access_key, search="", page=1):
    url = f"https://api.unsplash.com/search/photos?client_id={access_key}&page={page}&per_page=30&query={search}"
    response = requests.get(url)
    return requests.get(url).json() if 200 <= response.status_code < 300 else f"check status {response}"
