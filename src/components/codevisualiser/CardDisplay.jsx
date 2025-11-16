import { MdChevronRight, MdSettings, MdUndo } from "react-icons/md";
import Card from "./Card";

  export default function CardsDisplay() {
  const cards = [
    {
      id: '1',
      title: 'Analytics Dashboard',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'analytics',
      gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      id: '2',
      title: 'Configuration',
      description: 'Manage application settings, customize preferences, and control system behavior with an intuitive interface.',
      icon: <MdSettings className="w-8 h-8" />,
      modalType: 'settings',
      gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      iconColor: 'text-emerald-600'
    },
    {
      id: '3',
      title: 'Team Members',
      description: 'Manage your team, assign roles, control permissions, and monitor user activity across your organization.',
      icon: <MdUndo className="w-8 h-8" />,
      modalType: 'users',
      gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
      iconColor: 'text-orange-600'
    }
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