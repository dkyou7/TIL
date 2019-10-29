### \<a>태그 요소에 속성 추가하기

- href : 이 속성에는 당신이 연결하고자 하는 웹 주소를 지정할 수 있습니다.
- title : 링크에 대한 추가 정보를 나타냅니다. 그 예로 title="The Mozilla homepage". 이 내용은 링크위로 마우스를 옮겼을 때 나타날 것입니다.
- target :  target="_blank"는 링크를 새 탭에서 보여줍니다. 이 속성을 추가하면 새창에서 열리게 됩니다.



### \<ul> vs \<ol>

- ul태그는 쩜으로 표시되는것
- ol태그는 1,2,3,번호로 표시되는것

# vue.js

간단한 템플릿 구문을 사용하여 선언적으로 DOM에 데이터를 렌더링하는 것입니다.

```html
<div id="app">
    {{message}}
</div>
```

```js
var app = new Vue({
	el:"#app",
	data:{
		message:"안녕하세요 Vue!"
	}
})
```

- 엘리먼트 속성을 바인딩하기

```html
<div id="app-2">
	<span v-bind:title="message">
		내 위에 잠시 마우스를 올리면 동적으로 바인딩 된 title을 볼 수 있습니다!
	</span>
</div>
```

```javascript
var app2 = new Vue({
	el: "#app-2",
	data:{
		message:"이 페이지는 " + new Date() + " 에 로드 되었습니다."
	}
})
```

- 엘리먼트의 존재 여부를 토글해보기

```html
<div id="app-3">
	<p v-if='seen'>이제 나를 볼 수 있어요</p>
</div>
```

```js
var app3=new Vue({
	el:"#app-3",
	data:{
		seen:true
	}
})
```

> app3.seen = false

이거 쓰면 안보이게 된다.

- DOM의 구조에도 데이터를 바인딩 할 수 있다. 또한 Vue 엘리먼트가 Vue에 삽입/갱신/제거될 때 자동으로 트랜지션 효과를 적용할 수 있는 강력한 시스템을 제공한다.
- v-for 디렉티브를 사용해보자.

```html
<div id="app-4">
	<ol>
		<li v-for="todo in todos">
		{{todo.text}}
		</li>
	</ol>
</div>
```

```js
var app4 = new Vue({
	el:"#app-4",
    data:{
        todos:[
            {text:"JavaScript 배우기"},
            {text:"Vue 배우기"},
            {text:"무언가 멋진거 만들기"}
        ]
    }
})
```

> app4.todos.push({ text: 'New item' })

이걸 쓰면 목록 추가가 된다.

## 사용자 입력 핸들링

사용자가 앱과 상호작용할 수 있게 하기 위햇 우리는 v-on 디렉티브를 사용하여 Vue 인스턴스에 메소드를 호출하는 이벤트 리스너를 첨부할 수 있습니다.

```html
<div id="app-5">
	<p>{{message}}</p>
	<button v-on:click="reverseMessage">메세지 뒤집기</button>
</div>
```

```js
var app5 = new Vue({
	el:"#app-5",
	data:{
		message:"안녕하세요! Vue.js!"
	},
	methods:{
		reverseMessage: function(){
			this.message = this.message.split("").reverse().join("")
		}
	}
})
```

- 양방향 바인딩 할 수 있다. **v-model**

```html
<div id='app-6'>
    <p>
        {{message}}
    </p>
    <input v-model="message">
</div>
```

```js
var app6 = new Vue({
	el:"#app-6",
	data:{
		message:"ㅎㅇ! Vue.js!"
	}
})
```

### 컴포넌트를 사용한 작성방법

- 컴포넌트 시스템은 Vue의 중요한 개념중 하나이다.
- 기본 HTML 엘리먼트를 확장하여 재사용 가능한 코드를 캡슐화하는 데 도움이 됩니다.
- 컴포넌트는 본질적으로 미리 정의된 옵션을 가진 Vue 인스턴스입니다. Vue에서 컴포넌트를 등록하는 방법은 간단합니다.

```js
// todo-item 이름을 가진 컴포넌트를 정의합니다.
Vue.component('my-component',{
	template: '<div>할일 항목 하나입니다.</div>'
})

new Vue({
    el:"#example"
})
```

- 이걸 html에서 가져다 쓸 때 다른 컴포넌트의 탬플릿에서 이 컴포넌트를 사용할 수 있습니다.

```html
<div id='example'>
    <!-- my-component 컴포넌트의 인스턴스 만들기 -->
    <my-component></my-component>
</div>
```

- data는 반드시 함수여야합니다.

Vue 생성자에 사용할 수 있는 대부분의 옵션은 컴포넌트에서 사용가능합니다. 하지만 한가지 특별한 경우가 있는데, data는 함수여야 합니다.

data는 컴포넌트 인스턴스의 함수여야합니다. 다음과 같이 사용하세요.

```html
<div id="example-2">
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
    <simple-counter></simple-counter>
</div>
```

```js
var data={counter:0}
Vue.component('simple-counter',{
    template:'<button v-on:click="counter+=1">{{counter}}</button>',
    data: function(){
        return data
        // return counter:0 하면 공유되지 않은 각각의 객체가 생성된다.
    }
})
new Vue({
    el:"#example-2"
})
```

### 컴포넌트 작성

컴포넌트는 부모-자식 관계에서 가장 일반적으로 함께 사용하기 위한 것입니다. 컴포넌트 A는 자체 템플릿에서 컴포넌트 B를 사용할 수 있습니다. 그들은 필연적으로 의사소통이 필요합니다.

Vue.js에서 부모-자식 컴포넌트 관계는 **props는 아래로, events 위로** 라고 요약가능합니다.

부모는 props를 통해 자식에게 데이터를 전달하고, 자식은 events를 통해 부모에게 메세지를 보냅니다.

#### props로 데이터 전달하기.

하위 컴포넌트로 데이터를 전송해 봅시다.

```js
Vue.component('child',{
	props:['message'],
	template:'<span>{{message}}</span>'
})
```

```html
<child message="ㅎㅇ!! 나는 Vue.js야."</child>
```

## Vue 프로젝트 만들기

- npm install -g @vue/cli
- vue create test
- task explorer 설치
- package.json

```bash
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "firebase:deploy": "vue-cli-service build && firebase deploy"
  },
```

npm i -g firebase-tools 하면 에러가 난다.. 왜그럴까?

npm install 을 하고 해야하는건가? (가정) -- 맞는듯 지금까진 잘 된다.

npm install --save vue-qrcode-reader

firebase deploy

