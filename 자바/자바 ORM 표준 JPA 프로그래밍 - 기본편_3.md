[toc]
## 2. 다양한 연관관계 매핑

- 목차
  - 연관관계 매핑시 고려사항 3가지
  - 다대일 [N:1] 
  - 일대다 [1:N] 
  - 일대일 [1:1] 
  - 다대다 [N:M] 
  - 실전 예제 - 3. 다양한 연관관계 매핑
- 연관관계 매핑시 고려사항 3가지
  - **다중성**
    - 다대일: @ManyToOne 
    - 일대다: @OneToMany 
    - 일대일: @OneToOne 
    - 다대다: @ManyToMany 
      - 실무에서는 1:N + N:1로 나누어 사용한다.
  - **단방향, 양방향**
    - 테이블
      - 외래 키 하나로 양쪽 조인 가능
      - 사실 방향이라는 개념이 없음
    - 객체
      - 참조용 필드가 있는 쪽으로만 참조 가능
      - 한쪽만 참조하면 단방향
      - 양쪽이 서로 참조하면 양방향 - 단방향 두개
  - **연관관계의 주인**
    - 테이블은 외래 키 하나로 두 테이블이 연관관계를 맺음
    - 객체 양방향 관계는 A->B, B->A 처럼 참조가 2군데
    - 객체 양방향 관계는 참조가 2군데 있음. 
      둘중 테이블의 외래 키를 관리할 곳을 지정해야함
    - 연관관계의 주인: 외래 키를 관리하는 참조
    - 주인의 반대편: 외래 키에 영향을 주지 않음, <u>단순 조회</u>만 가능

### 2.1 다대일[N:1]

- 다대일 단방향

![image](https://user-images.githubusercontent.com/26649731/77494636-948c0280-6e89-11ea-8930-edbe3993d028.png)

- 다대일 단방향 정리
  - 가장 많이 사용하는 연관관계
  - 다대일의 반대는 일대다

```java
@Entity
@Getter
@Setter
public class Member {
    ...
        @ManyToOne      // 다대일 단방향
        @JoinColumn(name = "TEAM_ID")   // 팀이랑 조인을 한다.
        private Team team;
    ...
}
```

```java
@Entity
@Getter
@Setter
public class Team {
	...
    // 양방향 설정하고 싶을 때.
    // 팀의 멤버를 너무나 알고 싶을 때, 단순히 조회만 하고 싶을 때 쓴다.
    @OneToMany(mappedBy = "team")
    List<Member> members = new ArrayList<>();
}
```

- 다대일 양방향

![image](https://user-images.githubusercontent.com/26649731/77494715-c56c3780-6e89-11ea-9957-3dfc64ef4c15.png)

- 테이블에 영향을 주진 않는다. 객체만 영향을 받는다.
- 다대일 양방향 정리
  - 외래 키가 있는 쪽이 연관관계의 주인
  - 양쪽을 서로 참조하도록 개발

### 2.2 일대다[1:N] (권장하지 않음)

- 일대다 단방향

![image](https://user-images.githubusercontent.com/26649731/77494741-de74e880-6e89-11ea-94e1-8f73c37de145.png)

- 일대다 단방향 정리
  - 일대다 단방향은 일대다(1:N)에서 일(1)이 연관관계의 주인
  - 테이블 일대다 관계는 항상 다(N) 쪽에 외래 키가 있음
  - 객체와 테이블의 차이 때문에 반대편 테이블의 외래 키를 관리하는 특이한 구조
  - @JoinColumn을 꼭 사용해야 함. 그렇지 않으면 조인 테이블 방식을 사용함(중간에 테이블을 하나 추가함)
  - 일대다 단방향 매핑의 단점
    - 엔티티가 관리하는 외래 키가 다른 테이블에 있음
    - 연관관계 관리를 위해 추가로 UPDATE SQL 실행
  - 일대다 단방향 매핑보다는 다대일 양방향 매핑을 사용하자
- 일대다 양방향

![image](https://user-images.githubusercontent.com/26649731/77494790-0e23f080-6e8a-11ea-8684-6216bb503a37.png)

- 일대다 양방향 정리
  - 이런 매핑은 공식적으로 존재X 
  - @JoinColumn(insertable=false, updatable=false) 
  - 읽기 전용 필드를 사용해서 양방향 처럼 사용하는 방법
  - **<u>다대일 양방향을 사용하자</u>**

### 2.3 일대일[1:1]

- 일대일 관계
  - 일대일 관계는 그 반대도 일대일
  - 주 테이블이나 대상 테이블 중에 외래 키 선택 가능
    - 주 테이블에 외래 키
    - 대상 테이블에 외래 키
  - <u>외래 키에 데이터베이스 유니크(UNI) 제약조건 추가</u>
- 일대일: 주 테이블에 외래 키 단방향

![image](https://user-images.githubusercontent.com/26649731/77494852-40355280-6e8a-11ea-9109-525990966f99.png)

- 일대일: 주 테이블에 외래 키 단방향 정리
  - 다대일(@ManyToOne) 단방향 매핑과 유사
- Member.java

```java
@Entity
@Getter
@Setter
public class Member {
    ...
        @OneToOne
        @JoinColumn(name = "LOCKER_ID")
        private Locker locker;
    ...
}
```

- Locker.java

```java
@Entity
@Getter
@Setter
public class Locker {
    ...
        @Id @GeneratedValue
        @Column(name = "LOCKER_ID")
        private Long id;

    	@Column
    	private String name;
    ...
}
```

- 일대일: 주 테이블에 외래 키 양방향

![image](https://user-images.githubusercontent.com/26649731/77494871-57744000-6e8a-11ea-8eea-5dbf874a04c0.png)

- 일대일: 주 테이블에 외래 키 양방향 정리
  - 다대일 양방향 매핑 처럼 외래 키가 있는 곳이 연관관계의 주인
  - 반대편은 mappedBy 적용

```java
@Entity
@Getter
@Setter
public class Locker {
    ...
        @Id @GeneratedValue
        @Column(name = "LOCKER_ID")
        private Long id;

    	@Column
    	private String name;
   	// ============추가=============
   		@OneToOne(mappedBy = "locker")
   		private Member member;
    // =============================
}
```

- 일대일: 대상 테이블에 외래 키 단방향

![image](https://user-images.githubusercontent.com/26649731/77494896-6c50d380-6e8a-11ea-90cf-047e76d6f0fe.png)

- 일대일: 대상 테이블에 외래 키 단방향 정리
  - 단방향 관계는 JPA **지원X**
  - 양방향 관계는 지원
- 일대일: 대상 테이블에 외래 키 양방향

![image](https://user-images.githubusercontent.com/26649731/77494930-812d6700-6e8a-11ea-9a3f-d2ec1dda8dde.png)

- 일대일: 대상 테이블에 외래 키 양방향
  - 사실 일대일 주 테이블에 외래 키 양방향과 매핑 방법은 같음
- 일대일 정리
  - 주 테이블에 외래 키 (Memeber)
    - 주 객체가 대상 객체의 참조를 가지는 것 처럼 주 테이블에 외래 키를 두고 대상 테이블을 찾음
    - 객체지향 개발자 선호
    - JPA 매핑 편리
    - 장점: 주 테이블만 조회해도 대상 테이블에 데이터가 있는지 확인 가능
    - 단점: 값이 없으면 외래 키에 null 허용
    - 대상 테이블에 외래 키 (Locker)
    - 대상 테이블에 외래 키가 존재
    - 전통적인 데이터베이스 개발자 선호
    - 장점: 주 테이블과 대상 테이블을 일대일에서 일대다 관계로 변경할 때 테이블 구조 유지
    - 단점: 프록시 기능의 한계로 지연 로딩으로 설정해도 항상 즉시 로딩됨(프록시는 뒤에서 설명)

### 2.4 다대다[N:M] (실무에서는 변경 사용 권장)

- 관계형 데이터베이스는 정규화된 테이블 2개로 다대다 관계를 표현할 수 없음
- **연결 테이블을 추가해서 일대다, 다대일 관계로 풀어내야함**

![image](https://user-images.githubusercontent.com/26649731/77495041-d10c2e00-6e8a-11ea-9e8e-62f58d15a977.png)

![image](https://user-images.githubusercontent.com/26649731/77495052-d79aa580-6e8a-11ea-85d5-78fb9647abe3.png)

- 객체는 컬렉션을 사용해서 객체 2개로 다대다 관계 가능

![image](https://user-images.githubusercontent.com/26649731/77495086-e5502b00-6e8a-11ea-847c-758b478b48f0.png)

![image](https://user-images.githubusercontent.com/26649731/77495095-ec773900-6e8a-11ea-9ed5-8f8ffc5df140.png)

- @ManyToMany 사용
- @JoinTable로 연결 테이블 지정
- 다대다 매핑: 단방향, 양방향 가능.
- 다대다 매핑

```java
@Entity
@Getter
@Setter
public class Member {
    ...
        @ManyToMany
        @JoinTable(name = "MEMBER_PRODUCT")
        private List<Product> productList = new ArrayList<>();
    ...
}
```

```java
@Entity
@Getter
@Setter
public class Product {
    ...
    @ManyToMany(mappedBy = "productList")
    private List<Member> members = new ArrayList<>();

}
```

- 다대다 매핑의 한계
  - 편리해 보이지만 실무에서 사용X 
  - 연결 테이블이 단순히 연결만 하고 끝나지 않음
  - 주문시간, 수량 같은 데이터가 들어올 수 있음

![image](https://user-images.githubusercontent.com/26649731/77495134-09137100-6e8b-11ea-8fdc-e060ee317abd.png)

- 다대다 한계 극복
  - **연결 테이블용 엔티티 추가(연결 테이블을 엔티티로 승격)** 
  - **@ManyToMany -> @OneToMany + @ManyToOne**

![image](https://user-images.githubusercontent.com/26649731/77495157-1df00480-6e8b-11ea-890a-a6fc93642fd7.png)

![image](https://user-images.githubusercontent.com/26649731/77495163-23e5e580-6e8b-11ea-9259-8aa636d628b9.png)

- 다대다 매핑 수정

```java
public class Member {
    ...
        @OneToMany(mappedBy = "member")
        private List<MemberProduct> memberProducts = new ArrayList<>();
    ...
}
```

```java
public class MemberProduct {
    ...
        @ManyToOne
        @JoinColumn(name = "PRODUCT_ID")
        private Product product;

    	@ManyToOne
    	@JoinColumn(name = "MEMBER_ID")
    	private Member member;
}
```

```java
public class Product {
    ...
    @OneToMany(mappedBy = "product")
    private List<MemberProduct> memberProducts = new ArrayList<>();

}
```

### 2.5 실전 예제 3 - 다양한 연관관계 매핑

- 배송, 카테고리 추가 - 엔티티
  - 주문과 배송은 1:1(@OneToOne) 
  - 상품과 카테고리는 N:M(@ManyToMany)

![image](https://user-images.githubusercontent.com/26649731/77495194-3829e280-6e8b-11ea-94a0-1297891bc1b7.png)

- 배송, 카테고리 추가 - ERD

![image](https://user-images.githubusercontent.com/26649731/77495213-45df6800-6e8b-11ea-8a65-6f78397fbe81.png)

- 배송, 카테고리 추가 - 엔티티 상세

![image](https://user-images.githubusercontent.com/26649731/77495230-50016680-6e8b-11ea-90cf-746957f1febc.png)

- Delivery.java

```java
@Entity
public class Delivery {

    @Id @GeneratedValue
    private Long id;

    private String city;
    private String street;
    private String zipcode;
    private DeliveryStatus status;

    // Order와 1:1 매핑. 주인은 아님.
    @OneToOne(mappedBy = "delivery")
    private Order order;
}
```

- Category.java

```java
@Entity
public class Category {

    @Id @GeneratedValue
    private Long id;

    private String name;

    // 부모
    @ManyToOne
    @JoinColumn(name = "PARENT_ID")
    private Category parent;

    // 자식들
    @OneToMany(mappedBy = "parent")
    private List<Category> child = new ArrayList<>();

    // 다대다 관계
    @ManyToMany
    @JoinTable(name = "CATEGORY_ITEM",
               // 내가 조인해야 되는 것
            joinColumns = @JoinColumn(name = "CATEGORY_ID"),  
               // 반대 테이블에서 조인해줘야 하는 것
            inverseJoinColumns = @JoinColumn(name = "ITEM_ID")) 
    private List<Item> items = new ArrayList<>();
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

//    @Column(name = "MEMBER_ID")
//    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems = new ArrayList<>();

    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)    // 필수로 STRING 해주자.
    private OrderStatus status;

    // 1:1 매핑. 주인임.
    @OneToOne
    @JoinColumn(name = "DELIVERY_ID")
    private Delivery delivery;
}
```

- item.java

```java
public class Item {

    @Id @GeneratedValue
    @Column(name = "ITEM_ID")
    private Long id;

    private String name;
    private int price;
    private int stockQuantity;

    @ManyToMany(mappedBy = "items")
    private List<Category> categories = new ArrayList<>();

}
```



- N:M 관계는 1:N, N:1로
  - 테이블의 N:M 관계는 중간 테이블을 이용해서 1:N, N:1 
  - 실전에서는 중간 테이블이 단순하지 않다. 
  - @ManyToMany는 제약: 필드 추가X, 엔티티 테이블 불일치
  - 실전에서는 @ManyToMany 사용X
- @JoinColumn
  - 외래 키를 매핑할 때 사용

![image](https://user-images.githubusercontent.com/26649731/77495287-732c1600-6e8b-11ea-875d-cef45d035e54.png)

- @ManyToOne - 주요 속성
  - 다대일 관계 매핑

![image](https://user-images.githubusercontent.com/26649731/77495304-8808a980-6e8b-11ea-86fb-7c27c8b961ac.png)

- @OneToMany - 주요 속성
  - 다대일 관계 매핑

![image](https://user-images.githubusercontent.com/26649731/77495332-9b1b7980-6e8b-11ea-824a-b3eabf026acb.png)

