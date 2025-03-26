import { useState } from "react";

const ChatInput = ({ onSubmit }) => {
    const [question, setQuestion] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onSubmit(question);
            setQuestion("");
        }
    }

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="question">Give me your Prompt</label>
                    <textarea
                        className="form-control auto-expand"
                        id="question"
                        placeholder="Enter your Prompt"
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                            e.target.style.height = "auto"; // Reset height
                            e.target.style.height = e.target.scrollHeight + "px"; // Set new height
                        }}
                    />

                </div>

                <button type="submit" className="btn btn-primary mt-4">
                    Generate
                </button>
            </form>
        </div>
    )
}

export default ChatInput;