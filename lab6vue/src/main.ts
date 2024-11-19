import { createApp } from 'vue';
import App from './App.vue';
import 'tailwindcss/tailwind.css'; // Підключення стилів Tailwind

import './index.css';

const app = createApp(App);
app.mount('#app');
