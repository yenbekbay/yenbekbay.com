title: Как автоматизировать отправку iOS приложения в App Store
date: 2015-10-27 13:03:33
tags:
- iOS
- automatization
permalink: ios-deployment-automatization
---

Примерно полтора месяца назад я начал автоматизировать процесс добавления метаданных, создания скриншотов и отправки билдов моих приложений в App Store. Я очень люблю все автоматизировать, и как только я обнаружил способ проделать это с мучительным процессом подготовки приложения к деплоингу, я очень обрадовался. В этом посте я попробую рассказать, как провести такую автоматизацию с помощью *[fastlane](https://github.com/fastlane/fastlane)*.

<!-- more -->

Во-первых, конечно же установите *[fastlane](https://github.com/fastlane/fastlane)* на ваш компьютер. В репозитории есть более подробная инструкция, но по сути это всего лишь одна команда: ```bash
$ sudo gem install fastlane
```
Если возникнут какие-либо ошибки, проверьте, что у вас установлена последняя версия Xcode command line tools:
```bash
$ xcode-select --install
```

Далее просто запустите настройку *fastlane* в папке вашего проекта с помощью `fastlane init` и проследуйте простой инструкции. После этого в директории вашего проекта должна появиться папка `fastlane` с выбранными вами при настройке файлами.

Вот так выглядит, например, мой `Fastfile` для *[Сеансов](http://seansy.kz/)*:
```ruby
update_fastlane
default_platform :iOS

platform :iOS do
  before_all do
    cocoapods
  end

  desc "Build and sign the app"
  lane :build do |options|
    sigh(
      force: true,
      output_path: "./fastlane/profiles"
    )
    gym(scheme: "Seansy")
    crashlytics(
      api_token: API_TOKEN,
      build_secret: BUILD_SECRET
    )
  end

  desc "Submit a new version to the App Store"
  desc "This will do the following: "
  desc "- Make sure the profiles are up to date and download the latest one"
  desc "- Create new screenshots and store them in `./fastlane/screenshots`"
  desc "- Upload screenshots + app metadata"
  desc "- Build, sign and upload the app"
  desc "This will **not** submit the app for review."
  lane :appstore do
    build
    pilot(
      skip_submission: true
    )
    deliver(
      force: true
    )
    commit_version_bump(
      message: 'Version Bump by fastlane',
      force: true
    )
    push_to_git_remote
  end

  after_all do |lane|
    say "Successfully finished deployment (#{lane})!"
    clean_build_artifacts(
      exclude_pattern: ".*\.mobileprovision"
    )
  end
end
```
Это достаточно простая конфигурация, многие части из которой я одолжил из примеров, которые предоставляются в репозитории *fastlane*. Запуская `fastlane build` в папке проекта, например, я могу создать билд с правильным профилем и автоматически отправить его в Crashlytics. Чтобы создать билд для тестирования нужно только указать `development: true` для команды `sigh`. Выглядеть это будет так:
```ruby
sigh(
  development: true,
  force: true,
  output_path: "./fastlane/profiles"
)
```

Запуская же команду `fastlane appstore`, билд не только создастся, но и будет загружен в iTunes Connect вместе с метаданными из `Deliverfile`.

Скриншоты я предпочитаю загружать вручную, вкладывая их в рамки с помощью специального шаблона на *[Sketch](https://www.sketchapp.com/)*. Этот шаблон я написал, основываясь на *[SketchToAppstore](https://github.com/LaunchKit/SketchToAppStore)* от *LaunchKit*. Скачать мой шаблон можете [отсюда](https://dl.dropboxusercontent.com/u/32443787/screenshots.sketch). Чтобы его использовать вам необходимо в первую очередь создать сами скриншоты через *[snapshot](https://github.com/fastlane/snapshot)*, а затем вставить их в соответствующие области, при необходимости изменив фон и надписи.

Однако если вы хотите обойтись без *Sketch*-a, вы можете просто использовать *[frameit](https://github.com/fastlane/frameit)* от того же *fastlane*. Таким образом, конечно, вы получаете меньше контроля, но это намного быстрее, и, наверно, в большинстве случаев должно принести довольно приличные результаты.

Для автоматического создания сертификатов для пуш оповещений вы можете настроить для себя команду *push*. Например, вот так:
```ruby
desc "Creates a new push certificate, ready to be uploaded to parse"
  lane :push do
    pem(generate_p12: true)
    puts "------------------ Please upload the .p12 file to parse.com ------------------ ".yellow
  end
```
Вызвать еe можно просто через `fastlane push`.

И последнее, совсем недавно появилась еще одна классная штука от *fastlane* [для юнит-тестирования](https://github.com/fastlane/scan). Очень рекомендую.

С другими инструментами *fastlane* вы можете ознакомиться на [официальном сайте](https://fastlane.tools/) или же в [репозитории на *Гитхабе*](https://github.com/fastlane/fastlane).
