import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const exampleQuestions = [
  "Which sorting algorithm is adaptive and has O(n) best-case time complexity?",
  "Which sorting algorithm should I use for nearly sorted arrays?",
  "Compare Quick Sort and Merge Sort.",
  "Which algorithm is best when memory usage must be low?",
];

function AiAssistant() {
  const [question, setQuestion] = useState(exampleQuestions[0]);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchConversations = async () => {
    setIsHistoryLoading(true);

    try {
      const response = await fetch("http://localhost:5000/ai/conversations");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load AI conversations.");
      }

      setConversations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const askAssistant = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setIsLoading(true);
    setError("");
    setAnswer("");
    setSources([]);

    try {
      const response = await fetch("http://localhost:5000/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI answer.");
      }

      setAnswer(data.answer);
      setSources(data.sources || []);
      await fetchConversations();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const openConversation = (conversation) => {
    setQuestion(conversation.question);
    setAnswer(conversation.answer);
    setSources(conversation.sources || []);
    setError("");
  };

  return (
    <div className="container py-5">
      <section className="text-center mb-5">
        <span className="badge bg-dark mb-3">RAG + Semantic Search</span>

        <h1 className="display-5 fw-bold mb-3">AI Algorithm Assistant</h1>

        <p className="lead text-muted mx-auto" style={{ maxWidth: "760px" }}>
          Ask questions about sorting algorithms. The assistant uses OpenAI embeddings,
          PostgreSQL-stored algorithm knowledge, semantic search, and LangChain to generate grounded
          answers with sources.
        </p>
      </section>

      <div className="row g-4">
        <div className="col-lg-8">
          <section className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <label htmlFor="question" className="form-label fw-semibold">
                Your question
              </label>

              <textarea
                id="question"
                className="form-control mb-3"
                rows="4"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about sorting algorithms..."
              />

              <div className="d-flex gap-2 flex-wrap mb-3">
                {exampleQuestions.map((example) => (
                  <button
                    key={example}
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setQuestion(example)}
                  >
                    {example}
                  </button>
                ))}
              </div>

              <button className="btn btn-primary" onClick={askAssistant} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Asking AI...
                  </>
                ) : (
                  "Ask AI Assistant"
                )}
              </button>

              {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
            </div>
          </section>

          {answer && (
            <section className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-dark text-white fw-bold">AI Answer</div>

              <div className="card-body">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
            </section>
          )}

          {sources.length > 0 && (
            <section className="card shadow-sm border-0">
              <div className="card-header bg-light fw-bold">Sources used by RAG</div>

              <div className="card-body">
                <p className="text-muted">
                  These algorithm descriptions were retrieved using embeddings and cosine
                  similarity.
                </p>

                <div className="row g-3">
                  {sources.map((source) => (
                    <div className="col-md-4" key={source.name}>
                      <div className="border rounded p-3 h-100">
                        <h6 className="fw-bold mb-2">{source.name}</h6>

                        <span className="badge bg-primary mb-2">
                          similarity: {source.similarity}
                        </span>

                        <p className="small text-muted mt-2 mb-0">{source.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="col-lg-4">
          <section className="card shadow-sm border-0">
            <div className="card-header bg-light fw-bold d-flex justify-content-between">
              <span>Recent AI conversations</span>
              {isHistoryLoading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </div>

            <div className="card-body">
              {conversations.length === 0 && (
                <p className="text-muted mb-0">No conversations yet.</p>
              )}

              <div className="list-group list-group-flush">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => openConversation(conversation)}
                  >
                    <div className="fw-semibold text-truncate">{conversation.question}</div>

                    <small className="text-muted">
                      {new Date(conversation.created_at).toLocaleString()}
                    </small>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AiAssistant;
