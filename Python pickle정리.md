# Python pickle이란?

- 복잡한 자료를 파일에 읽고 쓸때 쓰는 모듈이다.

예제

>>> users = {'kim':'3kid9', 'sun80':'393948', 'ljm':'py90390'}
>>> f = open('users.txt', 'w')
>>> import pickle
>>> pickle.dump(users, f)
>>> f.close()

ID와 비밀번호를 user라는 사전에 담았습니다. 그리고 users.txt라는 파일을 새로 열어서 f라고 정의함. pickle 모듈의 dump 함수를 사용.

dump : user라는 리스트의 내용을 파일 f에 쏟아붓는다는 느낌으로 생각하면 됨.

>>> f = open('users.txt')
>>> a = pickle.load(f)
>>> **print** a
>>> {'sun80': '393948', 'kim': '3kid9', 'ljm': 'py90390'}

load : f에 저장된 리스트를 다 가져온다.