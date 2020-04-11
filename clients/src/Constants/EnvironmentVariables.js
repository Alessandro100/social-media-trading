//switch to environment variables production when you are about to deploy
const EnvironmentVariablesProduction = {
    BACKEND_API_URL: 'https://alessandro100.pythonanywhere.com/',
    ALPACA_REDIRECT_URL: 'https://social-media-trading.netlify.com/login',
    ALPACA_CLIENT_ID: 'daf9d04b0135406eba1987ab49ff3811'
}

const EnvironmentVariablesDevelopment = {
    BACKEND_API_URL: 'http://127.0.0.1:5000/',
    ALPACA_REDIRECT_URL: 'http://localhost:3000/login/',
    ALPACA_CLIENT_ID: '606c58263dae63dd827a2b1395f76150'
}

export default EnvironmentVariablesProduction;