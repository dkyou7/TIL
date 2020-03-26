[toc]

# 2. JPA 시작하기

## 1. 환경 구성

- JPA 를 사용하여 간단하게 프로젝트를 만들어보고자 합니다..! 
  우선, 환경 구성부터 실시해보겠습니다.

-   DB는 H2 DB를 사용할 것입니다.
    -   [http://h2database.com/html/main.html](http://h2database.com/html/main.html.)
    -   현시점(20/03/26) 기준 [Version 1.4.199]가 가장 안정적인 버전이기 때문에 이것을 다운로드 받고 사용합니다.

-   윈도우 기준 H2 실행 방법
	-   `C:\Program Files (x86)\H2\bin` 경로로 가서 h2.bat 파일 더블클릭하면 실행 됩니다.

- 프로젝트는 메이븐을 사용하며, 자바 8 이상을 권장합니다.

- ArtifactId : 빌드되면 나오는 파일 이름입니다.

### 1.1 pom.xml 작성

- 먼저, JPA 하이버네이트 설정과 H2 데이터베이스, 롬복 설정을 해주겠습니다!
  - JPA 하이버네이트는 JPA를 사용할 수 있도록 돕는 장치입니다. 
  - H2는 경량화 데이터베이스이고, 간단한 쿼리문을 실행시키고, DB에 저장하고자 할 때 간편하게 쓰입니다.
  - 롬복은 Getter Setter 설정을 쉽게 할 수 있도록 돕는 장치입니다.
- 최종 pom.xml 코드입니다.

```xml
<dependencies>
    <!-- JPA 하이버네이트 -->
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-entitymanager</artifactId>
        <version>5.3.10.Final</version>
    </dependency>

    <!-- H2 데이터베이스 -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <version>1.4.199</version>
    </dependency>

    <!-- 롬복 -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.16.18</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

### 1.2 persistence.xml 만들기

- `resources/META-INF/persistence.xml` 로 경로를 설정하여줍니다..!

  ![image](https://user-images.githubusercontent.com/26649731/77618943-8833a280-6f7a-11ea-897b-e8afba37631c.png)

- 또한 persistence.xml 내부는 이걸 복붙해주시면 됩니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.2"
             xmlns="http://xmlns.jcp.org/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd">
    <persistence-unit name="helloJPA">
        <properties>
            <!-- 필수 DB 속성 -->
            <property name="javax.persistence.jdbc.driver" value="org.h2.Driver"/>
            <property name="javax.persistence.jdbc.user" value="sa"/>
            <property name="javax.persistence.jdbc.password" value=""/>
            <property name="javax.persistence.jdbc.url" value="jdbc:h2:tcp://localhost/~/test"/>
            <!-- 데이터베이스 방언을 지원해주는 hibernate-->
            <property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>

            <!-- 옵션 -->
            <!-- sql을 콘솔에 띄워준다.-->
            <property name="hibernate.show_sql" value="true"/>
            <!-- sql을 콘솔에 띄운걸 포멧팅해서 예쁘게 만들어준다.-->
            <property name="hibernate.format_sql" value="true"/>
            <!-- sql의 제목을 정해준다.-->
            <property name="hibernate.use_sql_comments" value="true"/>
            <!-- 요고 value 값에 따라 설정되는게 달라진다. 주로 TEST 돌릴 때 유용하다.-->
            <property name="hibernate.hbm2ddl.auto" value="create" />
        </properties>
    </persistence-unit>
</persistence>
```

- 여기서 주의해서 보셔야 할 부분은 `<persistence-unit name="helloJPA">` 부분입니다.
  - 이 DB 설정을 메인에서 실행할 때 hello 라는 별명으로 가져오겠다!! 라는 뜻이라고 합니다.
  - 세부 내용은 주석을 적어놓았으니 확인하면 될 것 같습니다.

## 2. 애플리케이션 개발

- 자, 이제 본격적으로 애플리케이션을 만들어 볼 차례입니다!!

### 2.1 기본 틀 만들기

- 자바 폴더 하위에 Main.java 를 생성해봅시다!

- JPA 구동 방식에 대해 잠깐 설명드리자면,
  1. Persistence 에서 설정정보를 persistence.xml 에서 가져온다.
  
  2. 그리고 EntityManagerFactory 를 생성한다.
  
  3. 이 공장에서 entityManager를 계속 생산해내는 개념이라고 보면 됩니다. 

```java
import javax.persistence.EntityManager;
        import javax.persistence.EntityManagerFactory;
        import javax.persistence.Persistence;

public class Main {
    public static void main(String[] args) {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("helloJPA");	// hello 라는 별명을 가져와서
        // 공장에서 찍어내는 entityManager!!!
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        // code start
        // ...
        // code end
        entityManager.close();

        entityManagerFactory.close();
    }
}

```

### 2.2 요구사항

- 간단한 사용자를 만들 것입니다.
- DB 설계는 이렇습니다.

```sql
create table User ( 
 id bigint not null, 
 name varchar(255), 
 primary key (id) 
);
```

- 원래는 이렇게 DB에 쿼리를 만들어주어야 하지만,,,! 
  JPA에서 자동으로 쿼리를 날려주기 때문에 우리는 우선 객체만 코딩해볼 것입니다.

### 2.3 이제 코드를 짜보자.

- domain 패키지를 만들고, 하위에 User 클래스를 생성해줍니다.
  - @Entity는 테이블 생성시켜주는 어노테이션입니다.
  - @Id는 Pk를 설정하는 어노테이션입니다.

![image](https://user-images.githubusercontent.com/26649731/77619569-d1382680-6f7b-11ea-98ad-d12a78babd66.png)

```java
package domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
// DB의 테이블 명이 다를경우
// @Table(name = "MEMBER")
@Getter @Setter    // 롬복
public class User {

    @Id
    private Long id;
    // DB의 컬럼 명이 다를 경우
    // @Column(name = "MEMBER_NAME")
    private String username;
}

```

- 객체도 구성해보았으니, 간단한 삽입 코드를 작성해봅니다.
  - JPA 는 트랜잭션 내부에서 실행되어야 한다고 합니다..! 아까 JPA 메인 틀을 만들었을 때 코드 시작부분과 끝 부분 사이를 비워놓았었는데요~ 이 부분을 채워보겠습니다!

```java
// code start

    EntityTransaction tx = em.getTransaction();
    // 트랜잭션 내부에서 쿼리를 실행해야 한다.
    tx.begin();         // 트랜잭션 시작

    User user = new User();
    user.setId(1L);
    user.setUsername("유저1");

    em.persist(user);

    tx.commit();        // 트랜잭션 실행

// code end
```

- 결과물을 볼까요? main에서 좌측 상단 녹색 화살표를 한번 눌러주면 실행됩니다!

![image](https://user-images.githubusercontent.com/26649731/77619794-502d5f00-6f7c-11ea-9336-ca432600d246.png)

- 그럼 놀랍게도 JPA가 쿼리를 알아서 짜줍니다...! 로그를 보겠습니다.

![image](https://user-images.githubusercontent.com/26649731/77622065-f54a3680-6f80-11ea-9a4c-fd4c9b56699e.png)

- Hibernate 에서 User 테이블이 있으면 지우고 다시 만들어주는데 이는 persistence.xml 설정에서 바꿀 수 있습니다. 지금은 `<property name="hibernate.hbm2ddl.auto" value="create" />`로 설정해놓았기 떄문에 실행시킬 때마다 DB를 삭제하고 다시 만들어주는 설정입니다. 개발단계에서 매우 편리하게 사용 가능합니다! 자세한건 뒤에서 다시 설명드리겠습니다.
- 중요 포인트는 JPA가 알아서 insert 문을 실행시켜 준다는 것인데요! 확인해보기 위해 H2 DB에 접속해보겠습니다.

![image](https://user-images.githubusercontent.com/26649731/77622260-4c500b80-6f81-11ea-815e-b933c56fbbe7.png)

- 잘 등록된 것을 볼 수 있습니다!

### 2.4 코드 리팩토링

- 완성 된 것 처럼 보이겠지만..! 물론 만족했을 것입니다. 첫 JPA 사용이고, SQL 쿼리를 하나도 사용하지 않았음에도 불구하고 DB에 정보가 저장된다는 놀라운 사실은 지금 봐도 정말 놀랍습니다!!!!(짞짞짞) 충분히 기뻐해줍시다.
- 하지만 안타깝게도 이 코드는 문제가 있습니다. 
  - commit() 이 실행되기 전에 천재지변이 일어나 갑자기 서버가 다운되었다면?
  - entityManager이 어떠한 상황에 의해 close가 안된다면? 
  - 분명 문제가 생길 수 있고 아직은 신뢰할 수 없는 코드입니다.. 
    따라서 try 로 리팩토링해야합니다!
  - 리팩토링을 위한 요구사항
    - 문제가 생겼을 경우 롤백할 수 있어야 합니다.
    - 잘 마무리 되었다면 EntityManager 자원을 닫아주어야 합니다.
- 이 두가지를 고려해서 코드를 개선해봅시다.
- 리팩토링 코드

```java
public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("helloJPA");	// hello 라는 별명을 가져와서
        // 공장에서 찍어내는 entityManager!!!
        EntityManager em = emf.createEntityManager();
        // code start
        EntityTransaction tx = em.getTransaction();
        // 트랜잭션 내부에서 쿼리를 실행해야 한다.
        tx.begin();         // 트랜잭션 시작
        try{

            User user = new User();
            user.setId(1L);
            user.setUsername("유저1");

            em.persist(user);

            tx.commit();        // 트랜잭션 실행
        }catch (Exception e){
            // 에러가 발생하면 롤백해줘야 합니다.
            tx.rollback();
        }finally {
            // 어찌되었던 자원 다 쓰면 매니저를 닫아주어야 합니다.
            em.close();
        }
        emf.close();
        // code end
    }
```

- **이제 신뢰성 있는 코드를 작성할 수 있게 되었습니다.**
- 이제 이 유저를 좀 가지고 놀아봅시다!
- 요구사항
  - CRUD 를 작성해보자.

- 리팩토링 코드

```java
public static void main(String[] args) {
    EntityManagerFactory emf = Persistence.createEntityManagerFactory("helloJPA");	// hello 라는 별명을 가져와서
    // 공장에서 찍어내는 entityManager!!!
    EntityManager em = emf.createEntityManager();
    // code start
    EntityTransaction tx = em.getTransaction();
    // 트랜잭션 내부에서 쿼리를 실행해야 한다.
    tx.begin();         // 트랜잭션 시작
    try{
        ////             삽입
        //             User user = new User();
        //             user.setId(1L);
        //             user.setUsername("유저1");
        //
        //             em.persist(user);
        //
        ////             조회
        //             User findUser = em.find(User.class,1L);
        //             System.out.println("id = " + findUser.getId()+" name : " + findUser.getUsername());
        //
        ////             수정
        ////             User findUser = em.find(User.class,1L);
        //            findUser.setUsername("수정된유저");
        //
        //            // 삭제
        ////            User findUser = em.find(User.class,1L);
        //            em.remove(findUser);


        tx.commit();        // 트랜잭션 실행
    }catch (Exception e){
        // 에러가 발생하면 롤백하기.
        tx.rollback();
    }finally {
        // 어찌되었던 매니저를 닫아주어야 한다.
        em.close();
    }
    emf.close();
    // code end
}
```

- 삽입쿼리

![image](https://user-images.githubusercontent.com/26649731/77623660-d00af780-6f83-11ea-99c3-d83be646a9fe.png)

- 조회쿼리

![image](https://user-images.githubusercontent.com/26649731/77623541-9f2ac280-6f83-11ea-9b45-9c340d9d068c.png)

- 수정쿼리

![image](https://user-images.githubusercontent.com/26649731/77624065-97b7e900-6f84-11ea-871c-407013dff582.png)

- 삭제쿼리

![image](https://user-images.githubusercontent.com/26649731/77624129-ae5e4000-6f84-11ea-9126-0d06fca5f263.png)

### 2.5 주의점

- **엔티티 매니저 팩토리**는 <u>하나</u>만 생성해서 애플리케이션 전체에서 공유하는 것이 원칙입니다.
- **엔티티 매니저**는 <u>쓰레드간에 공유X (사용하고 버려야 합니다).</u> 
- **JPA의 모든 데이터 변경은 트랜잭션 안에서 실행해야 합니다.**

## 2.1 결론

- 이 글을 정독한다면 기본 Hello JPA 는 마스터했다고 봐도 무방합니다!
- 우리는 SQL 문 하나 짜지 않고도 CRUD를 할 수 있게 되었습니다.

## 3. JPQL 이란?

- sql을 객체화시키는 것, 객체 지향 SQL 
- JPA를 사용하면 엔티티 객체를 중심으로 개발
  - 문제는 검색(조회) 쿼리
  - 검색을 할 때도 테이블이 아닌 엔티티 객체를 대상으로 검색
  - 모든 DB 데이터를 객체로 변환해서 검색하는 것은 불가능하므로, 애플리케이션이 필요한 데이터만 DB에서 불러오려면 결국 검색 조건이 포함된 SQL이 필요하다.
- JPA는 SQL을 추상화한 JPQL이라는 객체 지향 쿼리 언어를 제공한다.
  - SQL과 문법 유사하고, SELECT, FROM, WHERE, GROUP BY, HAVING, JOIN 을 지원한다.
  - JPQL은 엔티티 객체를 대상으로 쿼리를 만들어준다는 특징이 있다.
  - SQL은 데이터베이스 테이블을 대상으로 쿼리를 만든다.
  - SQL을 추상화해서 특정 데이터베이스 SQL에 의존X 

```java
List<Member> result = entityManager
    .createQuery("select m from Member as m",Member.class)
    .setFirstResult(1)  // 1번째부터 시작해서
    .setMaxResults(10)  // 10개 가져와라. 페이징 처리할 때 유용 (선택)
    .getResultList();

for(Member mem: result){
    System.out.println("mem.getName() = " + mem.getName());
}
```