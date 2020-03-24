[toc]



### 5) 실전 예제 - 1. 요구사항 분석과 기본 매핑	

#### 1. 요구사항 분석	

- 회원은 상품을 주문할 수 있다.	
- 주문 시 여러 종류의 상품을 선택할 수 있다.	

#### 2. 기능 목록	

- 회원 기능	
  - 회원등록	
  - 회원조회	
- 상품 기능	
  - 상품등록	
  - 상품수정	
  - 상품조회	
- 주문 기능	
  - 상품주문	
  - 주문내역조회	
  - 주문취소	

#### 3. 도메인 모델 분석	

- 회원과 주문의 관계: 회원은 여러 번 주문할 수 있다. (일대다) 	
- 주문과 상품의 관계: 주문할 때 여러 상품을 선택할 수 있다. 	
  반대로 같은 상품도 여러 번 주문될 수 있다. 	
  주문상품 이라는 모델을 만들어서 다대다 관계를 일다대, 다대일 관계로 풀어냄	

![image](https://user-images.githubusercontent.com/26649731/77269250-a3d54980-6ceb-11ea-92d6-ff65095ceb15.png)	

#### 4. 테이블 설계	

![image](https://user-images.githubusercontent.com/26649731/77269275-b8194680-6ceb-11ea-9f3d-916762e9098e.png)	

#### 5. 엔티티 설계와 매핑	

![image](https://user-images.githubusercontent.com/26649731/77269295-c5363580-6ceb-11ea-860b-163230a81280.png)	

#### 6. 코딩	

- Project 생성	
- pom.xml 설정	

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

- META-INF > persistence.xml 설정	

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
            <property name="hibernate.hbm2ddl.auto" value="create" />	
        </properties>	
    </persistence-unit>	
</persistence>	
```

- entity 설계한 것에 따라 틀 짜기 (전체 디렉토리)	

![image](https://user-images.githubusercontent.com/26649731/77284716-aac38280-6d12-11ea-94b9-198e46b27b67.png)	

- Member.java	

```java	
@Entity	
@Getter	
public class Member {	
    @Id @GeneratedValue(strategy = GenerationType.AUTO)	
    @Column(name = "MEMBER_ID")	
    private Long id;	
    private String name;	
    private String city;	
    private String street;	
    private String zipcode;	
}	
```

- Item.java	

```java	
@Entity	
@Getter	
public class Item {	
    @Id @GeneratedValue	
    @Column(name = "ITEM_ID")	
    private Long id;	
    private String name;	
    private int price;	
    private int stockQuantity;	
}	
```

- Order.java	

```java	
@Entity	
@Getter	
@Table(name = "ORDERS")     // 예약어에 걸릴 수 있으므로 이름 변경	
public class Order {	
    @Id @GeneratedValue // 기본은 AUTO다.	
    @Column(name = "ORDER_ID")	
    private Long id;	
    @Column(name = "MEMBER_ID")	
    private Long memberId;	
    private LocalDateTime orderDate;	
    @Enumerated(EnumType.STRING)    // 필수로 STRING 해주자.	
    private OrderStatus status;	
}	
```

- OrderItem.java	

```java	
@Entity	
@Getter	
public class OrderItem {	
    @Id @GeneratedValue	
    @Column(name = "ORDER_ITEM_ID")	
    private Long id;	
    @Column(name = "ORDER_ID")	
    private Long orderId;	
    @Column(name = "ITEM_ID")	
    private Long itemId;	
    private int orderPrice;	
    private int count;	
}	
```

- OrderStatus	

```java	
public enum OrderStatus {	
    ORDER,CANCEL	
}	
```

- JpaMain	

```java	
 public static void main(String[] args) {	
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("hello");	
        EntityManager entityManager = entityManagerFactory.createEntityManager();	
        // code start	
        EntityTransaction tx = entityManager.getTransaction();	
        // 트랜잭션 내부에서 쿼리를 실행해야 한다.	
        tx.begin();         // 트랜잭션 시작	
        try{	
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
    }	
```

- 이렇게 하니까 테이블이 4개 생성되었다.	

- 어노테이션을 적극 활용하는 것이 좋다. 주석같은 역활을 하기 때문에	
- createDate => create_date 로 바꿔준다. 	

#### 7. 데이터 중심 설계의 문제점	

- 현재 방식은 객체 설계를 테이블 설계에 맞춘 방식	
- 테이블의 외래키를 객체에 그대로 가져옴	
- 객체 그래프 탐색이 불가능	
- 참조가 없으므로 UML도 잘못됨

## 1. 연관관계 매핑 기초

### 1. 목표

- 객체와 테이블 연관관계의 차이를 이해
- 객체의 참조와 테이블의 외래 키를 매핑
- 용어 이해
  - 방향(Direction): 단방향, 양방향
  - 다중성(Multiplicity): 다대일(N:1), 일대다(1:N), 일대일(1:1), 다대다(N:M) 이해
  - 연관관계의 주인(Owner): 객체 양방향 연관관계는 관리 주인이 필요

### 2. 목차

- 연관관계가 필요한 이유
- 단방향 연관관계
- 양방향 연관관계와 연관관계의 주인
- 실전 예제 - 2. 연관관계 매핑 시작

### 3. 연관관계가 필요한 이유

- 예제 시나리오
  - 회원과 팀이 있다.
  - 회원은 하나의 팀에만 소속될 수 있다.
  - 회원과 팀은 다대일 관계다.

#### 객체를 테이블에 맞추어 모델링

- (연관관계가 없는 객체)

![image](https://user-images.githubusercontent.com/26649731/77379331-cd5da600-6dbb-11ea-8244-d6c85f513e7d.png)

- 참조 대신에 외래 키를 그대로 사용해보자

```java
@Entity
public class Member { 
    @Id @GeneratedValue
    private Long id;
    @Column(name = "USERNAME")
    private String name;
    @Column(name = "TEAM_ID")
    private Long teamId; 
    … 
} 
@Entity
public class Team {
    @Id @GeneratedValue
    private Long id;
    private String name; 
    … 
}
```

- 외래 키 식별자를 직접 다루어 저장하기

```java
//팀 저장
Team team = new Team();
team.setName("TeamA");
em.persist(team);
//회원 저장
Member member = new Member();
member.setName("member1");
// 팀 아이디를 불러와서 저장하는 방식
member.setTeamId(team.getId());
em.persist(member);
```

- 식별자로 다시 조회하여 저장하기
  - 객체지향적인 방법은 아니다.

```java
//조회
Member findMember = em.find(Member.class, member.getId()); 
//연관관계가 없음
Team findTeam = em.find(Team.class, team.getId());
```

- **객체를 테이블에 맞추어 데이터 중심으로 모델링하면, 
  협력 관계를 만들 수 없다**
  - 테이블은 외래 키로 조인을 사용해서 연관된 테이블을 찾는다. 
  - 객체는 참조를 사용해서 연관된 객체를 찾는다. 
  - 테이블과 객체 사이에는 이런 큰 간격이 있다

### 4. 단방향 연관관계

#### 객체지향 모델링

(객체 연관관계 사용)

![image](https://user-images.githubusercontent.com/26649731/77379844-0f3b1c00-6dbd-11ea-9ce4-067815374158.png)

- 객체의 참조와 테이블의 외래키를 매핑

```java

```

- 객체의 참조와 테이블의 외래 키를 매핑

```java
@Entity
public class Member { 
    @Id @GeneratedValue
    private Long id;
    @Column(name = "USERNAME")
    private String name;
    private int age;
    // @Column(name = "TEAM_ID")
    // private Long teamId;
    @ManyToOne
    @JoinColumn(name = "TEAM_ID")
    private Team team;
    ...
}
```

- ORM 매핑

![image](https://user-images.githubusercontent.com/26649731/77379964-5d501f80-6dbd-11ea-97bf-b6a31560604e.png)

- 연관관계 저장

```java
//팀 저장
Team team = new Team();
team.setName("TeamA");
em.persist(team);
//회원 저장
Member member = new Member();
member.setName("member1");
member.setTeam(team); //단방향 연관관계 설정, 참조 저장
em.persist(member);
```

- 참조로 연관관계 조회 - 객체 그래프 탐색

```java
//조회
Member findMember = em.find(Member.class, member.getId()); 
//참조를 사용해서 연관관계 조회
Team findTeam = findMember.getTeam();
```

- 연관관계 수정

```java
// 새로운 팀B
Team teamB = new Team();
teamB.setName("TeamB");
em.persist(teamB);
// 회원1에 새로운 팀B 설정
member.setTeam(teamB);
```

### 5. 양방향 연관관계와 연관관계의 주인

- 양방향 매핑

![image](https://user-images.githubusercontent.com/26649731/77380284-13b40480-6dbe-11ea-8372-048b0d6b09ff.png)

- Member 엔티티는 단방향과 동일

```java
@Entity
public class Member { 
    @Id @GeneratedValue
    private Long id;
    @Column(name = "USERNAME")
    private String name;
    private int age;
    @ManyToOne
    @JoinColumn(name = "TEAM_ID")
    private Team team;
    ...
}
```

- Team 엔티티는 컬렉션 추가

```java
@Entity
public class Team {
    @Id @GeneratedValue
    private Long id;
    private String name;
    @OneToMany(mappedBy = "team")
    List<Member> members = new ArrayList<Member>();
    … 
}
```

- 반대 방향으로 객체 그래프 탐색

```java
//조회
Team findTeam = em.find(Team.class, team.getId()); 
int memberSize = findTeam.getMembers().size(); 
//역방향 조회
```

- 연관관계의 주인과 mappedBy

  - mappedBy = JPA의 멘탈붕괴 난이도
  - mappedBy는 처음에는 이해하기 어렵다. 
  - 객체와 테이블간에 연관관계를 맺는 차이를 이해해야 한다.

- 객체와 테이블이 관계를 맺는 차이

  - 객체 연관관계 = 2개
    - 회원 -> 팀 연관관계 1개(단방향) 
    - 팀 -> 회원 연관관계 1개(단방향) 
  - 테이블 연관관계 = 1개
    - 회원 <-> 팀의 연관관계 1개(양방향)

  ![image](https://user-images.githubusercontent.com/26649731/77380654-ff243c00-6dbe-11ea-89a2-247e0ed4580a.png)

- 객체의 양방향 관계

  - 객체의 양방향 관계는 사실 양방향 관계가 아니라 서로 다른 단뱡향 관계 2개다.
  - 객체를 양방향으로 참조하려면 단방향 연관관계를 2개 만들어야 한다. 
    - A -> B (a.getB()) 
    - B -> A (b.getA())

- 테이블의 양방향 연관관계

  - 테이블은 외래 키 하나로 두 테이블의 연관관계를 관리

  - MEMBER.TEAM_ID 외래 키 하나로 양방향 연관관계 가짐
    (양쪽으로 조인할 수 있다.)

    ```sql
    SELECT * 
    FROM MEMBER M
    JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID 
    
    SELECT * 
    FROM TEAM T
    JOIN MEMBER M ON T.TEAM_ID = M.TEAM_ID
    ```

- 둘 중 하나로 외래 키를 관리해야 한다.

![image](https://user-images.githubusercontent.com/26649731/77380810-6fcb5880-6dbf-11ea-84af-5ad6e9b1ea56.png)

- 연관관계의 주인(Owner)

  - 양방향 매핑 규칙
    - 객체의 두 관계중 하나를 연관관계의 주인으로 지정
    - 연관관계의 주인만이 외래 키를 관리(등록, 수정) 
    - 주인이 아닌쪽은 읽기만 가능
    - 주인은 mappedBy 속성 사용X 
    - 주인이 아니면 mappedBy 속성으로 주인 지정

- 누구를 주인으로?

  - 외래 키가 있는 곳을 주인으로 정해라
  - 여기서는 Member.team이 연관관계의 주인

  ![image](https://user-images.githubusercontent.com/26649731/77380870-aef9a980-6dbf-11ea-815e-8a6bb682b334.png)

- 양방향 매핑 시 가장 많이 하는 실수

  - 연관관계의 주인에 값을 입력하지 않음

```java
Team team = new Team();
 team.setName("TeamA");
 em.persist(team);

 Member member = new Member();
 member.setName("member1");

 //역방향(주인이 아닌 방향)만 연관관계 설정
 team.getMembers().add(member);

 em.persist(member);
```

![image](https://user-images.githubusercontent.com/26649731/77380912-d3558600-6dbf-11ea-981b-c6ab55c79dbe.png)

- 양방향 매핑 시 연관관계의 주인에 값을 입력해야 한다.
  - 순수한 객체 관계를 고려하면 항상 양쪽 다 값을 입력해야 한다.

```java
Team team = new Team();
team.setName("TeamA");
em.persist(team);

Member member = new Member();
member.setName("member1");

team.getMembers().add(member); 
//연관관계의 주인에 값 설정
member.setTeam(team); //**

em.persist(member);
```

![image](https://user-images.githubusercontent.com/26649731/77380977-00099d80-6dc0-11ea-80c3-57b8eee9777d.png)

- 양방향 연관관계 주의 - 실습
  - 순수 객체 상태를 고려해서 항상 양쪽에 값을 설정하자
  - 연관관계 편의 메소드를 생성하자
  - 양방향 매핑시에 무한 루프를 조심하자
    - 예: toString(), lombok, JSON 생성 라이브러리
- 양방향 매핑 정리
  - 단방향 매핑만으로도 이미 연관관계 매핑은 완료
  - 양방향 매핑은 반대 방향으로 조회(객체 그래프 탐색) 기능이 추가된 것 뿐
  - JPQL에서 역방향으로 탐색할 일이 많음
  - 단방향 매핑을 잘 하고 양방향은 필요할 때 추가해도 됨
    (테이블에 영향을 주지 않음)
- 연관관계의 주인을 정하는 기준
  - 비즈니스 로직을 기준으로 연관관계의 주인을 선택하면 안됨
  - 연관관계의 주인은 외래 키의 위치를 기준으로 정해야함

### 6. 실전 예제 - 2. 연관관계 매핑 시작

- 테이블 구조
  - 테이블 구조는 이전과 같다.

![image](https://user-images.githubusercontent.com/26649731/77381051-3cd59480-6dc0-11ea-8084-ea7371eb458f.png)

- 객체 구조
  - 참조를 사용하도록 변경

![image](https://user-images.githubusercontent.com/26649731/77381075-4b23b080-6dc0-11ea-9ab2-cbb5ffb32ae3.png)

