env_prod = {}
env_prod['ALPACA_SECRET_KEY'] = '267da36732bf99a960181a6e7a2c463a8a45ecb4'
env_prod['ALPACA_CLIENT_ID'] = 'daf9d04b0135406eba1987ab49ff3811'
env_prod['ALPACA_REDIRECT'] = 'https://5e8ce821a422ea61fe8d4ac2--social-media-trading.netlify.com/login'

env_dev = {}
env_dev['ALPACA_SECRET_KEY'] = '76ae67c88adfdec78fa23d8b57e219a8210a34c4'
env_dev['ALPACA_CLIENT_ID'] = '606c58263dae63dd827a2b1395f76150'
env_dev['ALPACA_REDIRECT'] = 'http://localhost:3000/login/'

#switch the environment variables when doing a last commit before deploying on pythonanywhere
def get_environment_variables():
    return env_prod
    #return env_dev