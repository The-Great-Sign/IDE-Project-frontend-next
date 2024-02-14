<div>
 
# ChatGPT가 탑재된 컨테이너 기반 협업용 Web IDE

> 구름톤 트레이닝 풀스택 개발자 2회차 과정 <br>
> 개발 기간 : 2023.12.01 ~ 2023.12.28

<br>

## 👀 배포 주소

> 프론트엔드 서버 : https://the-greate-ide.vercel.app <br>
> 백엔드 서버 : https://www.thegreatide.site 

<br>

## 📝 팀 문서
> 😃 [팀 노션](https://www.notion.so/fd328dd60a27471c98e76f077c0cc0f5)<br>
> 👉 [백엔드 저장소](https://github.com/The-Great-Sign/IDE-Project-backend)

<br>

## 😎 팀 소개

<table width="500" align="center">
<tbody>
<tr>
<th>Pictures</th>
<td width="100" align="center">
<a href="https://github.com/naringst">
<img src="https://avatars.githubusercontent.com/u/92130993?v=4" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/hi-rachel">
<img src="https://avatars.githubusercontent.com/u/103404125?v=4" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/moonjw0">
<img src="https://avatars.githubusercontent.com/u/56528404?v=4" width="60" height="60">
</a>
</td>
</tr>
<tr>
<th>Name</th>
<td width="100" align="center">정나리</td>
<td width="100" align="center">문총미</td>
<td width="100" align="center">문지원</td>

</tr>
<tr>
<th>Role</th>
<td width="300" align="left">
<div align='center'>프론트엔드 팀장</div>
<ul>
<li>피그마 프로토타입 디자인</li>
<li>소셜 로그인</li>
<li>유저 마이페이지</li>
<li>동시편집 파일트리 </li>
<li>GitHub Actions 환경구축</li>
</ul>

</td>
<td width="300" align="left">
<ul>
<li>코드 에디터, 동시 편집 구현</li>
<li>프로젝트 페이지 담당(프로젝트 삭제, 비밀번호 변경, 목록 UI)</li>
<li>다크/라이트 테마 구현,</li>
<li>개발 환경설정(Github Actions, Husky, Next.js 환경구축)</li>
</ul>
</td>

<td width="300" align="left">
<ul>
<li>프로젝트 생성 및 입장 페이지 구현</li>
<li>초대된 사용자 입장 페이지 구현</li>
<li>터미널 구현</li>
<li>그룹 채팅 구현 </li>
<li>ChatGPT 채팅 구현</li>
<li>웹소켓 연결</li>
</ul>
</td>
</tr>
<tr>
<th>GitHub</th>
<td width="100" align="center">

<a href="https://github.com/naringst">
<img src="http://img.shields.io/badge/naringst-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/hi-rachel">
<img src="http://img.shields.io/badge/hi-rachel-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/moonjw0">
<img src="http://img.shields.io/badge/moonjw0-green?style=social&logo=github"/>
</a>
</td>
</tr>
</tbody>
</table>

<br>

## ☁️ 프로젝트 소개


### 1. 프로젝트 컨셉

- 실시간 협업용 Web IDE <br>
- chatGPT를 활용한 빠른 코드 리뷰

### 2. 기술 스택

<div>
 <img width="400" src="https://github.com/The-Great-Sign/IDE-Project-frontend-next/assets/103404125/ca850470-2c2a-4696-9ace-3979b6d6912d"/>
 <img width="264" src="https://github.com/The-Great-Sign/IDE-Project-frontend-next/assets/103404125/50790841-7169-4d99-ad51-5892db18fec4"/>
</div>

<br>

<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/> 
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/> <img src= "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"/>
 <img src="https://img.shields.io/badge/zustand-00A95C?style=for-the-badge&logo=&logoColor=white"><br>
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/><br>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>

<br>

### 3. 주요 기능

### ✨ 소셜 로그인

![로그인](https://github.com/The-Great-Sign/IDE-Project-frontend-next/assets/92130993/40c09297-28e7-45bb-a1e1-707d565c9ab3)
구글, 카카오 소셜 로그인을 통해 사용자는 번거로운 회원가입 / 로그인 과정을 거치지 않고 서비스를 이용할 수 있습니다. axios 인터셉터를 활용해 토큰 만료 5분 전 리프레시 토큰을 자동으로 받아오도록 구현해 사용자 경험을 향상시켰습니다. 또한 각 페이지 별 로그인하지 않은 사용자는 로그인 페이지로 이동되도록 구현했습니다.

### ✨ 파일트리 with 동시 편집
![파일트리](https://github.com/The-Great-Sign/IDE-Project-frontend-next/assets/92130993/51b8b234-9078-4e66-b5ea-3a0b5373c961)
react-arborist 라이브러리, 웹소켓을 활용해 다른 사용자의 파일/폴더 생성, 삭제가 실시간으로 반영되도록 파일트리를 구현했습니다. focus된 폴더 하위에 파일/폴더 생성이 가능하며, 파일트리 내의 context menu를 만들어 손쉽게 파일을 삭제할 수 있도록 하였습니다. 현재 지원중이지 않지만, 파일 드래그 앤 드랍 기능 또한 구현했습니다.

### ✨ 코드 에디터 with 동시 편집
![코드에디터](https://github.com/The-Great-Sign/IDE-Project-frontend-next/assets/103404125/fbeafa42-bbd0-4684-add2-ca827f9cd0ef.gif)

codemirror, liveblocks, yjs 라이브러리를 이용해 다중 유저, 다중 파일 상황에서도 충돌없는 동시편집이 가능하게 구현했습니다. 각 파일을 누르면 현재 파일을 보고 있는 사용자가 상단에 표시되고 편집시 각 사용자의 커서 위치가 표시, 커서 hover시 유저 이름이 나타납니다. 뒤로가기, 임시 저장이 가능하며 저장 버튼을 누를시 서버에 코드가 저장이 됩니다. codemirror를 이용한 다양한 언어별 자동완성과 코드 접기, 코드 검색 등 기본 코드 에디터 기능이 가능합니다.


### ✨ 프로젝트 생성, 관리

![프로젝트생성,관리](https://github.com/The-Great-Sign/IDE-Project-frontend-next/assets/103404125/c635c6ec-7ed4-44aa-a0f0-d6d64b3cbbdd.gif)

프로젝트 언어, 이름, 비밀번호, 설명 정보를 받아 생성을 완료하면 다른 사용자에게 초대 링크를 공유하거나 프로젝트에 입장할 수 있습니다. 프로젝트 페이지에서 내가 생성한 프로젝트, 초대받은 프로젝트 목록이 보이고 내가 생성한 프로젝트는 비밀번호 변경과 삭제가 가능합니다. 

### ✨ 프로젝트 입장, 초대

![친구를 초대해용](https://github.com/The-Great-Sign/IDE-Project-frontend-next/assets/121412353/ae329013-4d15-41d4-a3bb-f3c361c08f85)

입장 시에는 http와 웹소캣 연결을 통해 프로젝트의 초기화 설정에 대한 완료 메세지를 받아 프로젝트에 입장합니다.<br>
초대 링크를 통해 접근한 사용자는 로그인 여부 / 비밀번호를 확인하여 프로젝트에 입장합니다 

### ✨ 채팅

![채팅](https://github.com/naringst/dev-log/assets/92130993/21aecae4-3381-46ea-bd06-625a2d34316f)


IDE의 프로젝트에 참여해있는 사용자간에 텍스트를 주고 받을 수 있는 기능입니다. 사용자의 입/퇴장시에 '@@@님이 입장 | 퇴장 했습니다.' 라는 문구가 보여집니다. sockjs, stompjs를 사용하여 브라우저간 호환성을 높였습니다. 구독 - 발행 모델을 사용하여 여러 사용자가 하나의 채팅방을 이용할 수 있습니다.

### ✨ 터미널

![터미널 및 실행](https://github.com/The-Great-Sign/IDE-Project-frontend-next/assets/121412353/6b3cace5-e9f4-4622-9595-623d26fb2e44)

터미널을 통해 프로젝트 파일에 대한 조작을 할 수 있으며 프로그램을 수행시킬 수 있습니다. 
코드편집기에 있는 실행 버튼을 누르면 터미널에서 현재 실행중인 파일의 실행 결과를 확인할 수 있습니다.
웹소캣 연결을 통해 명령어의 실행결과를 터미널에 출력합니다.

### ✨ ChatGPT를 통한 코드 리뷰 및 질문

![ChatGPT](https://i.imgur.com/6D1kcfn.gif)

현재 작성중인 소스코드에 대한 코드 리뷰를 간편하게 받을 수 있으며, 질문이 있는 경우 내장되어있는 ChatGPT와의 채팅 기능을 통해 결과를 받아 볼 수 있습니다.




</div>
