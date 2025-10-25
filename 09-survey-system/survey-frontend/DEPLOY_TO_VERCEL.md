# Vercel 배포 가이드

## 개요
이 문서는 프론트엔드를 Vercel에 배포하는 방법을 설명합니다.

## 사전 요구사항
- Vercel 계정 (https://vercel.com)
- GitHub 저장소

## 배포 방법

### 방법 1: Vercel 웹사이트를 통한 배포 (추천)

1. **Vercel에 로그인**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택 (또는 Import Git Repository)

3. **프로젝트 설정**
   - Framework Preset: `Vite`
   - Root Directory: `survey-frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **환경 변수 설정**
   - VITE_API_URL=https://survey-system-api-dd94bac93976.herokuapp.com/api

5. **Deploy 클릭**

### 방법 2: Vercel CLI를 통한 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# survey-frontend 디렉토리로 이동
cd survey-frontend

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

## 환경 변수

| 변수명 | 설명 | 값 |
|--------|------|-----|
| VITE_API_URL | 백엔드 API URL | https://survey-system-api-dd94bac93976.herokuapp.com/api |

## 배포 후 확인

1. Vercel 대시보드에서 배포 URL 확인
2. 브라우저에서 URL 접속
3. 회원가입/로그인 기능 테스트

## 백엔드 URL

- **Heroku**: https://survey-system-api-dd94bac93976.herokuapp.com
- **API Base**: https://survey-system-api-dd94bac93976.herokuapp.com/api
- **Swagger UI**: https://survey-system-api-dd94bac93976.herokuapp.com/swagger-ui/index.html

## 문제 해결

### CORS 오류
- 백엔드의 `CorsConfig.java`에서 프론트엔드 도메인 추가 필요

### API 연결 실패
- 환경 변수 `VITE_API_URL` 확인
- Heroku 백엔드 서버 상태 확인
