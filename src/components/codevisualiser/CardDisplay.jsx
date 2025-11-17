import { MdChevronRight, MdSettings, MdUndo } from "react-icons/md";
import Card from "./Card";

  export default function CardsDisplay() {
  const cards = [
     {
      id: '1',
      title: 'Speech Recognition API',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'speechapi',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
    {
      id: '2',
      title: 'Callback Hell Visualizer',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'callbackhell',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Feature Showcase</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our powerful features with interactive cards. Click any card to view detailed information.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}