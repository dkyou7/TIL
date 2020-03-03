[toc]

# Model 필드타입 정리

## CharField

- 제한 문자열 삽입.
- 반드시 최대 길이를 max_length 옵션에 지정해야 함

```python
title = models.CharField(max_length=100,**option)
```

## EmailField

- 이메일 주소 형태를 넣을 때 사용된다.

```python
email = EmailField(max_length=254,**options)
```

- 이메일 형식에 맞지 않으면 맞춰 쓰라는 경고문을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/26649731/75733010-6d815b80-5d37-11ea-9fc7-322d1dc5a0c0.png)

## URLField

- URL 주소 형태를 넣을 때 사용된다.

```python 
url = URLField(max_length=200,**options)
```

## TextField()

- 텍스트 필드는 문자열과 비슷하게 보이지만, 대용량 문자열을 처리하는 필드이다. 
- 캐릭터 필드보다는 DB 용량을 많이 잡아 먹겠지만, 크기 제한을 굳이 할 필요가 없다.

```python
post = models.TextField(**options)
```

