### Portfolio1 하면서 배운것들..

1. [css로 글자 자르기 - 한줄, 여러줄 자르기](https://webdir.tistory.com/483)

2. [floating 화살표 구현](https://www.npmjs.com/package/vue-backtotop)

3. [favicon](https://www.favicon-generator.org/) : 사진을 favicon으로 변환 후 여러 이미지 크기로 바꺼준다.

4. 즐겨찾기 이모티콘 등록

   - [싸피 이동규] [오전 10:09] public 폴더에들어가면 index.html있어
     [싸피 이동규] [오전 10:09] <head></head>
     [싸피 이동규] [오전 10:09] 여기 사이에
     [싸피 이동규] [오전 10:09] 

   - ```html
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
     ```

     [싸피 이동규] [오전 10:09] 이거 집어넣고
     [싸피 이동규] [오전 10:09] <body></body>
     [싸피 이동규] [오전 10:09] 이 사이에
     [싸피 이동규] [오전 10:10] <a href="#" id="favorite" title="즐겨찾기 등록">즐겨찾기<img Src="bookmark-black-shape.svg" style="width:10px;"/></a>
     [싸피 이동규] [오전 10:10] 이걸 바디 맨위에 넣고

   - ```js
       <script type="text/javascript">
       $(document).ready(function(){
       $('#favorite').on('click', function(e) {
         var bookmarkURL = window.location.href;
         var bookmarkTitle = document.title;
         var triggerDefault = false;
     
         if (window.sidebar && window.sidebar.addPanel) {
             // Firefox version &lt; 23
             window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
         } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') < -1)) || (window.opera && window.print)) {
             // Firefox version &gt;= 23 and Opera Hotlist
             var $this = $(this);
             $this.attr('href', bookmarkURL);
             $this.attr('title', bookmarkTitle);
             $this.attr('rel', 'sidebar');
             $this.off(e);
             triggerDefault = true;
         } else if (window.external && ('AddFavorite' in window.external)) {
             // IE Favorite
             window.external.AddFavorite(bookmarkURL, bookmarkTitle);
         } else {
             // WebKit - Safari/Chrome
             alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 를 이용해 이 페이지를 즐겨찾기에 추가할 수 있습니다.');
         }
     
         return triggerDefault;
     });
     });
       </script>
     ```

   - [싸피 이동규] [오전 10:20] 스크립트는 index에 넣어두고
     [싸피 김범현] [오전 10:20] 숨어있는거 꺼내옴
     [싸피 이동규] [오전 10:20] a태그 네비바로 빼면됨

5. <u>**아이콘 파일 편리하게 찾아주는 곳**</u> [여기](https://www.flaticon.com/search?word=bookmark)

6. [markdown editing](https://www.npmjs.com/package/v-markdown-editor) 하는 곳

7. 

   