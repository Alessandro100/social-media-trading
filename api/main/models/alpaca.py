import requests

def get_alpaca_account(access_token):
    URL = 'https://api.alpaca.markets/v2/account'  
    HEADERS = {'Authorization': 'Bearer ' + access_token}
    r = requests.get(url = URL, headers=HEADERS)
    return r.json()