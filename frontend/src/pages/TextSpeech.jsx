import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";

const TextSpeech = () => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        const handleVoicesChanged = () => {
            const synthVoices = window.speechSynthesis.getVoices();
            setVoices(synthVoices);
            if (synthVoices.length > 0) {
                setSelectedVoice(synthVoices[0]);
            }
        };

        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
        handleVoicesChanged();
    }, []);

    const handleSpeak = () => {
        if (!text.trim()) {
            alert("Please enter some text!");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.volume = 1;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-6">

            <h1 className="text-5xl md:text-6xl font-extrabold text-[#66FF99] mb-4 text-center">
                VoiceMate
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-[#66FF99] mb-10 text-center">
                Convert your text into speech!
            </h2>
            <textarea
                className="w-full max-w-2xl h-64 bg-white text-black text-base p-5 rounded-xl resize-none mb-8 focus:outline-none focus:ring-2 focus:ring-[#66FF99] transition"
                placeholder="Write any text for generating speech!"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div className="flex w-full max-w-2xl gap-4 items-center">
                <select
                    className="flex-1 bg-[#1e1e1e] text-white h-12 px-5 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#66FF99] transition"
                    style={{
                        backgroundImage: `url(/images/dropdown.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "15px",
                        backgroundPositionX: "calc(100% - 20px)",
                        backgroundPositionY: "50%",
                    }}
                    value={voices.findIndex((v) => v === selectedVoice)}
                    onChange={(e) => setSelectedVoice(voices[e.target.value])}
                >
                    {voices.map((voice, index) => (
                        <option key={index} value={index}>
                            {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleSpeak}
                    className="flex items-center bg-[#66FF99] hover:bg-[#57e28a] transition text-black text-base font-medium px-6 py-3 rounded-full shadow-lg focus:outline-none"
                >
                    <Play className="w-5 h-5 mr-2" />
                    Listen
                </button>
            </div>
        </div>
    );
};

export default TextSpeech;



