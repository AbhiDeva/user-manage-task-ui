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
    {
      id: '3',
      title: 'Pure vs Impure Functions',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'PureVSImpure',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
    {
      id: '4',
      title: 'Resize Column in Table',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'resizetablecolumn',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },

     {
      id: '5',
      title: 'Drag Column in Table',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'resizeDragtablecolumn',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
     {
      id: '6',
      title: 'Array Operations Demo',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'arrayDemo',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
     {
      id: '7',
      title: 'Array Polyfills Visualizer',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'arraypolyfill',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
    {
      id: '8',
      title: 'Star Pattern Visualizer',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'starpattern',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
    {
      id: '9',
      title: 'Progress Bar Visualizer',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'progressbar',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
    {
      id: '10',
      title: 'React Hooks Demo',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'reacthooksdemo',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
    {
      id: '11',
      title: 'Signed URL Visualiser',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'signedurlvisualiser',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
    {
      id: '12',
      title: 'Flexbox Visualizer',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'flexboxvisualizer',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
    },
     {
      id: '13',
      title: 'React Lifecycle Methods',
      description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
      icon: <MdChevronRight className="w-8 h-8" />,
      modalType: 'reactlifecycle',
      gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
      iconColor: 'text-blue-600'
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