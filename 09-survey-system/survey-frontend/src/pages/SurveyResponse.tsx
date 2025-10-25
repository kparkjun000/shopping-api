import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { surveyAPI, responseAPI } from '../services/api';

const SurveyResponse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadSurvey();
  }, [id]);

  const loadSurvey = async () => {
    try {
      const response = await surveyAPI.getById(id!);
      setSurvey(response.data);
    } catch (error) {
      console.error('Failed to load survey:', error);
      alert('설문을 불러올 수 없습니다.');
      navigate('/surveys');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const responseData = {
        answers: Object.entries(answers).map(([questionIndex, value]) => ({
          questionId: survey.questions[parseInt(questionIndex)].id,
          answerText: value
        }))
      };

      await responseAPI.submit(id!, responseData);
      alert('설문이 제출되었습니다!');
      navigate('/surveys');
    } catch (error) {
      console.error('Failed to submit response:', error);
      alert('설문 제출에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div style={styles.loading}>로딩 중...</div>;
  if (!survey) return null;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>{survey.title}</h1>
        <button onClick={() => navigate('/surveys')} style={styles.backBtn}>
          목록으로
        </button>
      </header>

      <main style={styles.main}>
        <p style={styles.description}>{survey.description}</p>

        <form onSubmit={handleSubmit}>
          {survey.questions.map((question: any, index: number) => (
            <div key={question.id} style={styles.question}>
              <h3>{question.text}</h3>
              {question.questionType === 'MULTIPLE_CHOICE' ? (
                <div>
                  {question.options?.map((option: string, optIndex: number) => (
                    <label key={optIndex} style={styles.option}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required
                  style={styles.textInput}
                  placeholder="답변을 입력하세요"
                />
              )}
            </div>
          ))}

          <div style={styles.actions}>
            <button type="submit" disabled={isSubmitting} style={styles.actionsButton}>
              {isSubmitting ? '제출 중...' : '제출하기'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

const styles: any = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
  },
  header: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  main: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 2rem',
  },
  description: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    fontSize: '1.1rem',
    color: '#666',
  },
  question: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  option: {
    display: 'block',
    padding: '0.75rem',
    cursor: 'pointer',
  },
  textInput: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  actions: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  actionsButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};


export default SurveyResponse;
