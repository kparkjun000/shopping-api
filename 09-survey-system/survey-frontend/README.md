# 설문조사 시스템 - 프론트엔드

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** - 빠른 개발 환경
- **React Router** - 라우팅
- **Axios** - API 통신
- **React Context API** - 전역 상태 관리

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 백엔드 API URL 설정

`.env` 파일 생성:

```env
VITE_API_URL=http://localhost:8080/api
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 주요 기능

- ✅ 사용자 인증 (로그인/회원가입)
- ✅ 설문 생성
- ✅ 설문 참여
- ✅ 설문 결과 조회
- ✅ JWT 토큰 기반 인증

## 프로젝트 구조

```
src/
├── components/      # 재사용 가능한 컴포넌트
├── contexts/        # Context API (인증 등)
├── pages/          # 페이지 컴포넌트
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Surveys.tsx
│   ├── CreateSurvey.tsx
│   └── SurveyResponse.tsx
├── services/        # API 서비스
│   └── api.ts
├── utils/          # 유틸리티 함수
├── App.tsx         # 메인 앱 컴포넌트
└── main.tsx        # 진입점
```

## 환경 변수

- `VITE_API_URL`: 백엔드 API URL (기본: http://localhost:8080/api)
