import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { surveyAPI } from "../services/api";

interface Survey {
  id: string;
  title: string;
  description: string;
  creator: { username: string };
  createdAt: string;
}

const Surveys: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      const response = await surveyAPI.getAll();
      setSurveys(response.data);
    } catch (error) {
      console.error("Failed to load surveys:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await surveyAPI.delete(id);
      loadSurveys();
    } catch (error) {
      console.error("Failed to delete survey:", error);
    }
  };

  if (isLoading) return <div style={styles.loading}>로딩 중...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>설문조사 시스템</h1>
        <div style={styles.userInfo}>
          <span>안녕하세요, {user?.username}님</span>
          <button
            onClick={() => navigate("/create-survey")}
            style={styles.createBtn}
          >
            새 설문 만들기
          </button>
          <button onClick={logout} style={styles.logoutBtn}>
            로그아웃
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h2>설문 목록</h2>
        {surveys.length === 0 ? (
          <p>설문이 없습니다.</p>
        ) : (
          <div style={styles.surveyList}>
            {surveys.map((survey) => (
              <div key={survey.id} style={styles.surveyCard}>
                <h3>{survey.title}</h3>
                <p>{survey.description}</p>
                <div style={styles.meta}>
                  <span>작성자: {survey.creator.username}</span>
                  <span>{new Date(survey.createdAt).toLocaleDateString()}</span>
                </div>
                <div style={styles.actions}>
                  <button
                    onClick={() => navigate(`/surveys/${survey.id}`)}
                    style={styles.actionsButton}
                  >
                    참여하기
                  </button>
                  <button
                    onClick={() => navigate(`/surveys/${survey.id}/responses`)}
                    style={styles.actionsButton}
                  >
                    결과 보기
                  </button>
                  <button
                    onClick={() => handleDelete(survey.id)}
                    style={{ ...styles.actionsButton, ...styles.deleteBtn }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const styles: any = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
  },
  header: {
    backgroundColor: "white",
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  createBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  main: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "0 2rem",
  },
  surveyList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem",
  },
  surveyCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    fontSize: "0.875rem",
    color: "#666",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  actionsButton: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#fee !important",
    color: "#c33 !important",
  },
};

export default Surveys;
