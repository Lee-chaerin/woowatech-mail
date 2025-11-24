# [📨 우아한 테크 메일 (WOOWATECH MAIL)](https://www.notion.so/4-WOOWATECHMAIL-2a57f34fae3b806da693edc591601060?source=copy_link)

WoowaTechMail(우아한테크메일)은 우테코(우아한테크코스) 학생들을 대상으로 한 기술 면접 대비 자동 메일 발송 서비스입니다.
사용자는 백엔드, 프론트엔드, 안드로이드 중 하나의 분야를 선택할 수 있고,
선택한 분야에 맞는 기술 면접 질문이 매일 오전 7시에 이메일로 자동 전송됩니다.

취업준비 중 “무엇을 모르는지 모르겠다”는 막막함에서 출발하여, 꾸준히 학습하고 기술 역량을 자연스럽게 쌓을 수 있도록 돕습니다.
이 서비스를 통해 학생들은 꾸준히 면접 감각을 유지하고, 매일 한 걸음씩 성장할 수 있습니다.

<br>

## 🌟 주요 기능
### 1. 기술 면접 질문 자동 생성
- OpenAI API를 활용해 백엔드 / 프론트엔드 / CS 등 카테고리별 질문 자동 생성
- 매일 밤 12시 자동 생성 스케줄러 작동
- 중복 방지 로직 적용 → 유니크한 질문 보장

### 2. 이메일 구독 등록
- 사용자가 메일을 받고 싶은 이메일 등록 -> 인증 코드를 통해 유효한 이메일만 등록 가능
- MySQL DB와 연동하여 안정적으로 관리

### 3. 매일 정해진 시간에 자동 메일 발송
- Node Cron 사용
- 템플릿 기반 HTML 이메일 전송

<br>

## 🛠️ 기술 스택
### Frontend
- React + Vite
- TypeScript
- React Query
- shadcn/UI + Tailwind

### Backend
- Node.js (Express)
- MySQL
- Node-cron
- Nodemailer
- OpenAI API (GPT 모델 활용)

<br>

## 📁 프로젝트 구조
### Backend
```sh
backend/
├── controller/                : 요청 처리 및 Service 호출
├── node_modules/
│   └── ...  
├── routes/                    : URL 라우팅 정의
├── services/
│   ├── constants.js           : 상수 관리
│   ├── mailer.js              : 메일 발송 로직
│   └── techletterService.js   : 질문 생성 및 구독 관리
├── db.js
├── index.js                   : 서버 진입점
├── package.json
└── pnpm-lock.yaml
```

### Frontend
```sh
backend/
├── public/
│   └── ...
├── src/
│   ├── assets/  
│   ├── components/   : 재사용 가능한 UI 컴포넌트
│   ├── lib/   
│   ├── pages/        : 페이지 컴포넌트(라우팅 단위)
│   ├── services/     : 외부 통신 및 데이터 로직
│   │   ├── api/      : API 호출 함수
│   │   └── queries/  : 데이터 상태 관리 로직
│   ├── types/        : TypeScript 타입 정의
│   ├── utils/        : 유틸리티 함수
|   ├── App.tsx      
│   └── main.tsx     
├── .gitignore
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

<br>

## 🧪 로컬 실행
### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

<br>

## 📬 만든 이유
취업 준비를 하면서
"기술 면접에서 무엇을 준비해야 하는지 모르겠다"는 막막함이 가장 컸습니다.
매일 조금씩이라도 학습할 수 있도록 도와주는 서비스가 있으면 좋겠다고 생각했고,
기존의 메일 기반 학습 서비스에 내가 원했던 기능들을 더해 만든 프로젝트입니다.

<br> 

## 🏁 향후 계획
- 배포 및 공유 (🔗 Backend/Frontend URL 연결)
- 맞춤형 코딩테스트 기능 추가
- 질문 주제 추천 엔진 고도화
