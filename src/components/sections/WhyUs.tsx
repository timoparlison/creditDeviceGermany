import { Section } from '../ui/Section';
import { Phone, Lightbulb, Heart, Sliders } from 'lucide-react';

const reasons = [
  {
    title: 'Erreichbar',
    description: 'Unser engagiertes Team steht Ihnen jederzeit zur Verfügung. Persönlicher Support, der wirklich hilft.',
    icon: Phone,
  },
  {
    title: 'Innovativ',
    description: 'Wir entwickeln unsere Lösungen kontinuierlich weiter und setzen auf modernste Technologien.',
    icon: Lightbulb,
  },
  {
    title: 'Engagiert',
    description: 'Ihr Erfolg ist unser Antrieb. Wir gehen die Extrameile, um Ihre Ziele zu erreichen.',
    icon: Heart,
  },
  {
    title: 'Flexibel',
    description: 'Unsere Lösungen passen sich Ihren Bedürfnissen an, nicht umgekehrt.',
    icon: Sliders,
  },
];

export function WhyUs() {
  return (
    <Section background="navy">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Warum CreditDevice?
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Wir sind mehr als nur ein Softwareanbieter – wir sind Ihr Partner für erfolgreiches Credit Management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason) => {
          const IconComponent = reason.icon;
          return (
            <div key={reason.title} className="text-center">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{reason.title}</h3>
              <p className="text-gray-300">{reason.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
