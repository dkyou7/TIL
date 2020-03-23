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

#### 6. 데이터 중심 설계의 문제점

- 현재 방식은 객체 설계를 테이블 설계에 맞춘 방식
- 테이블의 외래키를 객체에 그대로 가져옴
- 객체 그래프 탐색이 불가능
- 참조가 없으므로 UML도 잘못됨

#### 7. 코딩

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

![image](https://user-images.githubusercontent.com/26649731/77272871-97ee8500-6cf5-11ea-8e0f-2c36169a126b.png)

- Member.java

- Item.java
- Order.java
- OrderItem.java

