import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { surveyAPI } from "../services/api";

const CreateSurvey: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<
    Array<{ text: string; type: string }>
  >([{ text: "", type: "MULTIPLE_CHOICE" }]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "MULTIPLE_CHOICE" }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const surveyData = {
        title,
        description,
        questions: questions.map((q) => ({
          text: q.text,
          questionType: q.type,
          options: q.type === "MULTIPLE_CHOICE" ? ["옵션 1", "옵션 2"] : [],
        })),
      };

      await surveyAPI.create(surveyData);
      navigate("/surveys");
    } catch (error) {
      console.error("Failed to create survey:", error);
      alert("설문 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>새 설문 만들기</h2>
        <button onClick={() => navigate("/surveys")} style={styles.backBtn}>
          목록으로
        </button>
      </header>

      <main style={styles.main}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>설문 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
              placeholder="설문 제목을 입력하세요"
            />
          </div>

          <div style={styles.formGroup}>
            <label>설문 설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              placeholder="설문 설명을 입력하세요"
            />
          </div>

          <div style={styles.questionsSection}>
            <div style={styles.questionsHeader}>
              <h3>질문</h3>
              <button type="button" onClick={addQuestion} style={styles.addBtn}>
                + 질문 추가
              </button>
            </div>

            {questions.map((question, index) => (
              <div key={index} style={styles.questionCard}>
                <div style={styles.questionHeader}>
                  <span>질문 {index + 1}</span>
                  {questions.length > 1 && (
                    <button type="button" onClick={() => removeQuestion(index)}>
                      삭제
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) =>
                    updateQuestion(index, "text", e.target.value)
                  }
                  placeholder="질문을 입력하세요"
                  style={styles.input}
                  required
                />
                <select
                  value={question.type}
                  onChange={(e) =>
                    updateQuestion(index, "type", e.target.value)
                  }
                  style={styles.select}
                >
                  <option value="MULTIPLE_CHOICE">객관식</option>
                  <option value="TEXT">주관식</option>
                </select>
              </div>
            ))}
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={() => navigate("/surveys")} style={styles.actionsButton}>
              취소
            </button>
            <button type="submit" disabled={isLoading} style={styles.actionsButton}>
              {isLoading ? "생성 중..." : "설문 만들기"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

const styles: any = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "white",
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  main: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "0 2rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    minHeight: "100px",
    resize: "vertical",
    boxSizing: "border-box",
  },
  questionsSection: {
    marginTop: "2rem",
  },
  questionsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  addBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  questionCard: {
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  questionHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginTop: "0.5rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    marginTop: "2rem",
  },
  actionsButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default CreateSurvey;
