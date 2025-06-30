import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Mic, MicOff, ClipboardCopy, Eraser } from "lucide-react";

const SpeechText = () => {
    const [isCopied, setIsCopied] = useState(false);

    const startListening = () =>
        SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

    const stopListening = () => SpeechRecognition.stopListening();

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(transcript);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleErase = () => {
        window.location.reload();
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser does not support speech recognition.</span>;
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#66FF99] mb-4 text-center">
                Transcripto
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-[#66FF99] mb-10 text-center">
                Your smart speech-to-text assistant
            </h2>

            <div
                className="w-full max-w-2xl min-h-[16rem] bg-white text-black text-base p-6 rounded-xl border-2 border-[#66FF99] overflow-y-auto whitespace-pre-wrap mb-8"
                data-placeholder="Start speaking to see the text here..."
            >
                {transcript || (
                    <span className="text-gray-500 italic">Start speaking to see the text here...</span>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
                <button
                    onClick={handleCopy}
                    className="flex items-center border-2 border-[#66FF99] text-[#66FF99] px-6 py-3 rounded-lg transition hover:bg-[#66FF99] hover:text-black shadow-md"
                >
                    <ClipboardCopy className="w-5 h-5 mr-2" />
                    {isCopied ? "Copied!" : "Copy"}
                </button>

                <button
                    onClick={() => {
                        navigator.mediaDevices.getUserMedia({ audio: true }).then(startListening);
                    }}
                    className="flex items-center border-2 border-[#66FF99] text-[#66FF99] px-6 py-3 rounded-lg transition hover:bg-[#66FF99] hover:text-black shadow-md"
                >
                    <Mic className="w-5 h-5 mr-2" />
                    Start
                </button>

                <button
                    onClick={stopListening}
                    className="flex items-center border-2 border-[#66FF99] text-[#66FF99] px-6 py-3 rounded-lg transition hover:bg-[#66FF99] hover:text-black shadow-md"
                >
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop
                </button>

                <button
                    onClick={handleErase}
                    className="flex items-center border-2 border-[#66FF99] text-[#66FF99] px-6 py-3 rounded-lg transition hover:bg-[#66FF99] hover:text-black shadow-md"
                >
                    <Eraser className="w-5 h-5 mr-2" />
                    Erase
                </button>
            </div>
        </div>
    )
}

export default SpeechText