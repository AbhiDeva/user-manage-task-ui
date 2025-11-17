import { useState, useEffect, useRef } from "react";
import { MdRecordVoiceOver, MdStop, MdSettingsVoice, MdInfo } from "react-icons/md";
import { motion } from "framer-motion";

export default function SpeechApi() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const [active, setActive] = useState("start");
  const [logs, setLogs] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [recordedTexts, setRecordedTexts] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [wave, setWave] = useState(0);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);

  const methods = [
    { id: "start", label: "Start Recording", icon: <MdRecordVoiceOver size={24} /> },
    { id: "stop", label: "Stop", icon: <MdStop size={24} /> },
    { id: "abort", label: "Abort", icon: <MdSettingsVoice size={24} /> },
    { id: "info", label: "Mic Info", icon: <MdInfo size={24} /> },
  ];

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onstart = () => {
      setLogs((p) => [...p, "Recognition started"]); setIsRecording(true);
    };

    recognition.onend = () => {
      setLogs((p) => [...p, "Recognition ended"]); setIsRecording(false);
    };

    recognition.onerror = (e) => setLogs((p) => [...p, `Error: ${e.error}`]);
  }, []);

  // Waveform Animation (using Web Audio API)
  const startWaveform = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStreamRef.current = stream;

    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtxRef.current.createMediaStreamSource(stream);

    analyserRef.current = audioCtxRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    source.connect(analyserRef.current);
    animateWave();
  };

  const animateWave = () => {
    if (!analyserRef.current) return;

    const buffer = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(buffer);

    const avg = buffer.reduce((a, b) => a + b, 0) / buffer.length;
    setWave(avg);

    requestAnimationFrame(animateWave);
  };

  const handleClick = async (m) => {
    setActive(m.id);
    setLogs((p) => [...p, `Executed: ${m.label}`]);

    if (m.id === "start") {
      await startWaveform();
      recognition && recognition.start();
    }

    if (m.id === "stop") {
      recognition && recognition.stop();
      micStreamRef.current?.getTracks().forEach((t) => t.stop());
      setRecordedTexts((p) => [...p, transcript]);
      setLogs((p) => [...p, `Recorded Text Saved`] );
    }

    if (m.id === "abort") {
      recognition && recognition.abort();
      micStreamRef.current?.getTracks().forEach((t) => t.stop());
    }

    if (m.id === "info") {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter((d) => d.kind === "audioinput");
      setLogs((p) => [...p, `Mic Devices: ${audioInputs.length}`]);
    }
  };

  return (
    <div className="h-screen w-full grid grid-rows-[1fr_230px] bg-gray-100">
      <div className="grid grid-cols-[30%_70%]">
        {/* LEFT SIDE METHODS */}
        <div className="border-r bg-white p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Web Speech API - Methods</h2>
          <div className="space-y-3">
            {methods.map((m) => (
              <motion.button
                key={m.id}
                onClick={() => handleClick(m)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl shadow-sm border transition-all duration-200 cursor-pointer 
                  ${active === m.id ? "bg-blue-600 text-white" : "bg-gray-50 hover:bg-gray-200"}`}
              >
                {m.icon}
                <span className="text-base font-medium">{m.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – LIVE UI */}
        <div className="p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Interactive Preview</h2>

          {/* RECORDING STATUS CIRCLE */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              animate={{ scale: isRecording ? [1, 1.2, 1] : 1 }}
              transition={{ repeat: isRecording ? Infinity : 0, duration: 1 }}
              className={`w-16 h-16 rounded-full border-4 ${isRecording ? "border-red-500 bg-red-300" : "border-gray-400 bg-gray-200"}`}
            ></motion.div>
            <p className="mt-2 text-lg font-semibold">
              {isRecording ? "Recording..." : "Idle"}
            </p>
          </div>

          {/* WAVEFORM */}
          <div
            className="w-full h-24 bg-black rounded-lg overflow-hidden flex items-end"
          >
            <div
              className="bg-green-400 w-full transition-all duration-75"
              style={{ height: `${wave}px` }}
            ></div>
          </div>

          {/* TRANSCRIPT */}
          <div className="mt-6 bg-white p-4 rounded-xl shadow border min-h-[120px]">
            <h3 className="font-semibold mb-2">Transcript</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
          </div>

          {/* OUTPUT RECORDED TEXTS */ }
          <div className="mt-6 bg-white p-4 rounded-xl shadow border min-h-[120px]">
            <h3 className="font-semibold mb-2">Recorded Outputs</h3>
            {recordedTexts.map((t, i) => (
              <p key={i} className="text-gray-800 mb-2">• {t}</p>
            ))}
          </div>

          {/* Logs */ }
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Logs</h3>
            <div className="bg-black text-green-400 p-3 rounded-md h-40 overflow-y-auto text-sm">
              {logs.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM EXPLANATION */}
      <div className="border-t bg-white p-5 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-3">Speech Recognition API — Explanation</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li><b>start()</b>: Begins listening to microphone audio and starts processing speech.</li>
          <li><b>stop()</b>: Stops capturing audio and returns recognized text.</li>
          <li><b>abort()</b>: Immediately stops recognition without producing a result.</li>
          <li><b>getUserMedia()</b>: Requests mic access permissions.</li>
          <li>Waveform generated using <b>Web Audio API AnalyserNode</b>.</li>
          <li>Transcript generated using <b>Web Speech API</b>.</li>
        </ul>
      </div>
    </div>
  );
}
