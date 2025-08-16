# Kotlin, React을 이용한 Project(Simple Blog)
> Simple Blog는 게시판 기능을 중심으로 구현한 간단한 블로그 프로젝트입니다.<br>
> Spring Boot, JPA, JWT, Spring Security를 활용해 개발하였으며, JWT 기반으로 사용자 인증을 구현했습니다.<br>
> 이전 프로젝트는 Java로 개발했지만, 이번에는 Kotlin을 사용해 간결한 문법, nullable 타입, null 안전성, 그리고 Java 코드와의 호환성 등 Kotlin의 장점을 활용했습니다.<br>
또한 기존의 서버 사이드 렌더링(JSP, Thymeleaf) 방식이 아닌 클라이언트 사이드 렌더링을 위해 React를 도입했습니다.
> 이를 통해 React와 Kotlin 간의 페이지 상호작용 방식을 고민하며 구현했습니다.<br>
이번 글에서는 React와 관련된 부분을 중심으로 설명합니다.<br>
> 백엔드까지 포함한 Simple Blog 프로젝트 전체 정리는 [여기](https://github.com/chungi21/simple-blog)에서 확인할 수 있습니다.
<img width="2215" height="2378" alt="Image" src="https://github.com/user-attachments/assets/54ce2446-b878-4518-bcdc-6b0faa2bd715" />

## 목차
* [프로젝트 구조](#프로젝트-구조)
* [핵심 기능 모듈(API, Routes, Utils)](#핵심-기능-모듈(API,-Routes,-Utils))
* [React(CSR)장점과 이번 프로젝트 활용 포인트](#React(CSR)장점과-이번-프로젝트-활용-포인트)
  <br><br>
## 프로젝트 구조
📂 src  
 ┣ 📂 api               # 서버와 통신하는 API 모음 (Axios 활용)  
 ┃ ┣ commentApi.jsx     # 댓글 관련 API 호출  
 ┃ ┣ memberApi.jsx      # 회원 관련 API 호출  
 ┃ ┣ postApi.jsx        # 게시판 관련 API 호출  
 ┃ ┗ axiosInstance.jsx  # Axios 공통 설정 (인스턴스 생성, 토큰 자동 헤더 추가)  

 ┣ 📂 components        # 재사용 가능한 UI 컴포넌트 모음  
 ┃ ┣ CommentForm.jsx    # 댓글 작성 Form  
 ┃ ┣ CommentList.jsx    # 댓글 목록  
 ┃ ┣ Header.jsx         # 헤더  
 ┃ ┣ LoginForm.jsx      # 로그인 Form  
 ┃ ┣ MemberForm.jsx     # 회원가입/정보수정 Form  
 ┃ ┣ MembersItem.jsx    # 회원 목록 (최신/전체 공용)  
 ┃ ┣ Pagination.jsx     # 페이징 처리  
 ┃ ┣ PostAction.jsx     # 게시글 수정·삭제 버튼  
 ┃ ┣ PostForm.jsx       # 게시글 작성 Form  
 ┃ ┗ PostItem.jsx       # 게시판 목록 아이템  

 ┣ 📂 pages             # 라우트와 직접 연결되는 페이지 단위 컴포넌트  
 ┃ ┣ JoinPage.jsx       # 회원 가입 페이지  
 ┃ ┣ LoginPage.jsx      # 로그인 페이지  
 ┃ ┣ MainPage.jsx       # 메인 페이지  
 ┃ ┣ MembersPage.jsx    # 회원 전체 목록 페이지  
 ┃ ┣ MyPage.jsx         # 내 정보 수정 페이지  
 ┃ ┣ PostCreatePage.jsx # 게시판 작성 페이지  
 ┃ ┣ PostDetailPage.jsx # 게시판 상세 페이지  
 ┃ ┣ PostEditPage.jsx   # 게시판 수정 페이지  
 ┃ ┗ SecessionPage.jsx  # 회원 탈퇴 페이지  

 ┣ 📂 routes            # 라우팅 관련 설정/보호 컴포넌트  
 ┃ ┗ ProtectedRoute.jsx # 인증된 사용자만 접근 가능한 라우트  

 ┣ 📂 utils             # 프로젝트 전반에서 사용하는 유틸리티 함수 모음  
 ┃ ┗ auth.jsx           # 인증/인가 관련 유틸 함수 (토큰, 사용자 정보, 로그아웃 등)  
<br><br>    
## 핵심 기능 모듈(API, Routes, Utils)
### axiosInstance.jsx
* Axios 인스턴스를 생성하고, 모든 요청에 공통 설정을 적용했습니다.
  * `baseURL` 설정 (백엔드 서버 주소)
  * `withCredentials: true` (쿠키 자동 포함)
  * 요청 인터셉터를 통해 `Authorization` 헤더에 `Bearer` 토큰 자동 추가
⇒ API 호출 코드에서 중복 없이 간결하게 사용할 수 있게 했습니다.
 
### ProtectedRoute.jsx
* 로그인한 사용자만 접근할 수 있는 페이지를 감싸는 컴포넌트입니다.
  * `isLoggedIn` 체크
  * AccessToken이 없으면 RefreshToken으로 재발급 시도
  * 실패 시 로그인 페이지로 이동시키고, 알림 표시
```
// App.jsx
<Route path="/mypage" element={
  <ProtectedRoute>
    <MyPage />
  </ProtectedRoute>
} />
```

### auth.jsx
* 인증/인가 관련 유틸 모음입니다.
  * AccessToken 존재 여부 체크 (`isLoggedIn`)
  * 로그인 사용자 ID/이메일 저장 및 조회 (`saveCurrentUserId`, `getCurrentUserId`)
  * RefreshToken 존재 여부 확인 → 토큰 재발급 (`refreshAccessToken`)
  * 로그아웃 처리 (`logout`)
⇒ 인증 로직이 흩어지지 않고 한 곳에 모여 있어 재사용성과 유지보수성을 높였습니다.
<br><br>
## React(CSR)장점과 이번 프로젝트 활용 포인트
| React(CSR)<wbr>장점 | 프로젝트에서<wbr> 활용한<wbr> 부분 |
| :---               | :---                    |
| **빠른<wbr> 화면<wbr> 전환<wbr><br>(SPA)** | `pages` 디렉토리의 `LoginPage`, `MainPage`, `PostDetailPage` 등은 **라우팅만 바뀌고 전체 새로고침은 일어나지 않음**. → 게시글 작성, 회원가입, 로그인 후 곧바로 해당 페이지로 자연스럽게 이동 가능 |
| **컴포넌트<wbr><br> 재사용성** | `components` 디렉토리의 `Pagination`, `PostForm`, `MemberForm` 등은 여러 페이지에서 공용으로 사용. → 코드 중복 줄이고 유지보수 용이 |
| **상태<wbr> 관리와<wbr><br> 동적<wbr>UI** | `CommentForm`, `CommentList`는 댓글 추가/삭제 시 새로고침 없이 리스트만 갱신됨. → CSR 덕분에 실시간 반응형 UI 가능 |
| **비동기<wbr> 데이터<wbr><br> 처리** | `api` 디렉토리(`axiosInstance`, `commentApi`, `postApi` 등)와 함께 동작하여, 서버 데이터(게시글, 댓글, 회원정보)를 가져와 **렌더링과 데이터 갱신을 분리**. |
| **인증/인가<wbr> 처리<wbr><br> 용이** | `ProtectedRoute.jsx`와 `auth.jsx` 조합 → 로그인 여부에 따라 접근 가능한 페이지를 클라이언트 측에서 제어. (예: `/mypage` 접근 시 토큰 확인 → 없으면 `/login`으로 리다이렉트) |
| **사용자<wbr> 경험(UX)<wbr><br> 개선** | 로그인이 필요한 경우 alert 후 즉시 `/login`으로 이동, 새 토큰 자동 발급(`refreshAccessToken`) 등 CSR에서 가능한 **끊김 없는 UX** 제공 |


