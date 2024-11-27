import 'dotenv/config'
import app from './app'

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('API is Runing PORT:', PORT)
})
