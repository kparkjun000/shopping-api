# 설문조사 시스템 (Survey System)

전체 스택 설문조사 생성 및 응답 수집 시스템

## 🎯 프로젝트 구조

```
09-survey-system/
├── survey-api/          # Spring Boot 백엔드
│   ├── src/main/java/
│   │   └── com/survey/api/
│   │       ├── config/      # CORS, Security, OpenAPI 설정
│   │       ├── controller/  # REST API 컨트롤러
│   │       ├── service/     # 비즈니스 로직
│   │       ├── repository/  # 데이터 접근
│   │       ├── entity/      # JPA 엔티티
│   │       ├── dto/         # 데이터 전송 객체
│   │       └── security/    # JWT 인증
│   └── pom.xml
├── survey-frontend/     # React + TypeScript 프론트엔드
│   ├── src/
│   │   ├── pages/       # 페이지 컴포넌트
│   │   ├── services/    # API 서비스
│   │   ├── contexts/    # Context API
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## 🚀 빠른 시작

### 백엔드 (Spring Boot)

```bash
cd survey-api
mvn spring-boot:run
```

백엔드 서버: http://localhost:8080
Swagger UI: http://localhost:8080/swagger-ui/index.html

### 프론트엔드 (React)

```bash
cd survey-frontend
npm install
npm run dev
```

프론트엔드: http://localhost:5173

## ✅ 주요 기능

### 백엔드
- ✅ JWT 기반 인증/인가
- ✅ 설문 생성, 수정, 삭제
- ✅ 설문 응답 제출 및 조회
- ✅ CORS 설정
- ✅ Swagger API 문서화
- ✅ PostgreSQL 데이터베이스
- ✅ Heroku 배포

### 프론트엔드
- ✅ 회원가입/로그인
- ✅ 설문 목록 조회
- ✅ 설문 생성
- ✅ 설문 참여
- ✅ 반응형 디자인

## 📋 API 엔드포인트

### 인증
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인

### 설문
- `GET /api/surveys` - 설문 목록 조회
- `POST /api/surveys` - 설문 생성
- `GET /api/surveys/{id}` - 설문 조회
- `PUT /api/surveys/{id}` - 설문 수정
- `DELETE /api/surveys/{id}` - 설문 삭제

### 응답
- `POST /api/surveys/{id}/responses` - 응답 제출
- `GET /api/surveys/{id}/responses` - 응답 조회

## 🌐 Heroku 배포

### 백엔드
- URL: https://survey-system-api-dd94bac93976.herokuapp.com
- Swagger: https://survey-system-api-dd94bac93976.herokuapp.com/swagger-ui/index.html

## 🛠️ 기술 스택

### 백엔드
- Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- Swagger/OpenAPI 3
- Lombok

### 프론트엔드
- React 18
- TypeScript
- Vite
- React Router
- Axios
- Context API

## 📝 환경 변수

### 백엔드 (application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/surveydb
jwt.secret=your-secret-key
```

### 프론트엔드 (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

## 📖 자세한 문서

- [백엔드 README](survey-api/README.md)
- [프론트엔드 README](survey-frontend/README.md)

## �� 개발자

설문조사 시스템 개발

