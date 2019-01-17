# GraphQL

- [graphql.org](https://graphql.org/)
- [graphql-kr](https://graphql-kr.github.io/)

페이스북에서 _REST API의 대안_ 으로 개발하고 오픈 소스로 공개한 프로젝트

- 모바일 사용 증가로 효율적인 데이터 로드가 필요하다.
- 다양한 프레임 워크, 플랫폼에서 요구하는 모든 사항에 적합한 하나의 API을 작성하고 유지관리하기 어렵다.
- 새로운 데이터 요구 사항을 고려해 설계를 변경하고 서버에서 추가 작업이 필요한 기존의 방식으로는 빠르고 빈번한 클라이언트 측의 특정 요구 사항에 맞춰 빠르게 대응하기 어렵다.

API를 위한 쿼리 언어(질의어)  
타입 시스템을 사용해 쿼리를 실행하는 서버사이드 런타임

- 클라이언트가 API로부터 필요한 데이터를 지정해서 **선언적으로 가져올 수 있다.**
- GraphQL 서버는 고정된 데이터로 응답하는 여러 endpoint 대신 하나의 endpoint만 노출하고 클라이언트가 요청한 데이터로 정확히 응답한다.

GraphQL 서비스는 타입과 필드를 정의하고, 각 타입의 필드에 대한 함수로 구현된다.

```graphql
# 타입 정의
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

```js
// 각 타입의 필드에 대한 함수를 작성
function Query_me(request) {
  return request.auth.user;
}
function User_name(user) {
  return user.getName();
}
```

쿼리, 다음을 전송하면

```
{
  me {
    name
  }
}
```

다음과 같은 JSON을 얻게 된다.

```JSON
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

## Query & Mutation

- Query는 데이터를 가져온다.
- Mutation은 데이터를 수정하거나 쓰는 역할을 담당한다.

## Fields

GraphQL은 객체에 대한 특정 필드를 요청하는 것이 굉장히 간단하다.

쿼리

```graphql
{
  hero {
    name
  }
}
```

데이터

```JSON
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

쿼리와 결과가 정확히 동일한 형태로, 항상 기대한 결과를 얻을 수 있다.

필드는 객체를 참조할 수도 있어, 해당 객체에 대한 하위 필드를 선택할 수도 있다.  
REST 구조에서 여러번의 요청을 수행하여 얻었던 연관된 객체와 필드 탐색을 한 번의 요청으로 수행할 수 있다.

- [howtographql: REST와 GraphQL의 데이터 가져 오기
  ](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/)

```graphql
{
  hero {
    name
    # 쿼리에 주석도 가능하다
    friends {
      name
    }
  }
}
```

fiends 필드가 배열을 반환한다.

```JSON
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### Arguments

필드에 인자를 전달하는 기능을 추가할 수 있다.  
REST와 같은 시스템에서는 요청에 쿼리 파라미터와 URL 세그먼트 같은 단일 인자만 전달할 수 있지만, GraphQL에서는 모든 필드와 중첩된 객체가 인자를 가질 수 있다.  
필드에 인자를 전달하면 서버에서 데이터 변환을 한 번만 구현할 수도 있다.

```graphql
{
  human(id: "1000") {
    name
    # 열거형(Enumeration)
    height(unit: FOOT)
  }
}
```

```JSON
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

인자는 다양한 타입이 될 수 있다. GraphQL은 기본 타입과 함께 제공된다.
GraphQL 서버는 데이터를 직렬화 할 수 있는 한 직접 커스텀 타입을 선언할 수도 있다.

### Aliases

객체 필드가 쿼리의 필드 이름과 일치하지만 인자는 그렇지 않다.  
다른 인자를 사용하여 같은 필드를 직접 쿼리할 수는 없으므로 충돌하는 필드는 별칭을 통해 필드의 결과를 원하는 이름으로 바꿀 수 있다.

```graphql
# hero 필드를 서로 다른 이름의 별칭을 지정할 수 있다.
#  한 요청에서 두 결과를 얻을 수 있다.
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

```json
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

### Fragments

재사용 가능한 단위  
필드셋을 구성한 다음 필요한 쿼리에 포함시킬 수 있다.
상대적으로 복잡한 쿼리로 요청하는 데, 반복되는 경우에 사용할 수 있다.

```graphql
# friends를 가진 두 hero를 순서대로 요청해야 하는 경우
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

# 재사용 가능한 fragment
fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

```json
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": ["NEWHOPE", "EMPIRE", "JEDI"],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": ["NEWHOPE", "EMPIRE", "JEDI"],
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

#### Fragment 안에서 변수 사용

쿼리나 뮤테이션에 선언된 변수는 Fragment에 접근할 수 있다.

```graphql
# 변수 - $first
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

### Operation name

실제 애플리케이션에서는 query 이름을 잘 작성하는 것이 좋다.

- Operation type: query, mutation, subscription이 될 수 있으며, 어떤 작업의 타입인지 기술한다.
- Operation name: 의미있고 명시적은 작업의 이름이다. 디버깅이나 서버 측 로깅하는데 매우 유용할 수 있다.

```graphql
# query 키워드 query 이름
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```

### Variables

드롭다운, 검색필드, 필터 등 실제 애플리케이션에서는 필드에 대한 인자는 동적이다.  
GraphQL은 동적 값을 쿼리에서 없애고 변수를 통해 전달하는 방법을 제공한다.

1. 쿼리 안의 정적 값을 `$variableName`으로 변경한다
2. `$variableName`을 쿼리에서 받는 변수로 선언한다
3. 별도의 전송규약(일반적으로 JSON)변수에 `variableName: value`을 전달한다

클라이언트 코드에서 완전히 새로운 쿼리를 작성하지 않고 간단하게 다른 변수를 전달할 수 있다.

변수

```graphql
#  값을 주입할 때는 key: value(JSON) 방식으로 처리한다.
{
  "episode": "JEDI"
}
```

쿼리

```graphql
# 변수 정의                    $변수: 타입
# 선언된 모든 변수는 스칼라, 열거형, input object type이어야 한다.
# !(필수)가 없으면 변수 정의는 옵셔널이다.

# ($episode: Episode = 'JEDI') 와 같이 기본값을 할당할 수도 있다.
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

결과

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### Directives

변수를 사용해 쿼리의 구조와 형태를 동적으로 변경하는 방법이 필요할 때 사용한다.

필드나 프래그먼트 안에 삽입될 수 있다.  
서버가 원하는 방식으로 쿼리 실행에 영향을 줄 수 있다.

코어 GraphQL은 두가지 지시어가 포함되어 있고 GraphQL 서버에서 지원해야 한다.

- `@include(if: Boolean)`: 인자가 true 인 경우에만 이 필드를 결과에 포함한다
- `@skip(if: Boolean)`: 인자가 true 이면 이 필드를 건너뛴다.

변수

```graphql
{
  "episode": "JEDI",
  "withFriends": true # 이 값에 따라서 이 필드를 결과에 포함한다.
}
```

쿼리

```graphql
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

결과 - "withFriends"가 true이기 때문에 friends 필드가 결과에 포함이 되었다.

```json
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

---

- [howtographql: 쿼리로 데이터 가져 오기](https://www.howtographql.com/basics/2-core-concepts/)
- [한 단계씩 배워보는 graphql](https://engineering.huiseoul.com/%ED%95%9C-%EB%8B%A8%EA%B3%84%EC%94%A9-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EB%8A%94-graphql-421ed6215008)
- [가장 현대적인 웹을 만들자 3편 (GraphQL)](https://medium.com/@kiyeopyang/%EA%B0%80%EC%9E%A5-%ED%98%84%EB%8C%80%EC%A0%81%EC%9D%B8-%EC%9B%B9%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%9E%90-3%ED%8E%B8-graphql-cb69ce1a64b5)
- [APOLLO - graphql-tools](https://www.apollographql.com/docs/graphql-tools/generate-schema.html)
