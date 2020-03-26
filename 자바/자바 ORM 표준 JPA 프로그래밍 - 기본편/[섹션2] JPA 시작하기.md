[toc]

# 2. JPA 시작하기

## 1. 프로젝트 생성

- 디비는 H2 DB를 사용한다.
- http://h2database.com/html/main.html

- 메이븐 사용한다.
- 자바 8 이상 권장
- ArtifactId : 빌드되면 나오는 파일 이름이다.

### 1.1 pom.xml 작성

![image](https://user-images.githubusercontent.com/26649731/77019507-154b8a00-69c4-11ea-86e9-c4fc5bc13010.png)

- 처음 입력했더니 빨강색으로 나왔다.
- 새로고침 누르니까 자동으로 플러그인이 작성되었다. 그리고 흰색이 되었다.
- 나같은 경우 H2 데이터베이스가 1.4.200이어서 버전을 다시 고치고 새로고침하였다.
- 최종

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
        <version>1.4.200</version>
    </dependency>
</dependencies>
```

### 1.2 persistence.xml 만들기

- META-INF/persistence.xml 로 경로가 무조건 있어야한다.

  ![image](https://user-images.githubusercontent.com/26649731/77019779-f8fc1d00-69c4-11ea-8c57-85108e018206.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.2"
             xmlns="http://xmlns.jcp.org/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd">
    <persistence-unit name="hello">
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
            <!--<property name="hibernate.hbm2ddl.auto" value="create" />-->
        </properties>
    </persistence-unit>
</persistence>
```

## 2. 애플리케이션 개발

### 1. 기본 틀 만들기

![image](https://user-images.githubusercontent.com/26649731/77020691-f4853380-69c7-11ea-86ed-c3734234830e.png)

- 일단 디렉토리를 저렇게 만들고 나서 틀을 만든다.
- JPA 구동 방식
  - Persistence 에서 설정정보를 persistence.xml 에서 가져온다.
  - 그리고 EntityManagerFactory 를 생성한다.
  - 이 공장에서 entityManager를 계속 생산해내는 개념이라고 보면 된다. 

```java
package hellojpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Mainjpa {
    public static void main(String[] args) {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("hello");

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        // code start
		// ...
        // code end
        entityManager.close();

        entityManagerFactory.close();
    }
}

```

### 2. H2 DB 만들기

- 간단한 맴버를 만들 것이다.

```sql
create table Member ( 
 id bigint not null, 
 name varchar(255), 
 primary key (id) 
);
```

### 3. 이제 코드를 짜보자.

- 같은 패키지에 Member 클래스를 생성한다. 
  - @Entity는 테이블 생성
  - @Id는 Pk

```java
package hellojpa;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
// DB의 테이블 명이 다를경우
// @Table(name = "USER")
public class Member {

    @Id
    private Long id;
    // DB의 컬럼 명이 다를 경우
    // @Column(name = "USERNAME")
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

- JPA 는 트랜잭션 내부에서 실행되어야 한다고 한다. 

##### 가. 간단한 삽입 코드를 작성해보자

```java
// code start
    EntityTransaction tx = entityManager.getTransaction();  
    // 트랜잭션 내부에서 쿼리를 실행해야 한다.
    tx.begin();         // 트랜잭션 시작

    Member member = new Member();
    member.setId(1L);
    member.setName("유동관");

    entityManager.persist(member);

    tx.commit();        // 트랜잭션 실행
// code end
```

- 이 코드는 문제가 많다. commit() 이 실행이 안되면 entityManager도 close가 안되고 문제가 생길 수 있다. 따라서 try 로 만들어주는 것이 올바르다.

- 리팩토링 코드

```java
// code start
    EntityTransaction tx = entityManager.getTransaction();  
    // 트랜잭션 내부에서 쿼리를 실행해야 한다.
    tx.begin();         // 트랜잭션 시작
    try{
        Member member = new Member();
        member.setId(1L);
        member.setName("유동관");

        entityManager.persist(member);

        tx.commit();        // 트랜잭션 실행
    }catch (Exception e){
        // 에러가 발생하면 롤백하기.
        tx.rollback();
    }finally {
        // 어찌되었던 자원 다 쓰면 매니저를 닫아주어야 한다.
        entityManager.close();
    }
    entityManagerFactory.close();
// code end
```

##### 나. CRUD 를 작성해보자.

```java
// code start
    EntityTransaction tx = entityManager.getTransaction();  
	// 트랜잭션 내부에서 쿼리를 실행해야 한다.
    tx.begin();         // 트랜잭션 시작
    try{
        // 삽입
        // Member member = new Member();
        // member.setId(1L);
        // member.setName("유동관");

        // entityManager.persist(member);
        
        // 조회
        // Member findMember = entityManager.find(Member.class,1L);
        // System.out.println("findMember = " + findMember.getId());
        // System.out.println("findMember.id = " + findMember.getName());

        // 수정
        // Member findMember = entityManager.find(Member.class,1L);
        // findMember.setName("helloJPA");

        // 삭제
        // Member findMember = entityManager.find(Member.class,1L);
        // entityManager.remove(findMember);
        tx.commit();        // 트랜잭션 실행
    }catch (Exception e){
        // 에러가 발생하면 롤백하기.
        tx.rollback();
    }finally {
        // 어찌되었던 매니저를 닫아주어야 한다.
        entityManager.close();
    }
    entityManagerFactory.close();
// code end
```

##### 다. 주의점

- **엔티티 매니저 팩토리**는 하나만 생성해서 애플리케이션 전체에서 공유하는 것이 원칙이다.
- **엔티티 매니저**는 쓰레드간에 공유X (사용하고 버려야 한다). 
- **JPA의 모든 데이터 변경은 트랜잭션 안에서 실행해야 한다.**

### 4. JPQL 이란?

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