# GraphQL

- over-fetching: 내가 요청한 것보다 많은 정보를 받는 것
```
/users/ GET
```
개발자가 어떤 정보를 원하는 지에 대해 통제할 수 있다.
- under-fetching: REST에서 하나를 완성하기 위해 많은 소스를 요청하게 되는 것
```
/feed/
/notifications/
/user/1
```  
한 query에 내가 정확하게 원하는 정보만 받을 수 있다.

GraphQL에서는 하나의 endpoint만 있다. URL 없음, 모든 것을 한 개의 query로 만들 수 있다.  

아래와 같은 query를 GraphQL에 보내면
```
{
  feed {
    comments
    likeNumber
  }
  notifications {
    isRead
  }
  user {
    username
    profilePic
  }
}
```
GraphQL 서버는 다음과 같은 자바스크립트 Object 형태로 정보를 보내준다.
```js
{
  feed: {
    {
      comments: 1,
      likeNumber: 20
    },
  },
  notifications: {
    {
      isRead: true
    },
    {
      isRead: false
    }
  },
  user: {
    username: "chiabi"
    profile: "http://"
  }
}
```

## schema

무엇을 받을 지, 무엇을 줄 지에 대한 설명 같은 것  
Query - Database로부터 정보를 얻는  것

서버에서 혹은 Database에서, 메모리에서 정보를 바꾸는 작업을 할 때 Mutation이라고 한다.  
Query는 정보를 받을 때 쓰이고, GraphQL은 이런 specification(자세한 설명)과 서버에 이러한 유형들을 정의해 놓고 있다.

GraphQL 서버에서 할 것은 어떤 Mutations 그리고 어떤 Query 들을 우리가 가졌는지 알려주는 것이다.

서버가 받아야 하므로 항상 POST로 보내야함



+ [GraphQL overview](https://www.slideshare.net/shadows0/graphql-overview)