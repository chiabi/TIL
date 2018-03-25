# Forms

## 1. 소개

+ 텍스트 필드, 버튼, 체크박스, 범위 제어, 컬러 피커같은 양식 제어가 있는 웹페이지의 컴포넌트.
+ 사용자는 추가 처리를 위해 서버로 전송될 수 있는 데이터(검색 또는 계산의 결과를 반환하는 것)를 제공하는 형태로 상호작용할 수 있다.
+ 스크립트가 사용자 환경을 향상 시키거나 서버에 데이터를 제출하는 것 이외의 목적으로 양식을 사용할 수 있도록 API를 사용할 수 있지만, 대부분의 경우 클라이언트 측 스트립팅은 필요하지 않다.
+ 양식 작성은 여러단계로 구성되며, 다음과 같은 순서로 수행할 수 있다.
  - 사용자 인터페이스 작성
  - 서버측 처리 구현
  - 서버와 통신하도록 사용자 인터페이스 구성

### 1.1. 사용자 인터페이스 양식 작성

(Writing a form’s user interface)

피자주문 양식을 만든다.

+ 어떤 양식이든 `<form>` 요소로 시작하고, 안에 컨트롤을 배치한다.  
+ 대분분의 컨트롤은 기본적으로 한 줄짜리 텍스트 필드를 제공하는 `<input>` 요소로 표현된다.  
+ 컨트롤에 라벨을 붙이는데 `<label>`요소가 사용된다. 레이블 텍스트와 컨트롤은 label요소 안에 있다.  
+ 양식 안의 각 영역은 일반적으로 `<div>`요소로 표현한다. 이를 종합하면 고객의 이름을 묻는 방법은 다음과 같다. 

```html
<form>
  <div><label>Customer name: <input></label></div>
</form>
```

+ 사용자가 피자 크기를 선택하게 하려면 일련의 라디오 버튼을 사용할 수 있다. 라디오 버튼은 `<input>`요소를 사용하는데 `type`속성의 값은 `radio`이다.
+ 라디오 버튼이 하나의 그룹으로 작동하게 하려면 `name`속성을 사용해 같은 이름을 지정한다.
+ 이때, 라디오 버튼과 같은 컨트롤을 그룹화하려면 `<fieldset>`요소를 사용할 수 있다.
+ 컨트롤 그룹의 제목은 필드 집합의 첫번째 요소여야하면, `<label>`요소를 사용한다.
+ 토핑을 선택하려면 체크 박스를 사용할 수 있다. `type`속성의 값이 `checkbox`인 `<input>` 요소를 사용한다.

```html
<form>
  <div><label>Customer name: <input></label></div>
  <fieldset>
    <legend> Pizza Size </legend>
    <div><label> <input type=radio name=size> Small </label></div>
    <div><label> <input type=radio name=size> Medium </label></div>
    <div><label> <input type=radio name=size> Large </label></div>
  </fieldset>
  <fieldset>
    <legend> Pizza Toppings </legend>
    <div><label> <input type=checkbox> Bacon </label></div>
    <div><label> <input type=checkbox> Extra Cheese </label></div>
    <div><label> <input type=checkbox> Onion </label></div>
    <div><label> <input type=checkbox> Mushroom </label></div>
  </fieldset>
</form>
```

+ 주문 실수를 할 경우 고객에게 연락할 수 있는 방법이 필요하므로, `type`속성이 `tel`, `email`로 설정된 `<input>`요소를 각각 전화번호와 전자 메일 주소에 대한 양식 컨트롤로 사용할 수 있다.
+ `type` 속성의 값이 `time`으로 설정된 `<input>`요소를 사용해 배달 시간을 요청할 수 있다.  
이러한 양식 컨트롤은 대부분 어떤 값을 지정할 수 있는지 정확하게 제어할 수 있는 특성이 있다. 이 경우에는 `min`, `man`, `step`속성이 특히 유용하며, 이는  최소시간, 최대시간 그리고 허용되는 값(초) 사이의 간격를 설정한다.  
이 피자 집은 오전 11시부터 오후 9시까지만 배달하며, 15분 초과되는 것은 약속하지 않는다.
+ `<textarea>` 요소는 자유 형식의 텍스트 필드를 제공하는데 사용할 수 있다. 이 예에서 우리는 고객에게 배송지시를 입력할 수 있는 공간으로 제공하기 위해 사용할 것이다.
+ 마지막으로, `<button>`요소를 사용해 양식을 제출할 수 있도록 만든다.

```html
<form>
  <div><label>Customer name: <input></label></div>
  <div><label>Telephone: <input type=tel></label></div>
  <div><label>E-mail address: <input type=email></label></div>
  <fieldset>
    <legend> Pizza Size </legend>
    <div><label> <input type=radio name=size> Small </label></div>
    <div><label> <input type=radio name=size> Medium </label></div>
    <div><label> <input type=radio name=size> Large </label></div>
  </fieldset>
  <fieldset>
    <legend> Pizza Toppings </legend>
    <div><label> <input type=checkbox> Bacon </label></div>
    <div><label> <input type=checkbox> Extra Cheese </label></div>
    <div><label> <input type=checkbox> Onion </label></div>
    <div><label> <input type=checkbox> Mushroom </label></div>
  </fieldset>
  <div><label>Preferred delivery time: <input type=time min="11:00" max="21:00" step="900"></label></div>
  <div><label>Delivery instructions: <textarea></textarea></label></div>
  <div><button>Submit order</button></div>
</form>
```

### 1.2 양식에 대한 서버 측 처리 구현

(Implementing the server-side processing for a form)

서버 측 프로세서를 작성하는 정확한 세부사항은 이 규격의 범위를 벗어난다.  
이 도입부에서는 'https://pizza.example.com/order.cgi'의 스크립트가 'application/x-www-form-urlencoded' 형식을 사용하여 제출을 허용하도록 구성되어 있으며, 다음과 매개변수가 HTTP POST body로 보내질 거라고 가정한다.

+ **custname** : 고객 이름
+ **custtel** : 고객 전화번호
+ **custemail** : 고객 이메일
+ **size** : 피자 사이즈(small, medium, large)
+ **topping** : 각 선택된 토핑에 대해 하나번씩 지정된 토핑으로, 허용되는 값은 bacon, cheese, onion, mushroom이다.
+ **delivery** : 요청된 배달 시간
+ **comments** : 배송 지시

### 1.3. 서버와 소통하기 위한 양식 구성

(Configuring a form to communicate with a server)

+ 양식 제출은 다양한 방식(주로 HTTP GET 또는 POST 요청)으로 서버에 보여진다.  
사용할 방법을 정확하게 지정하기 위해 `<form>`요소에 `method`속성을 지정한다.
그러나 양식 데이터가 어떻게 인코딩되는지는 지정하지 않는다. 
+ 양식 데이터가 어떻게 인코딩되는지 지정하기 위해서는 `enctype` 속성을 사용한다.
+ 또한 `action`속성을 사용해 제출된 데이터를 처리할 서비스의 URL을 지정해야 한다.
+ 제출하려는 각 양식 컨트롤에, 제출된 데이터를 참조하는데 사용할 이름을 입력해야한다. 우리는 이미 라디오 버튼 그룹의 이름을 지정했다.; 같은 속성(name)은 제출 이름을 지정한다. 라디오 버튼은 `vaule`속성을 사용해 다른 값을 제공하여 제출시 서로 구별할 수 있다.
+ 여러 컨트롤은 같은 이름을 가질 수 있다. 예를들어 모든 체크박스에 같은 이름을 부여하고 서버는 라디오버튼처럼 어떤 값이 `value` 속성과 함께 고유한 값으로 주어지는지 확인하여 어떤 체크 박스가 선택되었는지를 구별한다.

```html
<form method="post"
      enctype="application/x-www-form-urlencoded"
      action="https://pizza.example.com/order.cgi">
  <p><label>Customer name: <input name="custname"></label></p>
  <p><label>Telephone: <input type=tel name="custtel"></label></p>
  <p><label>E-mail address: <input type=email name="custemail"></label></p>
  <fieldset>
  <legend> Pizza Size </legend>
  <p><label> <input type=radio name=size value="small"> Small </label></p>
  <p><label> <input type=radio name=size value="medium"> Medium </label></p>
  <p><label> <input type=radio name=size value="large"> Large </label></p>
  </fieldset>
  <fieldset>
  <legend> Pizza Toppings </legend>
  <p><label> <input type=checkbox name="topping" value="bacon"> Bacon </label></p>
  <p><label> <input type=checkbox name="topping" value="cheese"> Extra Cheese </label></p>
  <p><label> <input type=checkbox name="topping" value="onion"> Onion </label></p>
  <p><label> <input type=checkbox name="topping" value="mushroom"> Mushroom </label></p>
  </fieldset>
  <p><label>Preferred delivery time: <input type=time min="11:00" max="21:00" step="900" name="delivery"></label></p>
  <p><label>Delivery instructions: <textarea name="comments"></textarea></label></p>
  <p><button>Submit order</button></p>
</form>
```

> #### Note:  
> 속성의 값이 따옴표로 둘러싸여 있거나 아닌 것은 특별한 의미가 없다. 둘다 HTML에서 허용하는 표기법이다. 

예를 들어 고객이 다음과 같이 입력하면, 
+ 고객이름: 'Denise Lawrence'
+ 전화번호: 555-321-8642
+ 전자메일 주소: (공란)
+ 피자 사이즈: medium
+ 피자 토핑: Extra Cheese, Mushroom
+ 배달 시간: 오후 7시
+ 배달 지시: (공란)

사용자 에이전트는 다음을 온라인 웹 서비스에 제출한다.

```
custname=Denise+Lawrence&custtel=555-321-8642&custemail=&size=medium&topping=cheese&topping=mushroom&delivery=19%3A00&comments=
```

### 1.4. 클라이언트 측 양식 유효성 검사

(Client-side form validation)

사용자의 입력을 사용자 에이전트가 양식 제출 전에 확인하는 방법으로 양식에 주석을 달 수 있다.  
서버는 여전히 입력이 유효한지 확인해야만하지만, (적대적인 사용자는 양식 유효성 검사를 쉽게 건너 뛸 수 있기 때문에) 서버를 사용자의 입력의 유일한 검사기로 사용함으로써 발생하는 대기를 (이와같은 클라이언트 단의 유효성 검사를 제공함으로써) 피할 수 있다.

+ 가장 간단한 주석은(annotation)은 `required` 속성이며, 값이 주어질때까지 양식이 제출되지 않는다고 알리기 위해 `<input>`요소에 지정할 수 있다.
+ 이 속성을 고객 이름, 피자 크기, 배달 시간 필드에 추가해 사용자가 해당 필드를 채우지 않고 양식을 제출할 때 사용자에게 알림을 보낼 수 있다.
+  `maxlength` 속성을 사용해, 입력 길이를 제한할 수도 있는데, `<textarea>`요소에 이를 추가한다. 사용자가 거대한 에세이를 쓰지 않도록 1000자로 제한하여 중요한 포인트에 집중할 수 있도록 한다.

```html
<form method="post"
      enctype="application/x-www-form-urlencoded"
      action="https://pizza.example.com/order.cgi">
  <p><label>Customer name: <input name="custname" required></label></p>
  <p><label>Telephone: <input type=tel name="custtel"></label></p>
  <p><label>E-mail address: <input type=email name="custemail"></label></p>
  <fieldset>
    <legend> Pizza Size </legend>
    <p><label> <input type=radio name=size required value="small"> Small </label></p>
    <p><label> <input type=radio name=size required value="medium"> Medium </label></p>
    <p><label> <input type=radio name=size required value="large"> Large </label></p>
  </fieldset>
  <fieldset>
    <legend> Pizza Toppings </legend>
    <p><label> <input type=checkbox name="topping" value="bacon"> Bacon </label></p>
    <p><label> <input type=checkbox name="topping" value="cheese"> Extra Cheese </label></p>
    <p><label> <input type=checkbox name="topping" value="onion"> Onion </label></p>
    <p><label> <input type=checkbox name="topping" value="mushroom"> Mushroom </label></p>
  </fieldset>
  <p><label>Preferred delivery time: <input type=time min="11:00" max="21:00" step="900" name="delivery" required></label></p>
  <p><label>Delivery instructions: <textarea name="comments" maxlength=1000></textarea></label></p>
  <p><button>Submit order</button></p>
</form>
```

> #### Note:  
> 양식이 제출되면, `invalid` 이벤트가 각 유효하지 않은 양식 컨트롤에서 발생하고, `<form>`요소 자체에서 발생한다. 이는 일반적으로 브라우저 자체에서 한번에 한 문제만 보고하기 때문에 양식 문제점의 요약을 표시할 때 유용하다. 

### 1.5. 클라이언트 측 양식 컨트롤 자동 채우기 활성화

(Enabling client-side automatic filling of form controls)

+ 일부 브라우저는 사용자가 매번 자신의 정보를 다시 입력하지않도록 양식 컨트롤을 자동으로 채워 사용자를 돕기 위해 시도한다. 예를 들어 사용자의 전화번호를 묻는 필드는 자동으로 사용자의 전화번호로 채워질 수 있다. 
+ 사용자 에이전트를 돕기위해 `autocomplete` 속성을 사용하여 필드의 용도를 설명할 수 있다.
+ 아래 양식의 경우 이 방법으로 유용하게 주석을 달 수 있는 3개의 필드가 있다. : 피자를 배달받을 사람에 대한 정보, 이 정보는 다음과 같이 추가할 수 있다. 

```html
<form method="post"
      enctype="application/x-www-form-urlencoded"
      action="https://pizza.example.com/order.cgi">
  <p><label>Customer name: <input name="custname" required autocomplete="shipping name"></label></p>
  <p><label>Telephone: <input type=tel name="custtel" autocomplete="shipping tel"></label></p>
  <p><label>E-mail address: <input type=email name="custemail" autocomplete="shipping email"></label></p>
  <!-- 생략... -->
</form>
```

### 1.6. 필드 유형, 자동 채우기 필드 이름, 입력 양식간의 차이점

(The difference between the field type, the autofill field name, and the input modality)

`type`과 `autocomplete` 속성은 혼동을 일으킬 정도로 유사해 보일 수 있다.  
예를 들어 세가지 경우 모두 `email` 문자열이 유효한 값이다.

+ `<input>`요소의 `type`속성은 사용자 에이전트가 필드에 노출하는데 사용할 컨트롤의 종류를 결정한다. 이 속성의 다른 값을 선택하는 것은 `<input>`요소, `<textarea>`, `<select>` 요소 등을 사용할지 말지 선택하는 것과 같은 것이다.
+ 대조적으로 `autocomplete` 속성은 사용자가 실제로 입력하는 값이 무엇을 나타내는 지 설명한다. 이 속성의 다른 값을 선택하는 것은 요소의 레이블을 선택하는 것과 같은 선택이다.

우선, 전화번호를 생각해보자. 페이지에서 사용자에게 전화번호를 요청할 경우 올바른 양식 컨트롤은 `<input=tel>`이다. 그러나 어떤 `autocomplete`값을 사용할 지는 페이지에서 요청하는 전화 번호에 따라 다르다. 국제 형식으로 된 전화번호를 사용할지, 아니면 지역 형식으로 사용할 지 등

예를 들어, 친구에게 보낼 선물을 구매하는 고객을 위한 전자 상거래 사이트의 체크아웃 프로세스의 일부를 형성하는 페이지는 (결제 문제의 경우)구매자의 전화번호와 (배달 문제의 경우)친구의 전화번호 모두 필요할 수 있다.  
사이트에서 국제 전화 번호(국가 코드 접두사를 포함한)를 바라는 경우, 다음과 같이 쓸 수 있다.
```html
<div><label>Your phone number: <input type=tel name=custtel autocomplete="billing tel"></label>
<div><label>Recipient’s phone number: <input type=tel name=shiptel autocomplete="shipping tel"></label>
<p>Please enter complete phone numbers including the country code prefix, as in "+1 555 123 4567".
```

그러나 사이트가 영국 고객 및 수신자만 지원하는 경우에는 다음과 같이 보일 수 있다.(`tel` 이 아닌 `tel-national`사용에 주의하라)

```html
<div><label>Your phone number: <input type=tel name=custtel autocomplete="billing tel-national"></label>
<div><label>Recipient’s phone number: <input type=tel name=shiptel autocomplete="shipping tel-national"></label>
<p>Please enter complete UK phone numbers, as in "(01632) 960 123".
```

이제 사람이 선호하는 언어를 생각해보자.  
올바른 `autocomplete` 값은 언어이다.  
하지만 그 목적에 따라 사용되는 양식 컨트롤은 다양한 형태일 수 있다. 자유 텍스트 필드(`<input type="text">`), 드롭 다운 목록(`<select>`), 라디오 버튼(`<input type=redio>`) 등  
어떤 종류의 인터페이스가 필요한지에 달려 있다. 

### 1.7. 일자, 시간, 숫자 형식

(Date, time, and number formats)

<추가 예정>

---

+ [HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP)
+ [Sending and retrieving form data](https://developer.mozilla.org/ko/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data)
+ [cgi](https://ko.wikipedia.org/wiki/%EA%B3%B5%EC%9A%A9_%EA%B2%8C%EC%9D%B4%ED%8A%B8%EC%9B%A8%EC%9D%B4_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4)