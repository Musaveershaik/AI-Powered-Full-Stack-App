import React from "react";
import ReactMarkdown from "react-markdown";
import { FaClipboard } from "react-icons/fa";
import "./ChatResponse.css";

const ChatResponse = ({ response }) => {
  if (!response) {
    return null;
  }

  const { candidates, usageMetadata } = response;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard! ✅");
  };

  return (
    <div className="chat-container">

      {candidates.map((candidate, index) => (
        <div className="chat-card" key={index}>
          {/* Copy Button */}
          <button
            className="copy-button"
            onClick={() => copyToClipboard(candidate.content.parts[0].text)}
          >
            <FaClipboard />
          </button>

          <div className="chat-card-body">
          <h5 className="chat-card-title">🔹 Response</h5>

            <div className="chat-card-text">
              <ReactMarkdown>{candidate.content.parts[0].text}</ReactMarkdown>
            </div>
            {candidate?.citationMetadata?.citationSources.length > 0 && (
              <>
                <h6 className="chat-citations-title">Citations:</h6>
                <ul className="chat-citations">
                  {candidate.citationMetadata.citationSources.map(
                    (source, idx) => (
                      <li key={idx} className="chat-citation-item">
                        <a
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.uri}
                        </a>{" "}
                        (Indexes: {source.startIndex} - {source.endIndex})
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}

      <div className="usage-metadata">
        <h4 className="usage-title">Usage Metadata</h4>
        <p className="usage-text">
          <strong>Prompt Tokens:</strong> {usageMetadata.promptTokenCount}
        </p>
        <p className="usage-text">
          <strong>Response Tokens:</strong> {usageMetadata.candidatesTokenCount}
        </p>
        <p className="usage-text">
          <strong>Total Tokens:</strong> {usageMetadata.totalTokenCount}
        </p>
      </div>
    </div>
  );
};

export default ChatResponse;



// const ChatResponse = ({ response }) => {
//     if (!response) {
//         return null;
//     }
    
//     const {candidates, usageMetadata } = response;

//     return (
//         <div className="container my-4">
//             <h3>Response</h3>
//         {candidates.map((candidate, index) => (
//             <div className="card mb-3" key={index}>
//             <div className="card-body">
//               <h5 className="card-title">Candidate {index + 1}</h5>
//               <p className="card-text">{candidate.content.parts[0].text}</p>
//               <h6>Citations:</h6>
//               <ul>
//                 {candidate?.citationMetadata?.citationSources.map((source, idx) => (
//                     <li key={idx}>
//                         <a href={source.uri} target="_blank" rel="noopener noreferrer">
//                             {source.uri}
//                         </a> {" "}
//                         (Indexes: {source.startIndex} - {source.endIndex})
//                     </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}

//         <h4>Usage Metadata</h4>
//         <p>Prompt Tokens: {usageMetadata.promptTokenCount}</p>
//         <p>ProResponse Tokens: {usageMetadata.candidatesTokenCount}</p>
//         <p>Total Tokens: {usageMetadata.totalTokenCount}</p>
//         </div>
//     )
// }

// export default ChatResponse;