[toc]

# 1. Model 필드타입 정리

## 1. CharField

- 제한 문자열 삽입
- 반드시 최대 길이를 max_length 옵션에 지정

```python
title = models.CharField(max_length=100,**option)
```

## 2. EmailField

- 이메일 주소 형태를 넣을 때 사용됨

```python
email = EmailField(max_length=254,**options)
```

- 이메일 형식에 맞지 않으면 맞춰 쓰라는 경고문을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/26649731/75733010-6d815b80-5d37-11ea-9fc7-322d1dc5a0c0.png)

## 3. URLField

- URL 주소 형태를 넣을 때 사용된다.

```python 
url = URLField(max_length=200,**options)
```

## 4. TextField()

- 텍스트 필드는 문자열과 비슷하게 보이지만, 대용량 문자열을 처리하는 필드이다. 
- 캐릭터 필드보다는 DB 용량을 많이 잡아 먹겠지만, 크기 제한을 굳이 할 필요가 없다.

```python
post = models.TextField(**options)
```

## 5. IntegerField

- 32비트의 정수형 필드 
- 사용 방법은 완전히 똑같지만 정수 사이즈에 따라 BigIntegerField, SmallIntegerField 사용가능
- default는 맨 처음 수정없이 저장될 경우의 값

```python
count = models.IntegerField(default=0, **options)
```

## 6. BooleanField

- True 혹은 False만 저장하는 필드
- Null 을 허용하기 위해서는 NullBooleanField를 사용한다. 
- initial는 맨 처음 수정없이 저장될 경우의 값을 뜻한다.

```python
bool = models.BooleanField(initial=True, **options)
```

## 7. DatetimeField

- 시간과 관련된 값을 저장하는 필드
- DateField : 날짜만 저장하고 싶을 경우에 사용
- TimeField : 시간만 가질 경우 사용

```python
time = models.DateTimeField(auto_now=False, **options)
```

- 만약 자동으로 지금 시간대를 박아넣고 싶다면 auto_now = True로 옵션을 바꿔주면 된다. 
- auto_now 옵션 : save 될 때마다 현재 시간을 갱신
- auto_now_add  옵션 :  맨 처음 생성한 현재 날짜만 갱신한다.

## 8. DecimalField

- 데시멀 필드는 소수점 관련 필드를 말한다. 
- 이 필드는 max_digits와 decimal_places를 필수로 지정해야 한다.
- 표현할 수 있는 숫자의 수(max_digits)와 소수점 위치(decimal_places)를 지정함으로 지정된 숫자가 맞는지 체크가능하다.

```python
decimal = models.DecimalField(max_digits=None, decimal_places=None, **options)

# 예를 들어 max_digits=3, decimal_places=1의 값일 경우, 11.2가 예가 될 수가 있다.
```

## 9. FileField

- 파일을 업로드하는 필드
- upload_to 옵션에 반드시 해당 경로를 지정해야 한다.
- 폴더의 탐색은 사전에 settings.py에서 설정해놓았던 **MEDIA_ROOT** 경로부터 시작한다.

```python
# file will be uploaded to MEDIA_ROOT/uploads    
upload = models.FileField(upload_to='uploads/', **options)
```

## 10. ImageField

- 파일 필드의 파생 클래스
- 해당 파일이 이미지인지를 체크해준다. 

```python
img = models.ImageField(upload_to='images/', **options)
```

## $필드의 옵션

- 각 모델마다 따로 필요한 옵션도 있지만, 공통적으로 가지고 있고, 또 주로 쓰는 옵션들에 대해서 몇 가지 다뤄보자.

[![img](https://mblogthumb-phinf.pstatic.net/MjAxODA3MTRfMjY3/MDAxNTMxNTU3MzM5NzMz.m2C3Blqrz8u_htEahHwnBsc90mENmJD0KsfJnmVC_D4g.I1Dd_o_zTAWABCpyz6U7CMjyVJOXhVzjO5JrxAF63h8g.PNG.shino1025/image.png?type=w800)](https://m.blog.naver.com/PostView.nhn?blogId=shino1025&logNo=221319031389&targetKeyword=&targetRecommendationCode=1#)

http://pythonstudy.xyz/python/article/308-Django-%EB%AA%A8%EB%8D%B8-Model

보통 필수 항목을 제외하면 blank 옵션이나 null을 활성화 시켜놓는다. 또 해당 필드가 DB내에서 중요한 Key 역할을 하게 될 경우, 관련 옵션을 사용하면 유용할 것이다.





# 2. DataBase 마이그레이션 하기

- Django에서 Model 클래스를 생성하고 난 후, DB와 연동시킬 수 있도록 해당 모델에 대응하는 테이블을 똑같이 생성해줘야 한다. 
- **Python 모델 클래스의 수정 (및 생성 )을 DB에 적용하는 과정을 Migration**이라고 한다.

## 1. makemirgratons

- 특정 앱의 모델을 파악하여 테이블 스키마를 생성 혹은 수정을 위한 마이그레이션 파일을 생성한다.
- **필요한 필드가 생겼거나, 혹은 삭제해야 할 필드가 생겼을 경우 반드시 새로운 마이그레이션 파일을 만들어줘야 한다.**

```bash
python makemigrations <앱 이름>
```

- **물론 이 명령을 수행하기 위해서는 settings.py 파일의 INSTALLED_APPS에 해당 앱의 이름이 추가되있어야 함을 명심하자.**

## 2. migrate

- 모델 클래스를 보고 실제로 DB 테이블을 생성 및 수정하는 명령어는 바로 이것이다.

```bash
python manage.py migrate
```

- 현재까지 마이그레이션을 해왔던 기록은 해당 앱의 migrations 폴더에서 확인할 수 있다.

[![img](https://mblogthumb-phinf.pstatic.net/MjAxODA3MTRfMjU0/MDAxNTMxNTU4MDA0MTg5.xCqpUiyJgjB9nWOqNI1HQXZjoo8ApDxZj-ya-KNLlbYg.vvWqtIMmCDz_oIvVdmjwH7NoMbQ82DEN_7DtD_LTt1Mg.PNG.shino1025/image.png?type=w800)](https://m.blog.naver.com/PostView.nhn?blogId=shino1025&logNo=221319031389&targetKeyword=&targetRecommendationCode=1#)

- 새로 서버를 옮기거나 새로운 DB를 사용할 때에는 항상 migration 오류를 주의해야 한다.
- **이미 전의 마이그레이션으로 저장된 모델이 해당 DB에 저장되어 있는데, 거기서 새로운 마이그레이션을 덮어씌울 경우, 해당 데이터를 불러 올때, 오류가 발생할 수 있으니 꼭 이전 데이터를 지우고 해주자.**



출처 : https://m.blog.naver.com/PostView.nhn?blogId=shino1025&logNo=221319031389&targetKeyword=&targetRecommendationCode=1

