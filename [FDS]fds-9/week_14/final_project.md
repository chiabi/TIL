
애자일 형식
+ sprint
  - 데이터설계
  - 시나리오
  - (와이어프레임)
  <!-- - (프로토타입) -->
  - PC / CC
+ 스타일링

## 개발 순서

1. 로그인/로그아웃, 회원가입/회원탈퇴
2. 팀 생성 / 팀 탈퇴(아무도 없으면(마지막 멤버 팀 탈퇴 시) 자동으로 팀 데이터 삭제) / 팀 멤버 초대
3. 프로젝트 생성(타이틀|서브타이틀) 
  - 생성자는 자동으로 PM 권한 부여
  - PM은 프로젝트 수정/삭제 가능
4. 태스크 생성/읽기/수정/삭제
  - 타이틀/내용/기간/라벨(멀티 - 팀별로 쌓임)
  - 완료
5. 액티비티(댓글-태스크 로그) 생성/읽기/수정/삭제
  - 내용/시간
6. 검색기능
  - 태스크별 소팅(태스크 검색)
  - 라벨 소팅(라벨 검색)
  - (유저별 소팅)
  - 완료 소팅
7. 타임라인(프로젝트별 태스크 타임라인)
8. 캘린더(팀별 캘린더)

### 개발 일정

+ 1 기능위주
  - 1day - 1, 2
  - 2day - 3, 4, 5
  - 2day - 6, (1, 2, 3, 4, 5)
  - 3day - 7, 8
+ 2 스타일링 / 트러블 슈팅

## 기술

- vscode, github, git flow
- eslint, prettier
- fds-json-server, Node.js
- testing: storybook
- libraries
  + react, react-router
  + axios
  + react-moment
  + airbnb-react-date
  + react-calendar-timline
- css framework
  + sementai-ui react
