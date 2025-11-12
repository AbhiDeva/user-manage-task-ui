import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PROBLEMS } from "../../utils/problemsdata.js";
import { toast } from "sonner";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../../components/problems/ProblemDescription";
import OutputPanel from "../../components/problems/OutputPanel";
import CodeEditorPanel from "../../components/problems/CodeEditorPanel"
import { executeCode } from "../../utils/piston.js"
import { useGetSingleProblemQuery, useGetAllProblemsQuery } from "../../redux/slices/api/problemApiSlice";
import confetti from "canvas-confetti";
import { useGetUserSubmissionsQuery } from "../../redux/slices/api/codeSubmissionApiSlice.js";
import { useSelector } from 'react-redux';

function ProblemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentProblemId, setCurrentProblemId] = useState(id || "two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("")
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const { data: apiResponse, isLoading,  error} = useGetSingleProblemQuery(id, { skip: !id });
  const { data : problemapiResponse, isProblemLoading, isProblemerror} = useGetAllProblemsQuery();
  const totalProblems = problemapiResponse?.data;
  const currentProblem = apiResponse?.data || apiResponse; // support both formats
  const { user } = useSelector((state) => state.auth);
  console.log(user)

   const { data: submissions, isLoading: loadingSubmissions } = useGetUserSubmissionsQuery(user?._id, {
    skip: !user?._id, // Skip query if no user
  });
  
  useEffect(() => {
    if (currentProblem && currentProblem.starterCode) {
      setCode(currentProblem.starterCode[selectedLanguage] || "");
    }
  }, [currentProblem, selectedLanguage]);

  // Handle error or not found
  useEffect(() => {
    if (error) {
      toast.error("Problem not found!");
      navigate("/problems");
    }
  }, [error, navigate]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
      if (currentProblem && currentProblem.starterCode && currentProblem.starterCode[newLang]) {
      setCode(currentProblem.starterCode[newLang]);
    } else {
      setCode("");
      toast.error(`Starter code not available for ${newLang}`);
    }
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) =>{

   navigate(`/problem/${newProblemId}`);
   this.currentProblemId = newProblemId;
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    if(!output) return "";

    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    if(!actualOutput || !expectedOutput) return false;
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual === normalizedExpected;
  };

const handleRunCode = async () => {
  if (!code || code.trim() === "") {
    toast.error("Please write some code first!");
    return;
  }

  setIsRunning(true);
  setOutput(null);
  
  try {
    console.log("Executing code for language:", selectedLanguage);
    const result = await executeCode(selectedLanguage, code);
    
    console.log("Result received in handleRunCode:", result);
    
    // Set output first
    setOutput(result);

    // Check if code executed successfully and matches expected output
    if (result && result.success) {
      // Add safety check for expectedOutput
      if (currentProblem?.expectedOutput?.[selectedLanguage]) {
        const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
        const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

        if (testsPassed) {
          triggerConfetti();
          toast.success("All tests passed! Great job!");
        } else {
          toast.error("Tests failed. Check your output!");
        }
      } else {
        // No expected output to check against
        toast.success("Code executed successfully!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  } catch (error) {
    console.error("Error running code:", error);
    toast.error("An error occurred while executing code");
    setOutput({
      success: false,
      output: "",
      error: error.message || "Unknown error occurred"
    });
  } finally {
    setIsRunning(false);
  }
};

   // Show loading or error if problem not found
  if (!currentProblem) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Problem not found</h2>
          <button
            onClick={() => navigate("/problem")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* <Navbar /> */}

      <div className="flex-1 over-hidden">
        <PanelGroup direction="horizontal">
          {/* left panel- problem desc */}
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={id}
              onProblemChange={handleProblemChange}
              allProblems={(totalProblems)}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-gray-800 hover:bg-purple-600 transition-colors cursor-col-resize" />

          {/* right panel- code editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel - Code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                   problemId={id}
                   userId={user?._id}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              {/* Bottom panel - Output Panel*/}

              <Panel defaultSize={30} minSize={20}>
                <OutputPanel output={output}  isRunning={isRunning}/>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemDetailPage;