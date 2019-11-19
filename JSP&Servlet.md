[toc]

### day1

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
  - 세션, 
    - 세션 : 내가 쓸 데이터를 서버에 저장. - 로그인에 활용됨
    - 쿠키 : 내가 쓸 데이터를 클라이언트에 저장.
  - 로그인 정보
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



### day2

#### 복습

- 서블릿 컨테이너, jsp 서블릿 파일에 리퀘스트 리스펀스 던져준다. 선언하지 않고 바로 사용 가능하다.
- 서블릿은 겟, 포스트에 따라 다르다.
- 리퀘스트는 클라이언트가 요청하는 대부분의 정보들
- 가져올 때는 get을, 설정할 때는 post 써보자
- 리스펀스는 응답해야할 것들.
  - 문서들을 export 하기 위해 제일 먼저 해야할 게 컨텐츠 타입 잡는거, charset=utf-8
  - 스트림 하나 얻어오자, 리스펀스.getwriter() 하고 쭉쭉 입력해보는 작업 해봄
  - response.getWriter()
  - response.setContentType()
- 폼을 통해서 넘기게 되면 방식을 지정해줘야 한다. method='get' action='p142' 방식으로
  - get
  - post 방식으로 넘기게 된다.
  - 한글 처리 방법도 배워야 한다.

- post 방식으로 날렸을 때 한글이 깨지는 이유?
  - get 방식은 브라우져의 어디에 담기는거야? 헤더부분에 담긴다.
  - 브라우져가 있으면 주소줄에 물음표 name=?? 이런식으로
  - 헤더정보를 보게 되면 status 200 http format 방식으로 저장
  - post 는 바디에 파라메터 정보가 담긴다. 인코딩 값을 바디껄로 따지기 때문에
  - 정해주지 않으면 기본 포멧으로 인코딩된다.
- uri : 도메인을 뺀 나머지 path
- url : 도메인을 포함한 path
- 서버단. web.xml 을 변경할 시 서버를 재기동해야한다.

### 기본 코딩 순서

1. 프로젝트 생성하기

2. src - 서블릿 만들기 - 기본 구조 만들기

   - ```java
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
     	response.setContentType("text/html;charset=utf-8");
     	PrintWriter out = response.getWriter();
     	
     	out.println("Path ->"+path);
     	out.println("Email ->"+email);
     	
     	out.close();
     }
     ```
   
   - 

3. web.xml 만지기

   - ```xml
       <servlet>
       	<servlet-name>P171</servlet-name>
       	<servlet-class>com.book.chap05.P171_ServletConfig</servlet-class>
       	<init-param>
       		<param-name>path</param-name>	<!-- 변수명 -->
       		<param-value>/WEB-INF/config/setting.xml</param-value>
       	</init-param>
       	<init-param>
       		<param-name>email</param-name>	<!-- 변수명 -->
       		<param-value>aa@aa.com</param-value>
       	</init-param>
       	<load-on-startup>1</load-on-startup>
       </servlet>
     ```

   - 이런 방식과 웹에서 만들어주는 방법 두가지가 있다.

4. jsp 파일 만들기

5. 소통하기 request.getParameter("name") 방식을 이용한다.

- annotation 만들어주기

- 전역 변수 선언 이유 : 밖으로 빼면 하나만 만들어 주면 된다.

  - ```java
    // 몇 만명이 접속해도 PrintWriter는 1개만 있으면 되므로 멤버변수로 선언
    private PrintWriter pw = null;
    ```

  - ```java
    @Override
    	public void init(ServletConfig config) throws ServletException {
    		String path = "C:\\Users\\student\\log.dat";	// 경로에 파일이 생성된다.
    		try {
    			// 객체 생성한다.
    			pw = new PrintWriter(new FileWriter(path,true));
    		} catch (IOException e) {
    			e.printStackTrace();
    		}
    	}
    // 이거 경로가 xml 작업으로 인해 변경된다.
    ```

  - ```java
    @Override
    	public void destroy() {
    		// null check
    		if(pw!=null) {
    			pw.close();
    		}
    	}
    ```

  - ```java
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    		String name = request.getParameter("name");
    		String pwd = request.getParameter("password");
    		
    		String greet = name+"님. 안녕하세요!";
    		
    		// 접속한 로그 남겨주는 작업
    		if(pw!=null) {
    			GregorianCalendar now = new GregorianCalendar();
    			pw.printf("%TF %TT => %s : %s %n", now,now,name,pwd);
    			pw.flush();// 파일에 쓰라고 밀어준다.
    		}
    	}
    ```

  - ```xml
    <servlet>
      	<servlet-name>Q186</servlet-name>
      	<servlet-class>com.book.chap05.Q186_LogCheck</servlet-class>
      	<init-param>
      		<param-name>path</param-name>
      		<param-value>C:\\Users\\student\\log.dat</param-value>
      	</init-param>
      </servlet>
       <servlet-mapping>
      	<servlet-name>Q186</servlet-name>
      	<url-pattern>/Q186</url-pattern>
      </servlet-mapping>
    ```

  - ```java
    @Override
    	public void init(ServletConfig config) throws ServletException {
    		// String path = "C:\\Users\\student\\log.dat";	// 경로에 파일이 생성된다.
    		String path = config.getInitParameter("path");	// 변경되었다.
    		try {
    			// 객체 생성한다.
    			pw = new PrintWriter(new FileWriter(path,true));
    		} catch (IOException e) {
    			e.printStackTrace();
    		}
    	}
    ```

  - 

### MVC 패턴

- 서블릿은 c 에 해당된다.
  - 자바 파일로 만들어야 한다.
- v 에 해당되는 것을 배울 것이다.
  - out.println으로 쓰여진 것은 전부 분리하여 view에 나타내야한다.
- m은 데이터 자료이다. 
  - 데이터들을 가져온다. 이 데이터를 어떻게 처리할 것인가에 대해 배워야 한다.
  - 스프링
  - ValueObject(VO)로 날려야 한다.
  - DAO(Data Access Object)
  - 세션 : 내가 쓸 데이터를 서버에 저장. - 로그인에 활용됨
  - 쿠키 : 내가 쓸 데이터를 클라이언트에 저장.

#### web.xml 작성법

- 나름의 규칙을 가지고 작성하는 것이 좋다.

#### 값을 넘기는 방법

```c++
// 위의 데이터를 다른 서블릿에서 사용할 수 있도록 저장
// context => 프로젝트 전체에서 참조
// Session => 브라우저가 닫히기 전까지 프로젝트에서 참조
// Request => 동일한 request를 사용하는 서블릿 또는 JSP에서 참조
```

- 컨텍스트

- 세션

- 리퀘스트

- 페이지(거의 안씀)

동적으로 속성과 값을 때려 넣을 수 있다. 넣을 때는 set, 받을때는 get

#### 서블릿끼리 값을 넘겨보자.

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name = request.getParameter("name");
		String kor = request.getParameter("kor");
		String eng = request.getParameter("eng");
		
		int total = Integer.valueOf(kor)+Integer.valueOf(eng);
		int avg = total/2;
		
		System.out.println(name+" : "+kor+" : " +eng);
		
		// 위의 데이터를 다른 서블릿에서 사용할 수 있도록 저장
		// context => 프로젝트 전체에서 참조
		// Session => 브라우저가 닫히기 전까지 프로젝트에서 참조
		// Request => 동일한 request를 사용하는 서블릿 또는 JSP에서 참조
		
		// context
		ServletContext sc = getServletContext();
		
		// Object name = new String("홍길동");
		sc.setAttribute("name", name);
		
		// Object kor = new Integer(100);
		sc.setAttribute("kor", kor);
		sc.setAttribute("eng", eng);
		sc.setAttribute("total", total);
		sc.setAttribute("avg", avg);
		
		response.sendRedirect("P203");
	}
```

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		out.println("<h3>Get Context Attribute</h3>");
		
		// Context 참조 객체를 얻어온다.
		ServletContext sc = getServletContext();
		
		// ServletContext Attribute 값을 가져온다.
		String name = (String)sc.getAttribute("name");
		int kor = (Integer)sc.getAttribute("kor");
		int eng = (Integer)sc.getAttribute("eng");
		int total = (Integer)sc.getAttribute("total");
		int avg = (Integer)sc.getAttribute("avg");
		
		out.println("Name=>"+name);
		out.println("kor=>"+kor);
		out.println("eng=>"+eng);
		out.println("total=>"+total);
		out.println("avg=>"+avg);
	}
```

- 변수 각각 만들기 너무 귀찮아
- 그래서 VO 객체 만들꺼야

#### 쿠키를 만들자

- 쿠키 : 클라이언트단에서 저장해놓은 정보
  - 생성
  - 변경
  - 삭제
- 쿠키는 string으로밖에 값을 못넘기기때문에 조금 불편한 것 같다

#### 세션을 만들자

- 이걸 보완한게 세션이다.
- 객체를 넘길 수 있다.
  - create
  - delete
  - add
  - get
  - remove



쿠키는 아니야 약간 다른 기술이야

데이터를 주고받는 기술로 쓰이지는 않는다.

안정된 데이터라고 할 수 없음.

세션, 어느 한도 내에서 브라우져 한도 내에서 유용하다

브라워 자체를 다 받아야된다

내일은 리퀘스트이다. 

이 리퀘스트는 겟에서밖에 못쓴다. 이 객체에 setAttribute 때려 ㅂ박고 다른 곳에서 꺼내 쓴다.

기본적으로 안된다. 항상 서블릿 컨테이너는 새로운 리퀘와 새로운 리스폰스를 할당해서 준다.

항상 새로운걸 준다.

썻던걸 다시 몼쓴다. 하지만 쓸 수 있도록 만드는 기술을 배울 것이다.