# Linux

1. 명령치환

2. 리눅스 산술연산

   - +, -, \\*, /, %
   - $[] : 명령어의 실행 결과값.
   - (()) : c-style *이걸 추천한다*

3. 조건문

   ```bash
   # 로그인 기능
   #!/bin/bash
     
   read -p "Input login name : " name
   grep $name /etc/passwd > /dev/null
   if [ $? -eq 0 ]
   then
           echo "Welcome educafe"
   else
           echo "Please contact admin"
   fi      
   ```

4. Regular Expression