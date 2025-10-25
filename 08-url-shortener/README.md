# URL Shortener & Analytics Service

URL 단축 및 클릭 통계 RESTful API 서비스입니다.

## 기능

- URL 단축 (해시 알고리즘 사용)
- 리디렉션
- 클릭 통계 및 분석
- QR 코드 생성
- Heroku 단일 서비스 배포
- React 프론트엔드

## 기술 스택

### Backend

- Java 17 (LTS)
- Spring Boot 3.2.x
- PostgreSQL 16+
- Spring Data JPA
- Maven 3.9.x
- Swagger/OpenAPI 3.0

### Frontend

- React 19
- TypeScript
- Tailwind CSS
- React Router
- Recharts (차트)
- Axios (HTTP 클라이언트)

## 프로젝트 구조

```
├── src/main/java/com/urlshortener/     # Backend (Spring Boot)
│   ├── controller/                     # REST 컨트롤러
│   ├── service/                        # 비즈니스 로직
│   ├── repository/                     # 데이터 접근
│   ├── entity/                         # JPA 엔티티
│   ├── dto/                           # 데이터 전송 객체
│   ├── exception/                     # 예외 처리
│   └── config/                        # 설정
├── frontend/                          # Frontend (React)
│   ├── src/
│   │   ├── components/                # React 컴포넌트
│   │   ├── services/                  # API 서비스
│   │   ├── types/                     # TypeScript 타입
│   │   └── App.tsx                    # 메인 앱
│   └── package.json
├── src/main/resources/
│   ├── application.properties
│   └── application-test.properties
├── pom.xml
├── Procfile
└── README.md
```

## 빠른 시작

### Backend (Heroku 배포됨)

서비스가 이미 Heroku에 배포되어 있습니다:

- **URL**: https://aparkjun-url-shortener-single-1e5d9cf3276f.herokuapp.com/
- **Swagger UI**: https://aparkjun-url-shortener-single-1e5d9cf3276f.herokuapp.com/swagger-ui/index.html

### Frontend 로컬 실행

```bash
cd frontend
npm install
npm start
```

프론트엔드는 http://localhost:3000 에서 실행됩니다.

### Docker Compose로 전체 실행

```bash
docker-compose up -d
```

## API 문서

Swagger UI: `/swagger-ui/index.html`

## 주요 엔드포인트

### URL 단축

- `POST /api/urls` - URL 단축 생성
- `GET /api/urls` - 모든 URL 조회
- `GET /api/urls/{shortCode}` - URL 정보 조회
- `DELETE /api/urls/{shortCode}` - URL 삭제
- `GET /{shortCode}` - 리디렉션
- `GET /api/urls/{shortCode}/qr` - QR 코드 생성

### 분석

- `GET /api/analytics/{shortCode}` - 전체 통계
- `GET /api/analytics/{shortCode}/timeline` - 시간대별 통계
- `GET /api/analytics/{shortCode}/browsers` - 브라우저별 통계
- `GET /api/analytics/{shortCode}/os` - OS별 통계
- `GET /api/analytics/{shortCode}/devices` - 디바이스별 통계
- `GET /api/analytics/{shortCode}/locations` - 위치별 통계

## 프론트엔드 기능

### URL 단축

- 원본 URL 입력
- 커스텀 별칭 설정 (선택사항)
- 제목 및 설명 추가 (선택사항)
- 실시간 URL 단축

### URL 관리

- 단축된 URL 목록 조회
- URL 복사 기능
- QR 코드 생성 및 다운로드
- URL 삭제 기능

### 분석 대시보드

- 실시간 클릭 통계
- 브라우저별 분석
- 운영체제별 분석
- 디바이스별 분석
- 지역별 분석
- 시간대별 클릭 추이 차트

## 라이선스

MIT License
