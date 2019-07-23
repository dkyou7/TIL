# 너무 어려운 Git!

git 관련 에러 해결

- git config core.quotepath false

하면 한글 깨짐 에러 해결된다.

## 1. Git branch 

- `git branch -r` : 지금 브랜치가 어떤것이 있는지 알아보고자 할 때 쓴다.
- `git remote update` : 브랜치 따로 파놓은 것들 어떤것이 있는지 업데이트 하기 

![git1](img/git1.PNG)

> 다음과 같이 브랜치가 하나 더 생긴것을 알 수 있었다

1. `git checkout develop` : develop branch로 이동한다.
2. `git checkout -b feature/Footer-contact-us-init develop` : 
   `git checkout -b [내가 만들고자 하는 기능 이름] [브랜치명]` 으로 develop에서 파생된 브랜치를 하나 더 만든다
3. 코드 수정 뚝딱뚝딱 하기
4. `git add .` 
5. `git commit -m'YDK|[기능이걸했어요!]'`
6. `git pull --rebase origin develop` : 리베이스로 내꺼가 최신이 되도록 붙여준다.![git2](img/git2.PNG)
8. `git push origin feature/Footer-contact-us-init2` : 먼저 내가 수정한 브랜치에 등록

![git3](img/git3.PNG)

8. `gitlab` 이동 후 스스로 머지 리퀘스트를 날리고 받아들일 수 있다.
9. `git checkout develop` 
10. `git pull origin develop`
11. `git branch -D feature/Footer-contact-us-init` : 기능을 수행하기 위해 만들었던 브랜치를 삭제한다
12. `git push origin --delete feature/Footer-contact-us-init` : remote에도 내가 이 브랜치를 삭제했음을 알린다.



