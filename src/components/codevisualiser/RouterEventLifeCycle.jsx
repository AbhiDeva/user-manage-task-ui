import React, { useState, useEffect } from 'react';
import {
  MdPlayArrow,
  MdRotateLeft,
  MdPause} from "react-icons/md";


const RouterLifecycleVisualizer = () => {
  const [activeEvent, setActiveEvent] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [showExample, setShowExample] = useState(null);

  const events = [
    {
      name: 'NavigationStart',
      description: 'Navigation is triggered. First event in the lifecycle.',
      color: 'bg-blue-500',
      details: 'id, url properties available',
      example: `router.events.pipe(
  filter(e => e instanceof NavigationStart)
).subscribe(e => {
  console.log('Navigating to:', e.url);
  // Show loading spinner
});`
    },
    {
      name: 'RoutesRecognized',
      description: 'Router parses the URL and identifies the route.',
      color: 'bg-purple-500',
      details: 'Route configuration is matched',
      example: `router.events.pipe(
  filter(e => e instanceof RoutesRecognized)
).subscribe(e => {
  console.log('Route matched:', e.urlAfterRedirects);
});`
    },
    {
      name: 'GuardsCheckStart',
      description: 'Router begins running guards (CanActivate, CanLoad).',
      color: 'bg-yellow-500',
      details: 'Guards can cancel navigation',
      example: `// Auth Guard Example
canActivate(): boolean {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}`
    },
    {
      name: 'ChildActivationStart',
      description: 'Router starts activating child routes.',
      color: 'bg-green-500',
      details: 'Called for each child route',
      example: `// Triggered when navigating to:
// /dashboard/profile (child of dashboard)
router.events.pipe(
  filter(e => e instanceof ChildActivationStart)
).subscribe(e => {
  console.log('Child activating:', e.snapshot);
});`
    },
    {
      name: 'ActivationStart',
      description: 'Router starts activating a route.',
      color: 'bg-teal-500',
      details: 'Component preparation begins',
      example: `router.events.pipe(
  filter(e => e instanceof ActivationStart)
).subscribe(e => {
  console.log('Component activating');
  // Initialize component-specific logic
});`
    },
    {
      name: 'GuardsCheckEnd',
      description: 'All guards have completed successfully.',
      color: 'bg-orange-500',
      details: 'Navigation is approved',
      example: `router.events.pipe(
  filter(e => e instanceof GuardsCheckEnd)
).subscribe(e => {
  console.log('All guards passed!');
  // Guards approved, proceeding...
});`
    },
    {
      name: 'ResolveStart',
      description: 'Router begins resolving route data.',
      color: 'bg-pink-500',
      details: 'Resolvers fetch required data',
      example: `// Resolver Example
@Injectable()
export class UserResolver {
  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUser(route.params['id']);
  }
}`
    },
    {
      name: 'ResolveEnd',
      description: 'Route data resolution is complete.',
      color: 'bg-red-500',
      details: 'All data is ready',
      example: `router.events.pipe(
  filter(e => e instanceof ResolveEnd)
).subscribe(e => {
  console.log('Data resolved successfully');
  // All resolvers have completed
});`
    },
    {
      name: 'ActivationEnd',
      description: 'Route activation is complete.',
      color: 'bg-indigo-500',
      details: 'Component is activated',
      example: `router.events.pipe(
  filter(e => e instanceof ActivationEnd)
).subscribe(e => {
  console.log('Component activated');
  // Component is now live
});`
    },
    {
      name: 'ChildActivationEnd',
      description: 'Child route activation is complete.',
      color: 'bg-cyan-500',
      details: 'All child components ready',
      example: `router.events.pipe(
  filter(e => e instanceof ChildActivationEnd)
).subscribe(e => {
  console.log('Child route ready');
});`
    },
    {
      name: 'NavigationEnd',
      description: 'Navigation completed successfully.',
      color: 'bg-emerald-500',
      details: 'Final event on success',
      example: `router.events.pipe(
  filter(e => e instanceof NavigationEnd)
).subscribe(e => {
  console.log('Navigation complete!', e.url);
  // Hide loading spinner
  // Update breadcrumbs, analytics, etc.
});`
    }
  ];

  const errorEvents = [
    {
      name: 'NavigationCancel',
      description: 'Navigation was cancelled (guard returned false).',
      color: 'bg-amber-600',
      type: 'error'
    },
    {
      name: 'NavigationError',
      description: 'Navigation failed due to an error.',
      color: 'bg-red-600',
      type: 'error'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    if (activeEvent < events.length - 1) {
      const timer = setTimeout(() => {
        setActiveEvent(prev => prev + 1);
        setCompletedEvents(prev => [...prev, activeEvent + 1]);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [activeEvent, isPlaying, events.length]);

  const handlePlay = () => {
    if (activeEvent === events.length - 1) {
      handleReset();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setActiveEvent(-1);
    setCompletedEvents([]);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Angular Router Lifecycle Events
          </h1>
          <p className="text-gray-300">
            Visualizing the complete navigation lifecycle
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            {isPlaying ? (
              <>
                <MdPause size={20} /> Pause
              </>
            ) : (
              <>
                <MdPlayArrow size={20} /> Play
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
          >
            <MdRotateLeft size={20} /> Reset
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-700"></div>
          
          {/* Progress line */}
          <div 
            className="absolute left-8 top-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 transition-all duration-300"
            style={{ 
              height: activeEvent >= 0 ? `${((activeEvent + 1) / events.length) * 100}%` : '0%'
            }}
          ></div>

          {/* Events */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative pl-20 transition-all duration-500 ${
                  index === activeEvent ? 'scale-105' : ''
                } ${
                  index <= activeEvent ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {/* Node */}
                <div
                  className={`absolute left-5 w-8 h-8 rounded-full border-4 border-slate-900 transition-all duration-300 ${
                    index === activeEvent
                      ? event.color + ' ring-4 ring-white/50 scale-125'
                      : index < activeEvent
                      ? event.color
                      : 'bg-gray-700'
                  }`}
                ></div>

                {/* Card */}
                <div
                  className={`bg-slate-800/80 backdrop-blur rounded-lg p-5 border-2 transition-all duration-300 ${
                    index === activeEvent
                      ? 'border-white shadow-xl shadow-purple-500/30'
                      : index < activeEvent
                      ? 'border-slate-700'
                      : 'border-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{event.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        index <= activeEvent
                          ? event.color + ' text-white'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{event.description}</p>
                  <p className="text-sm text-gray-400 italic mb-3">{event.details}</p>
                  
                  <button
                    onClick={() => setShowExample(showExample === index ? null : index)}
                    className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    {showExample === index ? '▼ Hide Example' : '▶ Show Example'}
                  </button>
                  
                  {showExample === index && (
                    <div className="mt-3 bg-slate-900/80 rounded-lg p-4 border border-slate-600">
                      <pre className="text-xs text-green-400 overflow-x-auto">
                        <code>{event.example}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Events Section */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur rounded-lg p-6 border-2 border-red-900/50">
          <h2 className="text-2xl font-bold text-white mb-4">
            Alternative Navigation Outcomes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {errorEvents.map((event, index) => (
              <div
                key={index}
                className="bg-slate-900/50 rounded-lg p-4 border-2 border-red-900/30"
              >
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                  {event.name}
                </h3>
                <p className="text-gray-300 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur rounded-lg p-6 border-2 border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Subscribe to Events</h2>
          <pre className="text-sm text-green-400 overflow-x-auto">
            <code>{`import { Router, NavigationStart, NavigationEnd } from '@angular/router';

constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      console.log('Navigation started:', event.url);
    }
    if (event instanceof NavigationEnd) {
      console.log('Navigation completed:', event.url);
    }
  });
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RouterLifecycleVisualizer;