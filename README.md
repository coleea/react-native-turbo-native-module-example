# React Native With Turbo Native Module

이 프로젝트는 React Native 0.76에 추가된 Turbo Native Module의 간단한 예제를 소개한다

본 프로젝트는 android의 네이티브 모듈인 SharedPreferences를 사용한다. ios코드는 작성되어 있지 않다.

참고 : https://reactnative.dev/docs/next/turbo-native-modules-introduction?android-language=kotlin

## 실행방법 (win 11 환경)

안드로이드 스튜디오와 JDK를 설치한다

```
winget install -e --id Google.AndroidStudio
winget install Oracle.JDK.17
```

`.\android\app\gradle.properties`에서 NDK 설치경로를 자신의 버전에 맞게 변경한다

아래와 같이 android경로에서 gradlew를 이용하여 빌드한다

```
cd android
./gradlew generateCodegenArtifactsFromSchema
```

안드로이드 에뮬레이터를 실행한다. 기기명은 각자의 기기에 맞게 수정한다

```
emulator -avd Medium_Phone_API_35
```

PowerShell을 하나 더 열어서 해당 프로젝트를 시동한다

```
npm run android
```

실행하면 곧바로 튕길텐데 에러를 잡기 위해 별도의 powershell을 띄워놓고 아래 명령어를 입력한다

```powershell
# powershell 기준
adb logcat | Select-String -Pattern "Exception|Error|Fatal"
```

하면 아래와 같은 에러가 포착될 것이다

```
03-16 12:49:58.102  6943  6943 E AndroidRuntime: FATAL EXCEPTION: main
03-16 12:49:58.102  6943  6943 E AndroidRuntime: java.lang.UnsatisfiedLinkError: dlopen failed: library "libreact_featureflagsjni.so" not found
```

위의 에러 해결방법

1. MainApplication.kt 파일에 아래 헤더를 추가한다

`import com.facebook.react.soloader.OpenSourceMergedSoMapping`

2. 또한 onCreate Function을 아래와 같이 수정한다

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

위와 같이 처리해도 실행 즉시 튕길 것이다. 이유는 MainActivity.kt 파일이 없기 때문인데, 이는 react-native 공식 홈페이지에 누락된 내용이지만 `MainActivity.kt`는 반드시 필요하니 아래의 코드를 `MainActivity.kt` 파일명으로 생성한다

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

성공하면 아래와 같은 화면이 표시될 것이다

![alt text](.\images\screenshot.png)