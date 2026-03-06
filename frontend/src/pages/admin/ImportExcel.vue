<script setup>
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'
const token = localStorage.getItem('admin_token')

const file = ref(null)
const uploading = ref(false)
const result = ref(null)
const error = ref(null)
const updateExisting = ref(true)
const createCategories = ref(true)

const handleFileChange = (event) => {
  file.value = event.target.files[0]
  result.value = null
  error.value = null
}

const handleUpload = async () => {
  if (!file.value) {
    error.value = 'Выберите файл'
    return
  }

  uploading.value = true
  error.value = null
  result.value = null

  try {
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('updateExisting', updateExisting.value)
    formData.append('createCategories', createCategories.value)

    const response = await axios.post(`${API_URL}/import/excel`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    result.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка при загрузке'
  } finally {
    uploading.value = false
  }
}

const downloadTemplate = async () => {
  // Динамически импортируем ExcelJS для создания настоящего XLSX файла
  const ExcelJS = (await import('exceljs')).default;
  
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Toybola';
  workbook.created = new Date();
  
  const worksheet = workbook.addWorksheet('Шаблон импорта');
  
  // Настройки колонок
  worksheet.columns = [
    { header: 'Наименование товара', key: 'name', width: 25 },
    { header: 'Артикул товара', key: 'sku', width: 15 },
    { header: 'Категория', key: 'category', width: 20 },
    { header: 'Карточка товара (фото)', key: 'image', width: 35 },
    { header: 'Цвета', key: 'colors', width: 25 },
    { header: 'Подкатегория', key: 'subcategory', width: 25 },
    { header: 'Возрастная группа', key: 'age', width: 20 },
    { header: 'Материал', key: 'material', width: 20 },
    { header: 'Цена (USD)', key: 'price', width: 15 },
    { header: 'Минимальный заказ (шт)', key: 'moq', width: 20 }
  ];
  
  // Стиль заголовка
  const headerStyle = {
    font: { bold: true, color: { argb: 'FFFFFFFF' } },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF77CED8' }
    },
    alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }
  };
  
  // Применяем стиль к заголовку
  worksheet.getRow(1).eachCell((cell) => {
    cell.style = headerStyle;
  });
  
  // Примеры данных
  const examples = [
    {
      name: 'RIFLE AK',
      sku: 'TB-007',
      category: 'Транспорт',
      image: 'https://example.com/image1.jpg',
      colors: 'Черный, Зеленый',
      subcategory: 'Военная техника',
      age: '3+',
      material: 'ABS-пластик',
      price: 5.50,
      moq: 100
    },
    {
      name: 'Замок принцессы',
      sku: 'TB-101',
      category: 'Наборы',
      image: 'https://example.com/image2.jpg',
      colors: 'Розовый, Фиолетовый',
      subcategory: 'Принцессы',
      age: '3+',
      material: 'ABS-пластик',
      price: 35.00,
      moq: 20
    },
    {
      name: 'Экскаватор строительный',
      sku: 'TB-015',
      category: 'Транспорт',
      image: 'https://example.com/image3.jpg',
      colors: 'Желтый, Черный',
      subcategory: 'Строительная техника',
      age: '6+',
      material: 'Металл, Пластик',
      price: 12.00,
      moq: 50
    }
  ];
  
  // Добавляем примеры
  examples.forEach(example => {
    worksheet.addRow(example);
  });
  
  // Скачиваем файл
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Шаблон_импорта_Toybola.xlsx';
  a.click();
  window.URL.revokeObjectURL(url);
}
</script>

<template>
  <AdminLayout>
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Импорт Excel</h1>
        <p class="text-gray-600">Массовая загрузка каталога из Excel файла</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Upload Section -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">Загрузка файла</h2>

          <!-- File Input -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Excel файл (.xlsx, .xls)
            </label>
            <input
              type="file"
              @change="handleFileChange"
              accept=".xlsx,.xls"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <p class="mt-2 text-sm text-gray-500">
              Макс. размер: 10 MB
            </p>
          </div>

          <!-- Options -->
          <div class="space-y-3 mb-6">
            <label class="flex items-center">
              <input
                v-model="updateExisting"
                type="checkbox"
                class="w-4 h-4 text-brand-blue focus:ring-brand-blue"
              />
              <span class="ml-2 text-sm text-gray-700">
                Обновлять существующие продукты (по SKU)
              </span>
            </label>
            <label class="flex items-center">
              <input
                v-model="createCategories"
                type="checkbox"
                class="w-4 h-4 text-brand-blue focus:ring-brand-blue"
              />
              <span class="ml-2 text-sm text-gray-700">
                Создавать новые категории если не найдены
              </span>
            </label>
          </div>

          <!-- Buttons -->
          <div class="flex gap-4">
            <button
              @click="handleUpload"
              :disabled="!file || uploading"
              class="flex-grow px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ uploading ? 'Загрузка...' : 'Начать импорт' }}
            </button>
            <button
              @click="downloadTemplate"
              class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Скачать шаблон Excel
            </button>
          </div>

          <!-- Error -->
          <div
            v-if="error"
            class="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
          >
            {{ error }}
          </div>
        </div>

        <!-- Result Section -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Результаты импорта</h2>

          <div v-if="!result && !error" class="text-center py-12 text-gray-500">
            <div class="text-4xl mb-4">📊</div>
            <p>Результаты появятся здесь после импорта</p>
          </div>

          <div v-if="result" class="space-y-4">
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="font-semibold text-green-800 mb-2">
                {{ result.success ? '✅ Импорт завершен' : '⚠️ Импорт завершен с ошибками' }}
              </div>
              <div class="text-sm text-green-700">
                <div>Файл: {{ result.fileName }}</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">{{ result.created }}</div>
                <div class="text-sm text-blue-700">Создано</div>
              </div>
              <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="text-2xl font-bold text-yellow-600">{{ result.updated }}</div>
                <div class="text-sm text-yellow-700">Обновлено</div>
              </div>
            </div>

            <div v-if="result.errors?.length > 0" class="mt-4">
              <h3 class="font-semibold mb-2">Ошибки ({{ result.errors.length }})</h3>
              <div class="max-h-64 overflow-y-auto space-y-2">
                <div
                  v-for="(err, index) in result.errors"
                  :key="index"
                  class="p-3 bg-red-50 border border-red-200 rounded text-sm"
                >
                  <span class="font-medium">Строка {{ err.row }}:</span> {{ err.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-4">Инструкция по заполнению</h2>
        <div class="prose max-w-none text-gray-700">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="border p-2 text-left">Колонка</th>
                <th class="border p-2 text-left">Обязательно</th>
                <th class="border p-2 text-left">Описание</th>
                <th class="border p-2 text-left">Пример</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Наименование товара</td>
                <td class="border p-2 text-green-600">✅ Да</td>
                <td class="border p-2">Название товара</td>
                <td class="border p-2">RIFLE AK</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Артикул товара</td>
                <td class="border p-2 text-green-600">✅ Да</td>
                <td class="border p-2">Уникальный артикул (SKU)</td>
                <td class="border p-2 font-mono text-sm">TB-007</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Категория</td>
                <td class="border p-2 text-green-600">✅ Да</td>
                <td class="border p-2">Название категории</td>
                <td class="border p-2">Транспорт</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Карточка товара (фото)</td>
                <td class="border p-2 text-gray-400">⚪ Нет</td>
                <td class="border p-2">Ссылка на изображение</td>
                <td class="border p-2 font-mono text-sm">https://...</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Цвета</td>
                <td class="border p-2 text-gray-400">⚪ Нет</td>
                <td class="border p-2">Перечисление через запятую</td>
                <td class="border p-2">Черный, Зеленый</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Подкатегория</td>
                <td class="border p-2 text-gray-400">⚪ Нет</td>
                <td class="border p-2">Название подкатегории</td>
                <td class="border p-2">Военная техника</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Возрастная группа</td>
                <td class="border p-2 text-gray-400">⚪ Нет</td>
                <td class="border p-2">Возрастное ограничение</td>
                <td class="border p-2">3+</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Материал</td>
                <td class="border p-2 text-gray-400">⚪ Нет</td>
                <td class="border p-2">Материал изготовления</td>
                <td class="border p-2">ABS-пластик</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Цена (USD)</td>
                <td class="border p-2 text-gray-400">⚪ Нет</td>
                <td class="border p-2">Цена в долларах США</td>
                <td class="border p-2 font-mono text-sm">5.50</td>
              </tr>
              <tr>
                <td class="border p-2 font-semibold text-gray-900">Минимальный заказ (шт)</td>
                <td class="border p-2 text-gray-400">⚪ Нет</td>
                <td class="border p-2">Минимальное количество</td>
                <td class="border p-2 font-mono text-sm">100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div class="text-sm text-green-800">
                <p class="font-semibold mb-1">Обязательные поля:</p>
                <p>Наименование товара, Артикул товара, Категория</p>
              </div>
            </div>
          </div>

          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div class="text-sm text-blue-800">
                <p class="font-semibold mb-1">Важно:</p>
                <p>Артикул должен быть уникальным - по нему определяется обновление товара</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div class="flex items-start gap-3">
            <svg class="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            <div class="text-sm text-purple-800">
              <p class="font-semibold mb-2">Как загрузить:</p>
              <ol class="list-decimal list-inside space-y-1">
                <li>Нажмите <strong>"Скачать шаблон Excel"</strong> чтобы скачать готовый файл</li>
                <li>Заполните файл своими данными в Excel или Google Sheets</li>
                <li>Сохраните файл в формате .xlsx или .xls</li>
                <li>Загрузите файл через форму выше</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
