echo "
{
    \"apiEndPoint\": \"https://lidraughts.org\",
    \"socketEndPoint\": \"wss://socket.lidraughts.org\"
}" > appconfig.prod.json

npm install
APP_MODE=dev APP_CONFIG=prod npm run build
npx cap sync