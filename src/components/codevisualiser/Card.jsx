import React, { useState } from "react";
import SpeechApi from "./SpeechAPI";
import CallbackHellVisualizer from "./CallbackHell";
import PureImpureVisualiser from "./PureVSImpure";
import ResizableTableUIVisualizer from "./ResizableTableColumn";
import ResizableDragTableUIVisualizer from "./ResizableDraggedColumn";
import ArrayDemo from "./ArrayDemo";
import ArrayPolyfillVisualizer from "./ArrayPolyfillVisualizer";
import StarPatternVisualizer from "./StarPatternVisualizer";
import SignedURLVisualiser from "./SignedURLVisualiser";
import FlexboxVisualizer from "./FlexboxVisualizer";
import { MdClose, MdOutlineVisibility } from "react-icons/md";
import ProgressVisualiser from "./ProgressVisualiser";
import ReactHookDemo from "./ReactHooksDemo";
import ReactLifeCycle from "./ReactLifecycle";
import ObjectVisualizer from "./ObjectSealvsFreeze";
import EqualityVisualizer from "./EqualityVisualizer";
import DOMTreeVisualiser from "./DOMTreeVisualiser";
import DOMTreeUseCaseVisualizer from "./DOMTreeUseCaseVisualiser";
import AngularLifecycleVisualizer from "./AngularLifeCycle";
import AngularLifecycleNestedVisualizer from "./AngularLifeCycleWithNested";
import AngularLifecycleSequenceVisualizer from "./AngularLifeCycleSequence";
import ViewChildVisualizer from "./ViewChildVisualiser";
import ContentChildVisualizer from "./contentChildandChildren";
import RouterLifecycleVisualizer from "./RouterEventLifeCycle";
import PipeVisualizer from "./PureandImpurePipeVisualiser";
import PopOverVisualizer from "./PopOverVisualiser";
import DebounceVisualizer from "./DebounceVisualiser";
import DeepEqualVisualizer from "./DeepEqualiser";
import EventLoopFlowVisualizer from "./EventLoopFlow";
import EventLoopLiveVisualizer from "./EventLoopLive";
import EventDelegationVisualizer from "./EventDelegate";
import ScriptLoadingVisualizer from "./ScriptLoading";
import EventDelegationAnimateVisualizer from "./EventDelegateAnimate";
import PrototypalInheritanceVisualizer from "./Prototypalinheritance";
import AccordionApp from "../coding/simpleJS/accordion";
import UseCounterVisualizer from "../coding/simpleJS/useCounterhook";
import UseClickAnywhereVisualizer from "../coding/simpleJS/useClickhook";
import UseCounterFullVisualizer from "../coding/simpleJS/useOptimisedCounterhook";
import MortgageCalculatorVisualizer from "../coding/simpleJS/MortgageCalculator";
import TopologicalSortVisualizer from "./topologicalSort";
import CurryVisualizer from "./CurryFunction";
import TabsVisualizer from "../coding/simpleJS/TabsComponent";
import HolyGrailLayout from "../coding/simpleJS/HolyGrail";
import UseArrayVisualizer from "../coding/simpleJS/UseArrayHook";
import DiceRollerVisualizer from "../coding/simpleJS/DiceRoller";
import FileTreeVisualizer from "../coding/simpleJS/FileExplorer";
import LikeButtonVisualizer from "../coding/simpleJS/LikeButton";
import ModalVisualizer from "../coding/simpleJS/ModalDialog";
import StarRatingVisualizer from "../coding/simpleJS/starRating";
import DigitalClockVisualizer from "../coding/simpleJS/SevenSegmentDigit";
import TransferListVisualizer from "../coding/simpleJS/TransferList";
import HierarchicalCheckboxVisualizer from "../coding/simpleJS/HierarchicalCheckbox";

export default function Card({ card }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderModalContent = () => {
    switch (card.modalType) {
      case 'speechapi':
        return  <SpeechApi />;
      case 'callbackhell':
        return <CallbackHellVisualizer/>
      case 'PureVSImpure':
        return <PureImpureVisualiser />;
      case 'resizetablecolumn':
        return <ResizableTableUIVisualizer />;
      case 'resizeDragtablecolumn':
        return <ResizableDragTableUIVisualizer />;
      case 'arrayDemo':
        return <ArrayDemo />;
       case 'arraypolyfill':
        return <ArrayPolyfillVisualizer />;
       case 'starpattern':
        return <StarPatternVisualizer />;
       case  'progressbar':
        return <ProgressVisualiser />;
       case 'reacthooksdemo':
        return <ReactHookDemo />;
        case 'signedurlvisualiser':
        return <SignedURLVisualiser />;
        case 'flexboxvisualizer':
        return <FlexboxVisualizer />;
        case 'reactlifecycle':
        return <ReactLifeCycle />;
        case 'freezeVsSeal':
        return <ObjectVisualizer />;
        case 'equalityChecker':
        return <EqualityVisualizer />;
        case 'domTree':
        return <DOMTreeVisualiser />;
        case 'domTreeuseCases':
        return <DOMTreeUseCaseVisualizer />;
        case 'angularlifecycle':
        return <AngularLifecycleVisualizer />;
        case 'angularlifecyclewithnested':
        return <AngularLifecycleNestedVisualizer />;
        case 'angularSequencelifeCycle':
        return <AngularLifecycleSequenceVisualizer />;
        case 'viewChild':
        return <ViewChildVisualizer />;
        case 'contentChild':
       return <ContentChildVisualizer/>;
        case 'routerEventLifecycle':
        return <RouterLifecycleVisualizer/>;
        case 'pureImpurePipe':
        return <PipeVisualizer/>;
        case  'popover':
        return <PopOverVisualizer/>;
        case  'debounce':
        return <DebounceVisualizer/>;
        case 'deepEqualiser':
        return <DeepEqualVisualizer/>;
        case 'eventloop':
        return <EventLoopFlowVisualizer/>;
        case 'eventlooplive':
        return <EventLoopLiveVisualizer/>;
        case 'eventdelegation':
        return <EventDelegationVisualizer/>;
        case 'eventdelegationanimated':
        return <EventDelegationAnimateVisualizer/>;
        case 'scriptloading':
        return <ScriptLoadingVisualizer/>;
        case 'prototypalinheritance':
        return <PrototypalInheritanceVisualizer/>;
        case 'accordionReact':
          return <AccordionApp />
        case 'counterHook':
          return <UseCounterVisualizer />
        case 'clickHook':
          return <UseClickAnywhereVisualizer />
        case 'usehookoptimisedcounter':
          return <UseCounterFullVisualizer />
        case 'calculatorAPP':
          return <MortgageCalculatorVisualizer />
        case 'topologicalSort':
          return <TopologicalSortVisualizer />
        case 'curryingFunction':
          return <CurryVisualizer />
        case 'tabs':
          return <TabsVisualizer />
        case 'holyGrailLayout':
          return <HolyGrailLayout />
        case 'useArrayHook':
          return <UseArrayVisualizer />
        case 'rollDiceHook':
          return <DiceRollerVisualizer />
        case 'fileExplorer':
          return <FileTreeVisualizer />
        case 'likeButtonHook':
          return <LikeButtonVisualizer />
        case 'modaldisplay':
          return <ModalVisualizer />
        case 'starRate':
          return <StarRatingVisualizer />
        case 'digitalClock':
          return <DigitalClockVisualizer />
        case 'transferList':
          return <TransferListVisualizer />
        case 'hiercheckbox':
          return <HierarchicalCheckboxVisualizer />
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`group h-full bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer`}>
        <div className={`${card.gradient} h-32 flex items-center justify-center`}>
          <div className={`${card.iconColor} p-4 rounded-xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform`}>
            {card.icon}
          </div>
        </div>

        <div className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {card.description}
            </p>

            <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg group/btn"
          >
            <MdOutlineVisibility className="w-5 h-5 group-hover/btn:animate-eye-move" />
            View Details
          </button>
          </div>

          
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            <div className={`${card.gradient} px-8 py-6 flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className={`${card.iconColor} p-3 rounded-lg bg-white/20 backdrop-blur-md`}>
                  {card.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{card.title}</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <MdClose className="w-6 h-6"/>
                {/* <X className="w-6 h-6" /> */}
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}