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

- 스프링 부트 스타터(https://start.spring.io/)를 사용하자.
  - 나는 이걸로 인텔리제이 임포트하니까 자꾸 이상한 에러가 났다.
    그래서 그냥 새로 만들기로 시작함.
- Dependencies(5개)
  - Spring Web
  - thymeleaf 
  - Spring Data JPA
  - h2
  - lombok
- groupId: jpabook
  artifactId: jpashop
- Gradle 전체 설정은 위 Dependencies 를 제대로 받으면 잘 적용된 상태로 있다.
  build.gradle 을 확인해보자.

```java
buildscript {
    ext {
        springBootVersion = '2.1.7.RELEASE'
    }
    repositories {
        mavenCentral()
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
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    compileOnly 'org.projectlombok:lombok'
    runtimeOnly 'com.h2database:h2'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

- 동작 확인
  - 기본 테스트 케이스 실행
    - 안되서 다 따라쳐서 만들었다.
  - 스프링 부트 메인 실행 후 에러페이지로 간단하게 동작 확인(`http://localhost:8080')



### 2. 라이브러리 살펴보기

### 3. View 환경 설정

### 4. H2 데이터베이스 설치

### 5. JPA와 DB 설정, 동작확인

## 2. 도메인 분석 설계

1. 요구사항 분석
도메인 모델과 테이블 설계
엔티티 클래스 개발
엔티티 설계시 주의점
애플리케이션 구현 준비
구현 요구사항
애플리케이션 아키텍처
회원 도메인 개발
회원 리포지토리 개발
회원 서비스 개발
회원 기능 테스트
상품 도메인 개발
상품 엔티티 개발(비즈니스 로직 추가)
상품 리포지토리 개발
상품 서비스 개발
주문 도메인 개발
주문, 주문상품 엔티티 개발
주문 리포지토리 개발
주문 서비스 개발
주문 기능 테스트
주문 검색 기능 개발
웹 계층 개발
홈 화면과 레이아웃
회원 등록
회원 목록 조회
상품 등록
상품 목록
상품 수정변경 감지와 병합(merge)
상품 주문
주문 목록 검색, 취소