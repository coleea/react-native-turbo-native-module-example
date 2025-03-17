# React Native With Turbo Native Module

이 프로젝트는 React Native 0.76에 추가된 `Turbo Native Module`의 간단한 예제를 소개한다

`Turbo Native Module`은 앱이 필요할 때만 네이티브 기능을 로드하는 시스템으로서 사용되지 않는 모듈은 메모리에 로드되지 않는 레이지(Lazy) 기능 덕분에 앱 런칭 시간을 줄이고 메모리 공간을 확보하는 데 도움이 된다

```js
// Turbo Modules 방식
// 실제 사용 시점에만 네이티브 구현이 로드됨
import {NativeModules} from 'react-native';

// 카메라 기능이 필요할 때만 로드
function openCamera() {
  // 이 시점에 카메라 모듈 로드됨
  const {CameraModule} = NativeModules;
  CameraModule.open();
}

// 위치 기능이 필요할 때만 로드
function getCurrentLocation() {
  // 이 시점에 위치 모듈 로드됨
  const {LocationModule} = NativeModules;
  return LocationModule.getCurrentPosition();
}
```

본 프로젝트는 android의 네이티브 모듈인 SharedPreferences를 사용한다. ios코드는 작성되어 있지 않다.

참고 : https://reactnative.dev/docs/turbo-native-modules-introduction

## 실행방법 (win 11 환경)

안드로이드 스튜디오와 Java JDK를 설치한다. powershell을 오픈하여 아래 명령어를 입력한다. `winget`이 설치되어 있지 않다면 [여기](https://learn.microsoft.com/en-us/windows/package-manager/winget/) 튜토리얼을 참고한다. `winget`은 MacOS의 `homebrew`와 유사한 패키지 매니저이며 본 프로젝트가 아니더라도 유용하게 사용할 수 있다.

```
winget install -e --id Google.AndroidStudio
winget install Oracle.JDK.17
```

Windows 11 환경변수를 등록한다. 환경변수 등록은 키보드의 `Win + Pause` 키를 입력 -> `시스템 정보`가 오픈되고 화면에서  `고급 시스템 설정`을 클릭 -> `시스템 속성`이 오픈되고 하단의 `환경변수` 버튼을 클릭한다

환경변수에 `JAVA_HOME`을 생성하고 설치된 JDK 경로를 입력한다 (예 : `C:\Program Files\Java\jdk-17`)

- 안드로이드 에뮬레이터를 환경변수 Path에 등록한다

  예 : `C:\Users\{USER_NAME}\AppData\Local\Android\Sdk\emulator`

- 안드로이드 디버깅 툴인 `adb`를 환경변수 Path에 등록한다

  예 : `C:\Users\{USER_NAME}\AppData\Local\Android\Sdk\platform-tools`

- 프로젝트의 `.\android\app\gradle.properties`파일에서 `android.ndkPath`변수의 값을 NDK 설치경로에 맞게 변경한다


위의 작업 완료후 아래와 같이 `gradlew`(Gradle Wrapper)를 이용하여 빌드한다. 아래 명령어는 React Native Codegen 도구를 이용하여 안드로이드의 네이티브 함수에 접근할 수 있는 javascript 인터페이스를 생성한다. codegen에 대한 자세한 설명은 [여기](https://reactnative.dev/docs/the-new-architecture/using-codegen)를 참조할 것

```
cd android
./gradlew generateCodegenArtifactsFromSchema
```
\
안드로이드 에뮬레이터를 실행한다. 기기명은 각자의 기기에 맞게 수정한다

```
emulator -avd {여기에_기기명을_입력}
```
\
PowerShell을 하나 더 오픈하여 안드로이드 앱을 런치한다

```
npm run android
```

정상적으로 실행된다면 아래 내용은 무시해도 좋다

## 트러블슈팅 

안드로이드를 실행하면 곧바로 튕길 수 있다. 에러를 잡기 위해 별도의 powershell을 띄워놓고 아래 명령어를 입력한다. `adb`는 `Android Debug Bridge`의 약자로서 안드로이드 공식 디버거이며 아래 명령어는 Exception,Error,Fatal중에서 한가지 키워드가 감지될 때 커맨드라인에 해당 에러를 표시한다. adb는 디버깅용도로 흔하게 사용되기 때문에 사용법을 익혀두는 것이 도움이 된다

```powershell
# powershell 기준
adb logcat | Select-String -Pattern "Exception|Error|Fatal"
```


### 오류 : MainActivity.kt 파일이 없는 경우

공식 튜토리얼 대로 따라한다면 실행 즉시 튕길 것이다. 이유는 `MainActivity.kt` 파일이 없기 때문인데, 이는 react-native 공식 튜토리얼에 누락된 파일이지만 반드시 필요하니 아래의 코드를  `android\app\src\main\java\com\nativelocalstorage`경로에 생성한다

```kotlin
package com.inappmodule

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "nativelocalstorage"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}

```

### 오류 : libreact_featureflagsjni.so 파일을 찾을 수 없는 경우

libreact_featureflagsjni.so 파일을 찾을 수 없는 경우에도 실행 즉시 튕긴다. 이 경우 `adb`로 아래와 같은 에러를 발견할 수 있다.

```
03-16 12:49:58.102  6943  6943 E AndroidRuntime: FATAL EXCEPTION: main
03-16 12:49:58.102  6943  6943 E AndroidRuntime: java.lang.UnsatisfiedLinkError: dlopen failed: library "libreact_featureflagsjni.so" not found
```

위의 에러 해결방법

1. MainApplication.kt 파일에 아래 헤더를 추가한다

`import com.facebook.react.soloader.OpenSourceMergedSoMapping`

1. 또한 onCreate Function을 아래와 같이 수정한다. `SoLoader.init`의 두번째 인자를 false에서 OpenSourceMergedSoMapping로 변경하였다. 이것으로 so파일이 정상 로딩될 것이다.
  
```kotlin
 override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }
```

출처 : https://stackoverflow.com/questions/79212430/java-lang-unsatisfiedlinkerror-dlopen-failed-library-libreact-featureflagsjni



성공하면 안드로이드 에뮬레이터에 아래와 같은 화면이 표시된다

![alt text](.\images\screenshot.png)