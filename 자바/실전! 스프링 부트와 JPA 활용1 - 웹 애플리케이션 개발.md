[toc]

# 실전! 스프링 부트와 JPA 활용1 - 웹 애플리케이션 개발

## 0. 목표

- 실무에 가까운 복잡한 예제 구현하기
  - 분석 설계
  - 테이블 설계
  - 애플리케이션 아키택처 구성
  - 핵심 비즈니스 로직 개발
    - 테스트 케이스로 검증
    - 도메인 주도 설계
  - 웹 계층 개발

## 1. 프로젝트 환경설정

### 1. 프로젝트 생성

- 스프링 부트 스타터(

  https://start.spring.io/)를

   

  사용하자.

  - 나는 이걸로 인텔리제이 임포트하니까 자꾸 이상한 에러가 났다. 그래서 그냥 새로 만들기로 시작함.

- Dependencies (5개)

  - Spring Web
  - thymeleaf
  - Spring Data JPA
  - h2
  - lombok

- groupId: jpabook artifactId: jpashop

- Gradle 전체 설정은 위 Dependencies 를 제대로 받으면 잘 적용된 상태로 있다. build.gradle 을 확인해보자. 그래들 프로젝트를 스프링부트 프로젝트로 변경하기 위한 설정

```java
buildscript {
    ext {
        springBootVersion = '2.1.7.RELEASE'
    }
    repositories {
        mavenCentral()
        jcenter()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'

group 'jpabook'
version '1.0-SNAPSHOT'
sourceCompatibility = 1.8

repositories {
    mavenCentral()
    jcenter()
}

dependencies {
    compile('org.springframework.boot:spring-boot-starter-web')
    compile('org.springframework.boot:spring-boot-starter-thymeleaf')
    compile('org.projectlombok:lombok')
    compile('org.springframework.boot:spring-boot-starter-data-jpa')
    compile('com.h2database:h2')
    compile('org.springframework.boot:spring-boot-starter-mustache')
    compile('org.springframework.boot:spring-boot-starter-oauth2-client')
    compile('org.springframework.session:spring-session-jdbc')
    compile('org.mariadb.jdbc:mariadb-java-client')
    testCompile('org.springframework.boot:spring-boot-starter-test')
    testCompile('org.springframework.security:spring-security-test')
}
```

- 동작 확인

- D/study/jpashop 으로 만들었움.

  - 기본 테스트 케이스 실행

    - 안되서 다 따라쳐서 만들었다.

      [![image](https://user-images.githubusercontent.com/26649731/77044680-31bae700-6a03-11ea-90aa-e2e3594af3de.png)](https://user-images.githubusercontent.com/26649731/77044680-31bae700-6a03-11ea-90aa-e2e3594af3de.png)

    - 다음과 같은 디렉토리로 두개의 Java 클래스를 만들어 테스트 해본다.

  ```
  @SpringBootApplication
  public class JpashopApplication {
      public static void main(String[] args) {
          SpringApplication.run(JpashopApplication.class,args);
      }
  }
  ```

  - 스프링 부트 메인 실행 후 에러페이지로 간단하게 동작 확인(`[http://localhost:8080](http://localhost:8080/)')
  - white error page 가 뜨면 정상이다.

  ```
  @RunWith(SpringRunner.class)
  @SpringBootTest
  public class JpashopApplicationTest {
      @Test
      public void contextLoads(){
  
      }
  }
  ```

  - 에러 없이 시작된다면 정상이다.

### 2. View 환경 설정

#### 1. 단축키 꿀팁

- ctrl + alt + v : hello.getData()라고 치고 누르면 Hello hello1 = hello.getData()로 바꿔줌
- ctrl + b : 해당 클래스로 이동함.

- 파일 경로 복사 단축키 : Shift + Ctrl + C
- 객체의 값을 뿌려주는 단축키 : soutv + 자동완성
- 서버 돌리던거 종료시키는 단축키 : Ctrl + f2
- 서버 구동시키는 단축키 : Ctrl + f5
- 띄어쓰기 전까지 지워주는 단축키 : Ctrl + backspace
- 스프링 부트 thymeleaf viewName 매핑 방법
  - `resources:templates/ +{ViewName}+ .html`
- HelloController를 만들어준다.

```java
@Controller
public class HelloController {
    // /hello 라는 url에 매핑이 된다.
    @GetMapping("hello")
    public String hello(Model model){
        // 아무거나 값을 집어넣어 보자.
        model.addAttribute("data","유동관!!!!");
        return "helloworld";     // templates/helloworld.html 뷰파일로 이동한다.
    }
}
```

- /templates/helloworld.html

```html
<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Hello</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<p th:text="'안녕하세요. ' + ${data}" >안녕하세요. 손님</p>
</body>
</html>
```

- 타임리프가 적용되어 서버사이드에서 실행 시 데이터값이 반영되어 p 태그로 나온다.
- static 폴더에 index.html 정적 파일을 만들어 welcome page를 만들어보자.
- /static/index.html

```html
<!DOCTYPE HTML>
<html>
<head>
    <title>Hello</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>Hello
<a href="/helloworld">hello</a>
</body>
</html>
```

- **서버사이드를 거치지 않고 바로 나와도 되는 사이트들은 static에 들어가고 반영해야하는 것들은 templates에 넣으면 된다.**
- 질문) 정적페이지를 화면에 뿌릴 때 src/main/rescources/static에 index.html파일을 만들어 넣기만 하면 다른 설정 없이 화면에 출력이 되던데 왜 그런가요?! 다른 설정 없이 출력되는 이유가 스프링부트가 자동적으로 해줘서 그런가요?
  - 첫 페이지에 들어오면 스프링부트가 자동으로 static/index.html 부터 찾습니다^^! 파일명이 정확하게 index.html이어야 합니다.
- 다음은 폴더 구조이다.

[![image](https://user-images.githubusercontent.com/26649731/77048115-4601e280-6a09-11ea-95e3-c59979e30d88.png)](https://user-images.githubusercontent.com/26649731/77048115-4601e280-6a09-11ea-95e3-c59979e30d88.png)

- 뷰 파일 수정 시 반영이 잘 안될 때가 있다. 그때는 build.gradle에 다음을 추가한다.

  ```java
  implementation("org.springframework.boot:spring-boot-devtools")
  ```

  - 서버 시동 시 restartedMain 나오면 잘 깔린거다.
  - 뷰 파일 변동사항 있을 때 스프링 서버사이드 반영 시키는 단축키 : Shift + Ctrl + f9 하면 된다.

### 4. H2 데이터베이스 설치

- 개발이나 테스트 용도로 가볍고 편리한 DB, 웹 화면 제공

> 주의! Version 1.4.199를 사용해주세요. 1.4.199 버전 다운로드 링크 윈도우 설치 버전: https://h2database.com/h2-setup-2019-03-13.exe 윈도우, 맥, 리눅스 실행 버전: https://h2database.com/h2-2019-03-13.zip

- [https://www.h2database.com](https://www.h2database.com/)
- 다운로드 및 설치
- 데이터베이스 파일 생성 방법
  - .199 버전으로 설치하자.
  - 처음에는 파일모드 : `jdbc:h2:~/jpashop3` 처럼 생성해서 `C:\Users\<userName>` 내부에 .mv.db 파일을 생성해야 한다.
    - 그 다음부터는 네트웍 모드 :  `jdbc:h2:tcp://localhost/~/jpashop3` 으로 접속하자.

> 참고: H2 데이터베이스의 MVCC 옵션은 H2 1.4.198 버전부터 제거되었습니다. 사용 버전이 1.4.199이므로 옵션 없이 사용하면 됩니다.
>
> 추가로 1.4.200 버전에서는 MVCC 옵션을 사용하면 오류가 발생합니다.

### 5. JPA와 DB 설정, 동작확인

- application.yml

```yml
spring:
  datasource:
    url: jdbc:h2:tcp://localhost/~/jpashop3;MVCC=TRUE
    username: sa
    password:
    driver-class-name: org.h2.Driver

  jpa:
    hibernate:
      ddl-auto: create  # 이 옵션은 애플리케이션 실행 시점에 테이블을 drop 하고, 다시 생성한다
    properties:
      hibernate:
        # show_sql: true
        format_sql: true
logging.level:
  org.hibernate.SQL: debug
# org.hibernate.type: trace
```

- Member.java

```java
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Member {

    @Id @GeneratedValue
    private Long id;
    private String username;
}
```

- MemberRepository.java

```java
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;

    public Long save(Member member){
        em.persist(member);
        return member.getId();
    }

    public Member find(Long id){
        return em.find(Member.class,id);
    }
}

```

- test 폴더 자동생성 꿀팁 단축키 : ctrl + shift + t

- 자동으로 탬플릿을 만들어주느 핵 꿀팁
  - [live template intellij java](https://baejangho.com/entry/IntelliJ-Live-Templates)

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class MemberRepositoryTest {

    @Autowired 
    MemberRepository memberRepository;

    @Test
    @Transactional
    @Rollback
    // 맴버에 저장된 값은 한 트랜잭션 내부에서 아이디값, 유저 이름값이 같다.
    public void testMember(){
        Member member = new Member();
        member.setUsername("memeberA");
        // 객체 저장 후 저장된 아이디 반환!
        Long savedId = memberRepository.save(member);

        // 다시 찾아와!
        Member findMember = memberRepository.find(savedId);

        // 저장된거 아이디가 디비 거쳐서 나온 아이디와 같을 것인가?
        Assertions.assertThat(findMember.getId()).isEqualTo(member.getId());
        Assertions.assertThat(findMember.getUsername()).isEqualTo(member.getUsername());
        // 객체도 같을건인가? 한 트랜잭션 내부에서 이루어지므로 같은 객체, 같은 해시값 가진다!
        Assertions.assertThat(findMember).isEqualTo(member);
    }
}
```



## 2. 도메인 분석 설계

1. 요구사항 분석 도메인 모델과 테이블 설계 엔티티 클래스 개발 엔티티 설계시 주의점 애플리케이션 구현 준비 구현 요구사항 애플리케이션 아키텍처 회원 도메인 개발 회원 리포지토리 개발 회원 서비스 개발 회원 기능 테스트 상품 도메인 개발 상품 엔티티 개발(비즈니스 로직 추가) 상품 리포지토리 개발 상품 서비스 개발 주문 도메인 개발 주문, 주문상품 엔티티 개발 주문 리포지토리 개발 주문 서비스 개발 주문 기능 테스트 주문 검색 기능 개발 웹 계층 개발 홈 화면과 레이아웃 회원 등록 회원 목록 조회 상품 등록 상품 목록 상품 수정변경 감지와 병합(merge) 상품 주문 주문 목록 검색, 취소