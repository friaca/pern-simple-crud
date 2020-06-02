import { config } from 'dotenv';
config({ path: '.env' });
// === === //
import createApp from './app';

const app = createApp();
