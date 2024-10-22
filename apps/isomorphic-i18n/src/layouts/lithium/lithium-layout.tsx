import Header from '@/layouts/lithium/lithium-header';
export default function LithiumLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang?: string;
}) {
  return (
    <main className="flex min-h-screen flex-grow ">
      <div className="flex w-full flex-col ">
        <Header lang={lang} />
        <div className="flex flex-grow flex-col  3xl:px-0  3xl:pt-0 4xl:px-0">
          {children}
        </div>
      </div>
    </main>
  );
}
