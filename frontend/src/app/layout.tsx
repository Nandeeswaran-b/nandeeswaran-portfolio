import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ParticlesBackground from '@/components/particles';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Nandeeswaran B | Data Scientist & AI Engineer Portfolio',
  description: 'Data Science Portfolio of Nandeeswaran B, B.Tech Artificial Intelligence and Data Science Student at SNS College of Engineering.',
  keywords: ['Nandeeswaran B', 'Data Scientist', 'AI Student', 'Machine Learning Engineer', 'Portfolio', 'Predictive Modeling'],
  openGraph: {
    title: 'Nandeeswaran B | Data Science Portfolio',
    description: 'Explore machine learning models, Power BI analytics, and predictive AI applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="flex flex-col h-screen w-screen overflow-hidden text-slate-900 dark:text-white bg-slate-50 dark:bg-background transition-colors duration-300 antialiased">
        <ThemeProvider>
          <ParticlesBackground />
          <Navbar />
          
          <main className="relative z-10 w-full h-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
