import path from 'node:path';
import { createApp } from '@/src/app';

global.appRoot = path.resolve(__dirname);

const PORT = process.env.PORT || 8080;

async function main() {
  const app = await createApp();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
  });
}

main();
