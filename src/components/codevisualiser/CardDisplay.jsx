import { MdChevronRight, MdSettings, MdUndo } from "react-icons/md";
import Card from "./Card";
import { 
  MdMic, 
  MdCallSplit, 
  MdCheckCircle, 
  MdTableChart, 
  MdDragIndicator,
  MdViewArray,
  MdCode,
  MdStar,
  MdTimeline,
  MdIntegrationInstructions,
  MdSecurity,
  MdViewQuilt,
  MdAutorenew
} from 'react-icons/md';

import { FaLock, FaEquals, FaSitemap, FaRecycle } from "react-icons/fa";

  export default function CardsDisplay() {
  // const cards = [
  //    {
  //     id: '1',
  //     title: 'Speech Recognition API',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'speechapi',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //   {
  //     id: '2',
  //     title: 'Callback Hell Visualizer',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'callbackhell',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //   {
  //     id: '3',
  //     title: 'Pure vs Impure Functions',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'PureVSImpure',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //   {
  //     id: '4',
  //     title: 'Resize Column in Table',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'resizetablecolumn',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },

  //    {
  //     id: '5',
  //     title: 'Drag Column in Table',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'resizeDragtablecolumn',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //    {
  //     id: '6',
  //     title: 'Array Operations Demo',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'arrayDemo',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //    {
  //     id: '7',
  //     title: 'Array Polyfills Visualizer',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'arraypolyfill',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //   {
  //     id: '8',
  //     title: 'Star Pattern Visualizer',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'starpattern',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //   {
  //     id: '9',
  //     title: 'Progress Bar Visualizer',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'progressbar',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //   {
  //     id: '10',
  //     title: 'React Hooks Demo',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'reacthooksdemo',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //   {
  //     id: '11',
  //     title: 'Signed URL Visualiser',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'signedurlvisualiser',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //   {
  //     id: '12',
  //     title: 'Flexbox Visualizer',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'flexboxvisualizer',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   },
  //    {
  //     id: '13',
  //     title: 'React Lifecycle Methods',
  //     description: 'Track real-time metrics, monitor performance trends, and gain actionable insights from comprehensive analytics data.',
  //     icon: <MdChevronRight className="w-8 h-8" />,
  //     modalType: 'reactlifecycle',
  //     gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
  //     iconColor: 'text-blue-600'
  //   }
  // ];



const cards = [
  {
    id: '1',
    title: 'Speech Recognition API',
    description: 'Experience real-time voice-to-text conversion with the Web Speech API. See how speech recognition works with live transcription and voice commands.',
    icon: <MdMic className="w-8 h-8" />,
    modalType: 'speechapi',
    gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    iconColor: 'text-purple-600'
  },
  {
    id: '2',
    title: 'Callback Hell Visualizer',
    description: 'Understand the infamous "pyramid of doom" in JavaScript. Compare nested callbacks vs Promises vs Async/Await patterns visually.',
    icon: <MdCallSplit className="w-8 h-8" />,
    modalType: 'callbackhell',
    gradient: 'bg-gradient-to-br from-red-500 to-orange-600',
    iconColor: 'text-red-600'
  },
  {
    id: '3',
    title: 'Pure vs Impure Functions',
    description: 'Learn functional programming concepts by visualizing the difference between pure and impure functions with interactive examples and side effects tracking.',
    icon: <MdCheckCircle className="w-8 h-8" />,
    modalType: 'PureVSImpure',
    gradient: 'bg-gradient-to-br from-green-500 to-teal-600',
    iconColor: 'text-green-600'
  },
  {
    id: '4',
    title: 'Resize Column in Table',
    description: 'Interactive table with resizable columns. Learn how to implement column resizing functionality with smooth animations and user-friendly interactions.',
    icon: <MdTableChart className="w-8 h-8" />,
    modalType: 'resizetablecolumn',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    iconColor: 'text-blue-600'
  },
  {
    id: '5',
    title: 'Drag Column in Table',
    description: 'Drag and drop columns to reorder them. Master dynamic table manipulation with smooth drag-and-drop interactions and visual feedback.',
    icon: <MdDragIndicator className="w-8 h-8" />,
    modalType: 'resizeDragtablecolumn',
    gradient: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    iconColor: 'text-amber-600'
  },
  {
    id: '6',
    title: 'Array Operations Demo',
    description: 'Master JavaScript array methods like map, filter, reduce, and more. See how each operation transforms data with step-by-step visual demonstrations.',
    icon: <MdViewArray className="w-8 h-8" />,
    modalType: 'arrayDemo',
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-600',
    iconColor: 'text-pink-600'
  },
  {
    id: '7',
    title: 'Array Polyfills Visualizer',
    description: 'Understand how array methods work under the hood. Build and visualize custom implementations of map, filter, reduce with detailed explanations.',
    icon: <MdCode className="w-8 h-8" />,
    modalType: 'arraypolyfill',
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
    iconColor: 'text-violet-600'
  },
  {
    id: '8',
    title: 'Star Pattern Visualizer',
    description: 'Generate and visualize various star patterns using nested loops. Perfect for understanding loop logic and pattern generation algorithms.',
    icon: <MdStar className="w-8 h-8" />,
    modalType: 'starpattern',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    iconColor: 'text-yellow-600'
  },
  {
    id: '9',
    title: 'Progress Bar Visualizer',
    description: 'Build custom progress bars with animations. Learn state management, intervals, and how to create smooth loading experiences for your users.',
    icon: <MdTimeline className="w-8 h-8" />,
    modalType: 'progressbar',
    gradient: 'bg-gradient-to-br from-emerald-500 to-green-600',
    iconColor: 'text-emerald-600'
  },
  {
    id: '10',
    title: 'React Hooks Demo',
    description: 'Comprehensive guide to React Hooks with live examples. Master useState, useEffect, useMemo, useRef, and more with interactive visualizations.',
    icon: <MdIntegrationInstructions className="w-8 h-8" />,
    modalType: 'reacthooksdemo',
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    iconColor: 'text-cyan-600'
  },
  {
    id: '11',
    title: 'Signed URL Visualizer',
    description: 'Understand secure file sharing with signed URLs. See how pre-signed URLs work, their expiration, and security best practices with AWS S3.',
    icon: <MdSecurity className="w-8 h-8" />,
    modalType: 'signedurlvisualiser',
    gradient: 'bg-gradient-to-br from-red-500 to-pink-600',
    iconColor: 'text-red-600'
  },
  {
    id: '12',
    title: 'Flexbox Visualizer',
    description: 'Master CSS Flexbox layout with an interactive playground. Experiment with flex properties, alignment, and spacing in real-time.',
    icon: <MdViewQuilt className="w-8 h-8" />,
    modalType: 'flexboxvisualizer',
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    iconColor: 'text-indigo-600'
  },
  {
    id: '13',
    title: 'React Lifecycle Methods',
    description: 'Visualize React component lifecycle from mount to unmount. See when useEffect runs, understand cleanup, and master lifecycle patterns.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'reactlifecycle',
    gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    iconColor: 'text-teal-600'
  },
  {
  id: '14',
  title: 'Object.freeze vs Object.seal',
  description: 'Interactive visualizer showing how frozen objects block all changes while sealed objects allow updates but prevent adding or removing keys.',
  icon: <FaLock className="w-8 h-8" />,
  modalType: 'freezeVsSeal',
  gradient: 'bg-gradient-to-br from-sky-500 to-blue-600',
  iconColor: 'text-sky-600'
},
{
  id: '15',
  title: '== vs === Equality Checker',
  description: 'Interactive visualizer demonstrating the difference between loose (==) and strict (===) equality for strings, arrays, and objects, with real-time UI comparisons.',
  icon: <FaEquals className="w-8 h-8" />,
  modalType: 'equalityChecker',
  gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
  iconColor: 'text-purple-600'
},
{
  id: '16',
  title: 'DOM Tree Visualizer',
  description: 'Interactive DOM tree visualizer showing how nodes are created, updated, removed, and rendered with animations for each change.',
  icon: <FaSitemap className="w-8 h-8" />,
  modalType: 'domTree',
  gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
  iconColor: 'text-green-600'
},
{
  id: '17',
  title: 'DOM Tree UseCases Visualizer',
  description: 'Interactive DOM tree Usecases visualizer.',
  icon: <FaSitemap className="w-8 h-8" />,
  modalType: 'domTreeuseCases',
  gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
  iconColor: 'text-green-600'
},
{
  id: '18',
  title: 'Angular Lifecycle Visualizer',
  description: 'Interactive visualizer showing Angular component lifecycle flow.',
  icon: <FaRecycle className="w-8 h-8" />,
  modalType: 'angularlifecycle',
  gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
  iconColor: 'text-orange-600'
},
{
  id: '19',
  title: 'Angular Lifecycle (Nested Components)',
  description: 'Visualizes Angular lifecycle hooks with parent → child → nested children execution order.',
  icon: <FaSitemap className="w-8 h-8" />,
  modalType: 'angularlifecyclewithnested',
  gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
  iconColor: 'text-purple-600'
},
 {
    id: '20',
    title: 'Angular Lifecycle (Nested Components) - 2',
    description: 'Visualizes Angular lifecycle hooks with parent → child → nested children execution order.',
    icon: <FaSitemap className="w-8 h-8" />,
    modalType: 'angularSequencelifeCycle',
    gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
    iconColor: 'text-purple-600',
  },
   {
    id: '21',
    title: 'ViewChild & ViewChildren Visualizer',
    description: 'Visualizes Angular @ViewChild and @ViewChildren decorators for accessing child components.',
    icon: <FaSitemap className="w-8 h-8" />,
    modalType: 'viewChild',
    gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
    iconColor: 'text-purple-600',
  },
  {
    id: '22',
    title: 'ContentChild & ContentChildren Visualizer',
    description: 'Visualizes Angular @contentChild and @ContentChildren decorators for accessing child components.',
    icon: <FaSitemap className="w-8 h-8" />,
    modalType: 'contentChild',
    gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
    iconColor: 'text-purple-600',
  },
  {
    id: '23',
    title: 'Router Event Lifecycle Visualizer',
    description: 'Visualizes Angular Router event lifecycle during navigation with all event hooks.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'routerEventLifecycle',
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconColor: 'text-purple-600',
  },
   {
    id: '24',
    title: 'Pure vs Impure Pipe Visualizer',
    description: 'Visualizes Angular Pure vs Impure Pipes with change detection examples.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'pureImpurePipe',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '25',
    title: 'Popover Visualizer',
    description: 'Visualizes Angular Popover component with dynamic content and positioning.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'popover',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '26',
    title: 'Debounce Visualizer',
    description: 'Visualizes Debounce functionality in loadsh with input event handling examples.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'debounce',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '27',
    title: 'Deep Equalizer Visualizer',
    description: 'Visualizes Deep Equality checks between complex objects and arrays with examples.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'deepEqualiser',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '28',
    title: 'Event Loop Flow Visualizer',
    description: 'Visualizes JavaScript Event Loop with Call Stack, Web APIs, Task Queue, and Microtask Queue interactions.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'eventloop',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
   {
    id: '29',
    title: 'Event Loop Live Visualizer',
    description: 'Visualizes JavaScript Event Loop with Call Stack, Web APIs, Task Queue, and Microtask Queue interactions.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'eventlooplive',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
   {
    id: '30',
    title: 'Event Delegation Visualizer',
    description: 'Visualizes JavaScript Event Delegation with event bubbling and capturing phases.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'eventdelegation',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
   {
    id: '31',
    title: 'Event Delegation Animated Visualizer',
    description: 'Visualizes JavaScript Event Delegation with event bubbling and capturing phases.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'eventdelegationanimated',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '32',
    title: 'Script Loading Visualizer',
    description: 'Visualizes JavaScript Script Loading strategies with async and defer attributes.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'scriptloading',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '33',
    title: 'Prototypal Inheritance Visualizer',
    description: 'Visualizes JavaScript Prototypal Inheritance with prototype chain and property lookup examples.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'prototypalinheritance',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },{
    id: '34',
    title: 'Accordion React Component',
    description: 'Interactive Accordion component built with React. Expand and collapse sections to view content dynamically.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'accordionReact',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '35',
    title: 'Use Counter Hook Visualizer',
    description: 'Visualizes a custom React Hook for counter functionality with increment, decrement, and reset features.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'counterHook',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '36',
    title: 'Use Click Hook Visualizer',
    description: 'Visualizes a custom React Hook that tracks click events anywhere in the document.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'clickHook',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
   {
    id: '37',
    title: 'Use Optimised Counter Hook Visualizer',
    description: 'Visualizes an optimized custom React Hook for counter functionality with performance improvements.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'usehookoptimisedcounter',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
   {
    id: '38',
    title: 'Mortgage Calculator Visualizer',
    description: 'Visualizes a Mortgage Calculator built with React. Calculate monthly payments based on loan amount, interest rate, and term.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'calculatorAPP',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '39',
    title: 'Topological Sort Visualizer',
    description: 'Visualizes the Topological Sort algorithm on directed acyclic graphs (DAGs) with step-by-step execution.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'topologicalSort',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },{
    id: '40',
    title:'Currying Function Visualizer',
    description: 'Visualizes the concept of currying in JavaScript functions with interactive examples.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'curryingFunction',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },{
    id: '41',
    title:'Tabs Component Visualizer',
    description: 'Visualizes a Tabs component built with React. Switch between different tab views dynamically.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'tabs',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },{
    id: '42',
    title:'Holy Grail Layout Visualizer',
    description: 'Visualizes the Holy Grail Layout using CSS Flexbox and Grid with responsive design examples.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'holyGrailLayout',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  }, {
    id: '43',
    title: 'Use Array Hook Visualizer',
    description: 'Visualizes a custom React Hook for array operations including add, remove, and clear functionalities.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'useArrayHook',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },{
    id: '44',
    title: 'Roll Dice Hook Visualizer',
    description: 'Visualizes a custom React Hook that simulates rolling dice with random number generation.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'rollDiceHook',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  }, {
    id: '45',
    title: 'File Explorer Visualizer',
    description: 'Visualizes a File Explorer component built with React. Navigate through folders and files with dynamic rendering.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'fileExplorer',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
    {
    id: '46',
    title: 'Like Button Hook Visualizer',
    description: 'Visualizes a custom React Hook that implements a Like button with toggle functionality and count display.',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'likeButtonHook',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '47',
    title: 'Modal Hook Visualizer',
    description: 'Modal visualisation implemented for title, body ,footer',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'modaldisplay',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },{
    id: '48',
    title: 'Star Rating Component',
    description: 'Star Rating Component visualisation ',
    icon: <MdAutorenew className="w-8 h-8" />,
    modalType: 'starRate',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },{
    id: '49',
    title: 'Digital Clock',
    description: 'Create a widget that renders the current time in HH:MM:SS format using a 7-segment digital display. You are free to choose to use 12-hour or a 24-hour display.',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'digitalClock',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },{
    id: '50',
    title: 'Transfer List',
    description: 'component that allows transferring of items between two lists.',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'transferList',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '51',
    title: 'Nested Checkboxes',
    description: 'component that displays a hierarchical structure of checkboxes. The component should handle parent-child relationships between checkboxes and manage their states efficiently.',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'hiercheckbox',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '52',
    title: 'StopWatch',
    description: 'stopwatch widget which can measure how much time has passed. It shows the current timer and has two buttons underneath: "Start/Stop" and "Reset".',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'stopWatch',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '53',
    title: 'Image Carousel',
    description: 'image carousel that displays a sequence of images.',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'imagecarousel',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '54',
    title: 'Traffic Light',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'trafficlight',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '55',
    title: 'Analog Clock',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'analogClock',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '56 ',
    title: 'Classic Inheritance v/s Prototypal Inheritance',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'inherit',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '57 ',
    title: 'Promise Visualiser',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'promisevs',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
   {
    id: '58 ',
    title: 'Predict Output for Object V/S String Key',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'outputObject',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
   {
    id: '59 ',
    title: 'Predict Output for Object V/S String Key 2',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'outputObject2',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '60 ',
    title: 'Predict Output for Hoisting',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'hostingout',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '61 ',
    title: 'Multi Select Dropdown',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'selectDropdown',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '62 ',
    title: 'Factory Design Pattern',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'factory',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
   {
    id: '63 ',
    title: 'Dom Sibilings Visualiser',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'DomSiblings',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
  },
  {
    id: '64 ',
    title: 'IPV4 Valid Checker ',
    description: ' traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:',
    icon :<MdChevronRight className="w-8 h-8" />,
    modalType: 'IP4',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    iconColor: 'text-orange-600',
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