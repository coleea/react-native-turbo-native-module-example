# New Architecture

![](/images/old-arch.webp)
< Old Archtecture >

![](/images/new-arch.webp)
< New Architecture >

출처 : [Sanjana Human의 블로그](https://sanjanahumanintech.medium.com/react-native-new-fabric-architecture-introduced-4f208c256d67)

--- 

간단 설명 : https://www.youtube.com/live/0ckOUBiuxVY?feature=shared&t=3117

핵심을 요약하면 다음과 같다. 기존의 Old Architecture에서 JS와 네이티브간의 통신은 JSON을 직렬화, 역직렬화 하는 `메시지 패싱` 방식을 사용하였다. `메시지 패싱`을 사용한 이유는 JS와 네이티브 간에 메모리 공유가 되지 않았기 때문이고 이는 명백히 오버헤드를 가져왔으며 새로운 아키텍처는 이러한 오버헤드의 제거를 목표로 한다. 

이것을 가능하게 하는 방법은 JS와 네이티브 간에 메모리를 공유하는 것인데 이를 가능하게 하는 기술을 JSI(Javascript Interface)라고 한다.

![](./images/jsi.png)

출처 : React Native Connection 2024 - Tomasz Zawadzki - New Architecture is here
 (https://www.youtube.com/watch?v=jf0WTF4z8O0)

결국 JS와 네이티브간에 공유되는 메모리는 C++기반의 JSI 코드이며 이전의 Bridge대비 오버헤드는 훨씬 줄어들었지만 오버헤드가 0은 아니다. 그러므로 JSI 호출을 줄이는 것이 퍼포먼스에 도움이 된다.

아래는 C++로 작성된 JSI의 코드이다

![](./images/jsi2.png)
출처 : https://www.youtube.com/watch?v=jf0WTF4z8O0

JS에서 안드로이드의 네이티브 함수를 호출하는 시나리오를 가정해보자. JS에서 JSI를 호출하고, 그 JSI내부에서 JNI(Java Native Interface)를 경유하여 안드로이드 네이티브 SDK를 호출한다. 이 모든 과정은 동기적으로 일어난다. 즉 비동기 기반의 Old Architecture에서는 작업이 완료되면 테스트가 이벤트루프의 큐(Queue)에 등록이 되어서 즉각적으로 실행되지 않을 때도 있었지만 동기 방식은 큐(Queue) 대기열에서 기다릴 필요가 없어 즉각 실행된다.

---

## 핵심개념 : Fabric

JSI외에 `New Architecture`의 근간을 이루는 기술에는 `Fabric`이 있다

JS와 네이티브 간에 메모리가 공유되었으므로 JS와 네이티브가 같은 UI 정보를 공유할 수 있다. 이 점을 이용한 렌더링 기술을 `Fabric`이라고 한다. 즉 `Fabric`덕분에 렌더링 퍼포먼스가 더욱 빨라졌고 이로 인해 더 높은 FPS가 보장된다 

## 핵심개념 : Yoga

화면상에서 컴포넌트의 위치와 크기를 계산하는 엔진이다.

- CSS Flexbox와 같은 레이아웃 시스템으로 UI 배치 담당
- 다양한 화면 크기에서 동일하게 보이도록 요소 배치
- React Native의 크로스 플랫폼 레이아웃 일관성 제공
- C/C++으로 작성되어 성능이 최적화됨


## 핵심개념 : Static Hermes

Static Hermes는 `New Architecture`에 속하는 개념은 아니지만 매우 중요한 개념이라 소개한다. 

Static Hermes는 더 빠른 실행속도를 목표로 고안된 JS엔진이며 빌드 타임에 자바스크립트 코드를 네이티브 코드로 컴파일한다. 즉 디바이스가 해당 코드를 즉시 실행할 수 있기 때문에 Hermes나 V8같은 JS 런타임이 필요 없어진다.

Static Hermes의 상세 내용에 대해서는 [여기](https://www.youtube.com/watch?v=GUM64b-gAGg) 를 참조할 것