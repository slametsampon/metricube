// src/app/page.tsx

import CustomLink from '@/components/Link';

export const metadata = {
  title: 'Beranda | Metricube',
  description:
    'Dashboard Maintenance Plant untuk memonitor KPI dan Disturbance secara real-time.',
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white py-16 px-4">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
          Metricube
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Platform pemantauan <strong>KPI</strong> dan{' '}
          <strong>gangguan produksi</strong> (disturbance) untuk tim Maintenance
          Plant — terintegrasi, real-time, dan efisien.
        </p>
        <div className="flex justify-center gap-4 pt-4 flex-wrap">
          <CustomLink
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium transition"
          >
            Masuk ke Dashboard
          </CustomLink>
          <CustomLink
            href="/about"
            className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-md text-sm font-medium transition"
          >
            Tentang Aplikasi
          </CustomLink>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="mt-24 max-w-5xl mx-auto text-center px-4">
        <h2 className="text-2xl font-semibold mb-8">Fitur Unggulan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Siap Meningkatkan Efisiensi Maintenance?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          Mulai gunakan Metricube sekarang dan pantau performa plant Anda dengan
          lebih cerdas dan efisien.
        </p>
        <CustomLink
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-sm font-medium transition"
        >
          Buka Dashboard
        </CustomLink>
      </section>
    </main>
  );
}

const features = [
  {
    title: 'Monitoring KPI',
    desc: 'Lacak pencapaian KPI berdasarkan target tahunan maupun bulanan secara akurat.',
    icon: '📊',
  },
  {
    title: 'Log Disturbance',
    desc: 'Catat dan analisa gangguan produksi, lengkap dengan sumber dan durasi gangguan.',
    icon: '⚠️',
  },
  {
    title: 'Input Manual & Sensor',
    desc: 'Mendukung input data manual maupun otomatis dari sensor IoT berbasis MQTT.',
    icon: '🛠️',
  },
  {
    title: 'Visualisasi Data',
    desc: 'Tampilkan metrik dan histori gangguan dalam bentuk grafik dan tabel interaktif.',
    icon: '📈',
  },
];
