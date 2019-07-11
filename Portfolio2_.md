# Portfolio2 하면서 해결했던 것

# Setting

> 믿고 써도 되는가를 판단하는 기준 - 최근에 업데이트가 되었는가

* [pyenv - win](<https://github.com/pyenv-win/pyenv-win>)

```bash
$ pip install pyenv-win --target $HOME/.pyenv
```

* 시스템 환경 변수 편집 > 환경 변수 > 시스템 변수 > Path

```text
C:\Users\multicampus\AppData\Local\Programs\Python\Python36\
C:\Users\multicampus\AppData\Local\Programs\Python\Python36\Scripts\
C:\Users\multicampus\.pyenv\pyenv-win\bin
C:\Users\multicampus\.pyenv\pyenv-win\shims
```

* bash 껐다가 켜고 pyenv 쳐보면 나온다

```bash
$ pyenv install 3.6.8
```

* disable 누르고 close
* bash에서

```bash
$ vi ~/.bash_profile
```

```bash
export PATH="/c/Users/student/.pyenv/bin:$PATH"
```

* 시행착오 후 정리
  * gitbash에서 쓰기 위해 3.7.2 사용

```bash
$ pyenv install 3.7.2
$ pyenv global 3.7.2
$ pyenv rehash
$ python -V
=== version 확인 후, 가상환경 원하는 폴더에서 ===
$ python -m venv django-venv
$ cd django-venv
$ source Scripts/activate
=== 그러면, 이렇게 될 것 ===
(django-venv) ~

그 후 npm install을 통해 이전에 깔아두었던 npm service 를 설치한다.
npm run serve 를 통해 서버를 실행시킨다.
```

* mac

```bash
$ pyenv virtualenv 3.6.7 django-venv
=== 원하는 폴더에서 ===
$ pyenv local django-venv
=== django-venv 라는 이름의 가상 공간 생성 ===
$ vi .python-version
=== 이 숨김파일에서 버전관리 확인 가능 ===
$ django-admin startproject moviepjt .
=== "." 현재 directory에 manage.py 와 프로젝트 폴더 생성 ===

=== 내부와 외부에서 찍어보면 차이를 알 수 있다 ==
$ pip list
```

*기존에는 폴더 안에 폴더를 또 만들어서 프로젝트를 진행했지만, 그러면 가상환경에서 하는 의미가 없음. 바로 그 디렉토리에서 진행한다*

* pip freeze를 해 놓은 뒤 넘어와서 설치할 때에는

```bash
$ pip install -r requirements.txt
```

* 작업중에 finder 여는 법 : `open .`
* 작업중에 vscode 여는 법 : `code .` : 설정 필요
* finder에서 terminal 여는 법 : 
* finder에서 vscode 여는 법 : 





- git pull origin master 내 브랜치로 땡겨오는 방법.

vscode vetur plugin  설치하면 코드 단어에 색상이 입혀진다.



크롬에 최적화되어이씁니다 띄우기.

```bash
1.npm install vue-browser-detect-plugin

2.main.js에
import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

3.App.vue -> export default 부분에 뷰 속성 추가
beforeCreate() {
 if(browser !== 'Chrome'){
  alert("본 사이트는 크롬버전에 최적화되어있습니다.")
 }
}
```



- backToTop npm install guide
  - [여기](https://www.npmjs.com/package/vue-backtotop)



- 새로운 저장소 파서 저장하기

- git remote add pb(별명) git://github.com/paulboone/ticgit.git(깃주소)
- git push pb master 

```vue
position="center bottom"
```



- open-on-hover : 버튼 같다대기만 하면 어떤 이벤트가 발생하게 함

- img 크기 조절하는 방법.

  ```css
  .container{
  overflow:hidden;
  }
  .container img{
      margin-top:50%;
  }
  ```

  

- 구글 번역 기능

- ```html
  <script type="text/javascript">
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'ko', includedLanguages: 'en,ja,ko', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
  }
  </script>
  <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
  ```

  index.html 에 추가

- ```html
  <v-toolbar-items><div id="google_translate_element"></div></v-toolbar-items>
  ```

  원하는 위치에 추가하기