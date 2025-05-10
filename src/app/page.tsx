import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/navigation/AppHeader';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-grow">
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <Image
            src="https://picsum.photos/1600/900"
            alt="City skyline with taxis"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            data-ai-hint="city taxi"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-8 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to CabPro
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-neutral-200 md:text-xl">
              Your reliable and efficient solution for booking taxi and cab services. Get moving with ease.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/login">Login Now</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-semibold text-foreground">
              Why Choose CabPro?
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {/* Placeholder for Icon: Fast booking */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-medium text-foreground">Quick & Easy Booking</h3>
                <p className="text-center text-muted-foreground">
                  Book your ride in just a few clicks with our intuitive platform.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {/* Placeholder for Icon: Reliable drivers */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-medium text-foreground">Trusted Drivers</h3>
                <p className="text-center text-muted-foreground">
                  All our drivers are verified and rated for your safety and comfort.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {/* Placeholder for Icon: Fair pricing */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="mb-2 text-xl font-medium text-foreground">Transparent Pricing</h3>
                <p className="text-center text-muted-foreground">
                  No hidden fees. Know your fare upfront before you book.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          &copy; {new Date().getFullYear()} CabPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
