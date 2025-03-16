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