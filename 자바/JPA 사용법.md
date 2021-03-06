[toc]

# JPA 사용법

- 객체와 테이블을 제대로 설계하고 매핑하는 방법
- 기본키와 왜래 키 매핑
- 1:N, N:1,1:1,N:M 매핑
- 실무 노하우 + 성능
- 어떤 복잡한 시스템도 JPA로 설계 가능

## 0. 목표

### JPA 내부 동작 방식 이해

- JPA가 어떤 SQL을 만들어내는지 이해
- JPA가 언제 SQL을 실행하는지 이해

### 학습 방법

- 1단계 ~ 6단계 리팩토링

- 강의를 메인으로 하고, 책은 참고서로 추천
- 총 16시간으로 하루 한시간 반, 2주 완성으로 가자.

 ### JPA 검증 사례

- 우형, 쿠팡, 카카오, 네이버
- 조 단위의 거래금액이 발생하는 다양한 서비스에서 사용, 검증됨

### JPA 실무 경험담

- 경험한 이전과 후로 나뉜다.
- SQL 작성으로 시간 낭비 ㄴㄴ
- 설계 고민, 테스트코드 고민하기

## 1. JPA 시작하기

### 1. SQL 중심적인 개발의 문제점

- 지금 시대는 객체를 관계형 DB에 넣어 관리하고 있다.	
  - DB는 SQL을 인식하므로 SQL에 의존한다.
- 무한 반복, 지루한 코드에 지침
- 패러다임의 불일치
  - 객체 vs 관계형 데이터베이스
- 자바컬렉션에서 객체로 놀면 되는데 디비로 하기가 너무 껄끄럽다.
- **자바 컬렉션**이라는 용어가 계속 나온다.

- 눈으로 쿼리를 확인하기 전까지는 엔티티를 신뢰할 수 없다!
  - 재대로된 JPA를 배우자.
- 계층분할이 쉽지가 않다.
- 객체답게 모델링 할수록 매핑작업만 늘어난다.
  - 객체지향적으로 작업할수록 피곤해진다.
  - SQL에 맞추기 때문에
- 객체를 자바 컬렉션에 저장 하듯 DB에 저장할 수는 없을까???
  - JPA

### 2. JPA 소개

- Java Persistence API
- ORM 기술 적용
- Object-Relational mapping(객체 관계 매핑)

![image](https://user-images.githubusercontent.com/26649731/76941486-7b41fe00-693f-11ea-9867-b2d57bae45e1.png)

![image](https://user-images.githubusercontent.com/26649731/76941542-94e34580-693f-11ea-88fd-782bd3bdc166.png)

- 패러다임의 불일치를 해결해준다.

- 하이버네이트 만든사람 데려와서 자바 표준 구현해낸게 JPA이다.
- 저장, 조회, 수정, 삭제 코드가 만들어져있다.
  - 그 중에서도 수정기능은 너무좋다.
- 유지보수는 더좋다.
- JPA와 패러다임의 불일치 해결
- 상속관계면 두번 쿼리 날려준다. 

![image](https://user-images.githubusercontent.com/26649731/76942483-299a7300-6941-11ea-9071-a72486d42542.png)

![image](https://user-images.githubusercontent.com/26649731/76942543-40d96080-6941-11ea-92a1-7f6ac4964cef.png)

- JPA의 성능 최적화 기능

  - ![image](https://user-images.githubusercontent.com/26649731/76943290-729ef700-6942-11ea-9397-68f8700e9607.png)

  - ![image](https://user-images.githubusercontent.com/26649731/76943449-b98cec80-6942-11ea-8182-37ec3450be83.png)
  - ![image](https://user-images.githubusercontent.com/26649731/76943574-f22cc600-6942-11ea-93c8-80c2480b29c3.png)
  - 쿼리 수를 줄일 수 있다. 옵션을 적용한다.
  - 상황에 따라 로딩 전략을 짤 수 있음.

- ORM은 객체와 RDB 두 기둥 위에 있는 기술이다. 둘 사이에 벨런스를 맞춰야한다.

## 2. JPA 시작하기

### 1. 프로젝트 생성

- 디비는 H2 DB를 사용한다.
- http://h2database.com/html/main.html

- 메이븐 사용한다.
- 자바 8 이상 권장
- ArtifactId : 빌드되면 나오는 파일 이름이다.

#### 1. pom.xml 작성

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

#### 2. persistence.xml 만들기

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

### 2. 애플리케이션 개발

#### 1. 기본 틀 만들기

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

#### 2. H2 DB 만들기

- 간단한 맴버를 만들 것이다.

```sql
create table Member ( 
 id bigint not null, 
 name varchar(255), 
 primary key (id) 
);
```

#### 3. 이제 코드를 짜보자.

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

#### 4. JPQL 이란?

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

## 3. 영속성 관리 - 내부 동작 방식

### 1. 영속성 컨택스트 1

- JPA에서 가장 중요한 2가지
  - 객체와 관계형 데이터베이스 매핑하기(Object Relational Mapping) 
  - 영속성 컨텍스트

- 엔티티 매니저 팩토리와 엔티티 매니저

- 영속성 컨텍스트는 뭘까?

  - **JPA를 이해하는데 가장 중요한 용어** 
  - **엔티티를 영구 저장하는 환경**이라는 뜻
  - EntityManager.persist(entity) : 실제로는 더 깊은 내용이 있음.
    - 영속성 컨택스트를 통해 영속화 한다는 것.
    - 영속성 컨택스트라는 공간에 저장한다???

- 엔티티 매니저? 영속성 컨텍스트?

  - 하지만 영속성 컨텍스트는 논리적인 개념이며 눈에 보이지 않는다. 
  - 엔티티 매니저를 통해서 영속성 컨텍스트에 접근한다.

- 엔티티의 생명주기

  - 비영속 (new/transient) : 영속성 컨텍스트와 전혀 관계가 없는 새로운 상태 

    ```java
    // 객체를 생성만한 상태, JPA 와 전혀 관계가 없는 상태
    Member member = new Member();
    member.setId(1L);
    member.setName("유동관");
    ```

  - 영속 (managed) : 영속성 컨텍스트에 **관리**되는 상태 

    ```java
    entityManager.persist(member);	// entityManager에서 관리시작하는 상태
    ```

  - 준영속 (detached) : 영속성 컨텍스트에 저장되었다가 분리된 상태 --- detach

  - 삭제 (removed) : 삭제된 상태 --- remove

### 2. 영속성 컨택스트 2

- 영속성 컨텍스트의 이점

  - 내부에 1차 캐시를 가지고 있다.

    - 조회할 때 1차적으로 캐시에서 조회하므로 속도가 빠르다.

      ![image-20200319134831391](C:\Users\KTNET\AppData\Roaming\Typora\typora-user-images\image-20200319134831391.png)

  - 영속 엔티티의 동일성(identity) 보장 

    - 1차 캐시로 반복 가능한 읽기(REPEATABLE READ) 등급의 트랜잭션 격리 수준을 데이터베이스가 아닌 **애플리케이션 차원에서 제공**

  - 트랜잭션을 지원하는 쓰기 지연 (transactional write-behind)

    - tx.commit() 전까지 쿼리를 **쓰기지연 SQL 저장소에** 다 쌓아놓고 있는다.

      ![image](https://user-images.githubusercontent.com/26649731/77033321-38893000-69ea-11ea-819c-230376d79557.png)

    - 커밋을 때리는 순간(플러시) 가 되면서 날라간다.

    - 왜쓰지?

      - 버퍼링 기능. 최적화 용이

  - **변경 감지(Dirty Checking) : 업데이트 시**

    - 신기한놈이다.. setName 하면 지가 알아서 update 쿼리를 날려준다. 따로 update 메서드를 쓰지 않아도 된다.
    - 왜그러냐면 1차 캐시에서 스냅샷도 저장해 놓기 때문이다. 커밋하는 순간 스냅샷을 비교해서 바뀐게 존재한다? 그럼 Update 쿼리를 쓰기지연 SQL 저장소에 반영한다.
    - 그러니까 **따로 업데이트구문을 생각 안해줘도 된다는 것에 주의하자**

  - 지연로딩 : 나중에 할꺼임.

### 3. 플러시

- 플러시란?
  - 영속성 컨텍스트의 변경내용을 데이터베이스에 반영하는 것을 말한다.
- 플러시 발생
  - 변경 감지 
  - 수정된 엔티티 쓰기 지연 SQL 저장소에 등록 
  - 쓰기 지연 SQL 저장소의 쿼리를 데이터베이스에 전송 (등록, 수정, 삭제 쿼리)
- 영속성 컨텍스트를 플러시하는 방법
  - em.flush() - 직접 호출
    - 강제로 먼저 호출해서 반영해보고자 할 때. 테스트해보고자 할 때.
  - **트랜잭션 커밋 - 플러시 자동 호출**
  - JPQL 쿼리 실행 - 플러시 자동 호출
- 플러시 모드 옵션
  - FlushModeType.AUTO : 커밋이나 쿼리를 실행할 때 플러시 (기본값) 
  - ~~FlushModeType.COMMIT : 커밋할 때만 플러시~~
- 플러시 정리
  - 영속성 컨텍스트를 비우지 않음 
  - 영속성 컨텍스트의 변경내용을 데이터베이스에 동기화 
  - **트랜잭션이라는 작업 단위가 중요 ---> 커밋 직전에만 동기화 하면 됨**

### 4. 준영속 상태

- 준영속 상태란?
  - 영속 -> 준영속 
  - 영속 상태의 엔티티가 영속성 컨텍스트에서 분리(detached) 
  - 영속성 컨텍스트가 제공하는 기능을 사용 못함
- 준영속 상태로 만드는 법
  - em.detach(entity) : 특정 엔티티만 준영속 상태로 전환 
  - em.clear() : 영속성 컨텍스트를 완전히 초기화 - 1차 캐시를 지워버림.
  - em.close() : 영속성 컨텍스트를 종료 - 영속성 컨택스트를 아예 끝내버림.

### 5. 정리

- JPA 가장 중요한 2가지
  - 정적 매핑
  - 실제 돌아가는 매커니즘 공부
- 영속성 컨택스트
  - 비영속, 영속, 준영속, 삭제

