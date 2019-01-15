## Peer dependency

출처: https://stackoverflow.com/questions/26737819/why-use-peer-dependencies-in-npm-for-plugins

: peerDependencies는 공개되지 않는 "private" 의존성과 달리 소비 코드에 노출되어 (사용되는 것으로 예상되는) 의존성을 의미하며, 구현의 세부 사항 일뿐이다.

### peer depnedencies가 해결할 수 있는 문제

npm 모듈은 시스템 계층적이다. 단순한 시나리오의 큰 장점 중 하나는 npm 패키지를 설치할 때 해당 패키지가 자체 의존성을 가져와서 즉시 작동할 수 있다는 것이다.

- 프로젝트와 사용중인 일부 모듈이 동일한 다른 모듈에 의존하고 있다.
- 이 세 개의 모듈은 서로 상호적이어야 한다.

예를 들어, `YourCoolProject`를 만들고 있고 `JacksModule 1.0`과 `JillsModule 2.0`을 사용하고 있다고 가정해 보자. 그리고 `JacksModule`도 `JillsModule`에 의존하지만 `1.0`이라는 다른 버전이라고 가정하자. 그 두 버전이 마주치지 않는 이상, 문제는 없다. `JacksModule`이 표면 아래에 `JillsModule`을 사용하고 있다는 사실은 단지 실행의 세부사항일 뿐이다. 우리는 `JillsModule`을 두 번 bundling하고 있지만, 우리가 안정적인 소프트웨어를 얻는 것에 비하면 비용이 적다.

하지만 이제 어떤 식으로든 `JillsModule`에 대한 `JacksModule`의 의존이 노출되어야 한다고 가정해보자. `JillsClass`의 객체 인스턴스(예: 라이브러리의 버전 2.0을 사용하여 새로운 `JillsClass`만들고 이를 `jacksFunction`에 전달하면 어떻게 될까? `JillsObject`가 실제로 또 다른 `JillsClass` `2.0` 버전의 인스턴스이기 때문에 `JillsObject instanceof JillsClass`와 같은 단순한 것들이 갑자기 `false`를 반환한다.

### peer dependencies가 이 문제를 어떻게 해결하는가

> 이 패키지가 필요하지만, 내 모듈에 대한 어떤 private한 버전이 아닌 프로젝트의 일부분이 필요하다.

npm이 패키지 의존성이 없거나 호환되지 않는 버전의 프로젝트에 설치되고 있는 것을 발견하면 설치 프로세스 중에 사용자에게 경고를 보내게 된다.

### peer depnedencies를 사용하는 경우

- 다른 프로젝트에서 사용할 라이브러리를 빌드 하며, 이 라이브러리가 다른 라이브러리를 사용하고 있을 때
- 사용자가 다른 라이브러리에서도 작업 할 것으로 예상하거나 필요할 때

---

- [Domenic's blog: Peer Dependencies](https://blog.domenic.me/peer-dependencies/)
