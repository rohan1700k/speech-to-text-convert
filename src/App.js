import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import './App.css';

function App() {
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <hr />
      </div>

      <div className="main-content" onClick={() => setTextToCopy(transcript)}>
        {transcript}
      </div>

      <div className="btn-style">
        <button onClick={setCopied}>
          {isCopied ? 'Copied' : 'Copy to Clipboard'}
        </button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
        <button onClick={handleReset}>Reset the Text</button>
      </div>
    </>
  );
}

export default App;