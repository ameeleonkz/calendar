import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [react()],
  }

  // Добавляем конфигурацию тестов только для режима тестирования
  if (command === 'serve' && mode === 'test') {
    return {
      ...config,
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
      },
    }
  }

  return config
})