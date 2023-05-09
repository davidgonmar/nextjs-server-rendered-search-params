import CategoryBox from '@/components/CategoryBox';
import SearchBox from '@/components/SearchBox';
import './globals.css';
import { Inter } from 'next/font/google';
import { Category } from '@/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// Gets all aviable categories
const getCategories = async () => {
  const response = await fetch('https://api.escuelajs.co/api/v1/categories');
  const data = await response.json();
  return data as Category[];
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get categories. Due to it being in the layout, it will get fetched only once
  const categories = await getCategories();

  return (
    <html lang='en'>
      <body
        className={
          inter.className +
          ' bg-gradient-to-r from-blue-100 via-transparent to-teal-50 min-h-screen '
        }
      >
        {/* Header */}
        <div className='sticky top-0 backdrop-blur-2xl w-full p-4'>
          <SearchBox />
          <div className='flex gap-2 flex-wrap mt-2 justify-center'>
            {categories.map((category) => (
              <CategoryBox key={category.id} category={category} />
            ))}
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}