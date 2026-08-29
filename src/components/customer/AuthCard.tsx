import { Container } from '@/components/ui/Container';

/** Centered card used by the login / register / password pages. */
export function AuthCard({
  title,
  subtitle,
  wide,
  children,
}: {
  title: string;
  subtitle?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50 min-h-[70vh] py-12 md:py-16">
      <Container>
        <div className={`mx-auto ${wide ? 'max-w-2xl' : 'max-w-md'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-navy">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1 mb-6">{subtitle}</p>}
            {!subtitle && <div className="mb-6" />}
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
