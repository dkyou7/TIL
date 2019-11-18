신성진 강사님

pxp13716@gmail.com

#### 목적

테이블 crud 만들기

서블릿 만들기 jsp 파일 만들기

서블릿으로 빼는 과정

#### 심화

왜 서블릿으로 빼는지

왜 dao dto 만드는지

왜 라이브러리 관리를 해야하는지

표준태그 안쓴다.



자바 se 깔꺼다

- 줄루 깔기 
  
  1. https://www.azul.com/downloads/zulu-community/?&architecture=x86-64-bit&package=jdk
  
- 자바 깔기
  1. https://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html
  2. 버전에 맞게 작성한거 받으면 된다.
  
- 자바 path 등록하기

- 톰켓 서버 실행
  1. statrtup.bat
  2. http://localhost:8080

- 이클립스 깔기

- 오라클 디비 깔기
  - 비밀번호 manager
  - 포트 바꿔주기 & 디비 설정
    - sqlplus / as sysdba
    - select dbms_xdb.getHttpport() form dual;
    - exec dbms_xdb.setHttpport(8081);
    - alter user hr account unlock;
    - alter user hr identified by hr;
    - conn hr/hr
    - select * from employees;

- widow - perspective - reset perspective

- file - new - dynamic web project
  
  - java EE
  
- preferences - contents types - 
  - default encoding : utf-8
  - java properties file - default encoding : utf-8
  - jsp - default encoding : utf-8 바꿔주기
  - web - css,jsp,html - utf-8 바꿔주기
  
- workspace - text file encoding - other : utf-8

- 서버 더블클릭 - http1.1 포트 8090으로 바꿔주기

- 톰켓 - jsp 파일들 관리 가능하도록 함
  - 서블릿 컨테이너
    - a.jsp 파일 ,, 서블릿 파일 등을 읽어서 등록해줌
  - 스프링 컨테이너
    - xml 읽어서 관리

- get, post 방식

  - get : 엥간한거 : url 에 노출된다. 꺼내오는건 get doGet method
  - post : from action='post' : 보안문제 , db에 가져다 때려놓는거 post : poPost method
  - 요청에 관련된 건 request 에서 관리, 접속에 관련된 정보는 request
  - response : 다시 던져줘야 하는 정보, stream, session, cookie 리소스를 가진다.

- 정보 공유 4가지 방법

  - 서블릿 전체가지고 있는 서블릿 컨텍스트
  - 세션, 로그인 정보
  - 리퀘스트
  - 페이지 ( 거의 안씀 )

  - 속성들을 때려 넣을 수 있다. 디스패쳐 서블릿
  - 서블릿 컨테이너 리퀘스트 리스펀스 객체 만들어서 던져주니까 이거 두개 먼저 찾아보자

- 쓰더라도 컨테이너에 등록해야 한다.

  - web.xml 에 등록

    ```xml
    <!-- servlet 등록하기. 등록한 서블릿 P077_First을 P077이라는 이름으로 쓰겠다.-->
    <servlet>
        <servlet-name>P077</servlet-name>
        <servlet-class>com.book.chap02.P077_First</servlet-class>
    </servlet>
    ```

    ```xml
     <!-- 클라이언트 요청에 어떤 서블릿이 호출될지를 정의 
      	    클라이언트가 htt...../abc 라고 요청이오면 등록된 서블릿 중 P077이라는 서블릿을 호출해서 실행-->
      <servlet-mapping>
      	<servlet-name>P077</servlet-name>
      	<url-pattern>/abc</url-pattern>
      </servlet-mapping>
    ```

    

- 어노테이션 방식

- web.xml 
  
- 등록방식과 차이점이 있지만 web.xml 은 요약집 처럼 한번에 볼 수 있다는 장점이 있다.
  
- 호스팅?
  - 컴퓨터,, 선 , 서버 프로그램, 세팅, 
  - 아이피 맨날 바뀌니까 안된다
  - 고정 아이피 ,
  - 서버 사야됌, 
  - 시간 너무 많이 걸린다!
  - 준비된 곳의 하드 디스크를 일부 빌린다. 이걸 호스팅이라고 한다!
  
- 가상으로 올린것만 8090이다.

- 프로젝트 우클릭
  - java build path - Default output folder - browse - 경로를 아래와 같이 바꾸자
  - Basic03/WebContent/WEB-INF/classes
  
- 톰켓 서버에 올리는 방법

  - war 파일로 올리는 방법
    - tomcat - webapp 에 war 파일 붙여넣기한다.
    - 해당 경로로 가준다.

- p095 서블릿 적용하는 방법

  - 

- 집가서 해봐야 할 것

  - 세팅
  - 서버 만지기
  - 톰켓 설치
  - 서블릿

- p106 요청 하는 사람에 대한 정보 뽑아내기

  - 리모트 주소만큼은 기억하자.
  
- ctrl + shift + f : 코드 정리하기

- ctrl  + shift + o : 임포트파일 관리

- request, response 에는 어떤것이 있는지 알아보았음

#### 질의 문자열 *** 중요하다

- 