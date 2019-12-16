# Java Framework - Spring, iBatis, MyBatis 

### 2019/12/16(월)

- 공유폴더 : 10.5.1.100

#### 목차

##### IoC - 다형성 폴리모피즘 -- 월

AoP - 새로운 개념 -- 화

MVC - html, servlet, jsp(el, jstl) 웹과 관련된 기술 알아야 한다.  -- 수, 목

iBatis, Mybatis 프레임워크 -- 금

자바코드 한줄로 디비 연동 도와주기.

채규태



### chap1

#### 환경설정

1. 알집 - 줄루 - 이클립스, 줄루 설치되어있다면 삭제 - 줄루 환경변수 설정 - java -version

2. h2 압축 해제 - h2w 배치파일(서버 구동시 필요) - 우측클릭 바탕화면 보내기 -  더블클릭

   - jdbc url >> jdbc:h2:tcp://localhost/~/test 수정

3. 이클립스 설치, 톰켓 설치

4. general - apperance - color and font - basic - text font - 굵게 - 12

5. ##### 프로젝트 새로 만들 시 dynamic web module version - 2.5로 해놓아야한다. (중요)

6. add folder - resources, test 추가하기

7. web-inf > lib 에 프레임워크 lib 파일 복붙하자

8. resources에 게시판 sql 및 xml 파일 복붙하자

9. sts_version4.8 설치 - dev - eclipse에 설치하자 - 덮어쓰기 하기



### Chap2

#### 1. IoC(Inversion of Control) 컨테이너

1. IoC의 개념
   - 객체 생성의 주도권을 컨테이너가 가져갔음, 유지보수 용이
   - 자바 소스코드를 수정할 필요가 없다.
   - 다형성 : 상속 + 오버라이딩 + 형변환
2. 결합도와 유지보수성
   1. 다형성을 이용한 결합도 떨어뜨리기
   2. Factory 패턴을 이용한 결합도 떨어뜨리기
3. Spring IoC 컨테이너
   1. applicationContext.xml 을 이용한 결합도 떨어뜨리기
   2. .getBean("xml 주소")
   3. 종류 
      - BeanFactory : lazy-loading
      - ApplicationContext : pre-loading (더 빠름)

#### 2. Spring 설정 파일

1. 설정파일 기초 3가지
   - id, class로 구성
   - import
2. Bean 엘리먼트 속성 5가지
   - init-method
   - destroy-method
   - lazy-init
   - depends-on
   - scope

### chap3

- Dependency Injection

- Bean을 가지고 많이 노는 것 같아.
  - Constructor Injection
    
    - 자바소스를 전혀 변경하지 않고도 객체관계의존성을 이용하여 변경 가능하다. xml에서 변경 가능하다.
    
      ```xml
      <bean id="tv" class="polymorphism4.SamsungTV">
          <constructor-arg ref="sony"></constructor-arg>
          <constructor-arg value="180000000"></constructor-arg>
      </bean>
      ```
    
  - Setter Injection
  
    ```xml
    <bean id="tv" class="polymorphism4.GoogleTV">
        <property name="speaker" ref="sony"></property>
        <property name="price" value="1200000"></property>
    </bean>
    ```
  
  - Annotation 방식
  
    ```xml
    <context:component-scan base-package="polymorphism4"></context:component-scan>
    ```
  
    - @Component : 클래스 위에
    - @Autowired : 변수 위에