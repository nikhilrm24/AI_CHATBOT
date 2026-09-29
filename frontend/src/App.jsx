import { useState } from "react";

function App() {
    const [userMsg, setUserMsg] = useState("");
    const [ans, setAns] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);

    async function chatbot() {
        try {
                if (!userMsg.trim()) {
                    return;
                }

                setAns("");
                setIsStreaming(true);

            const response = await fetch("http://localhost:8000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userMsg
                })
            });
             if (!response.ok) {
                throw new Error("Server request failed");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();

                if (done) break;

                const text = decoder.decode(value);

                setAns(prev => prev + text);
            }

        } catch (error) {
            console.error(error);
        }finally{
           setIsStreaming(false);
        }
    }

    return (
       <div>
        <h1 className="text-center text-3xl font-bold mt-5 text-gray-600">programming Tutor</h1>
         <div className="flex flex-col items-center justify-center p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-gray-100 mt-10 h-50">
          
    <div className="flex w-full gap-2 mb-4">
        <input
            type="text"
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-400 text-sm transition-all"
        />
        <button 
            onClick={chatbot} 
            disabled={isStreaming}
            className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm shadow-sm"
        >
            {isStreaming ? "Thinking..." : "Ask"}
        </button>
    </div>

    {ans && (
        <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm leading-relaxed shadow-inner">
            <p>{ans}</p>
        </div>
    )}
</div>
       </div>
    );
}

export default App;