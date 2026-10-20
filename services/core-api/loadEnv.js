import dotenvx from "@dotenvx/dotenvx"
import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenvx.config({ path: path.resolve(__dirname, ".env") })
