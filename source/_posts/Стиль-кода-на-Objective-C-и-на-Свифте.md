title: Стиль кода на Objective-C и на Свифте
date: 2015-11-15 01:01:29
tags: iOS
permalink: objective-c-and-swift-style
---

### Objective-C

Для меня оформление кода всегда было очень важной составляющей изучения новых языков программирования. За все небольшое время, что я работал с Objective-C мой стиль претерпел очень большие изменения, и, конечно, будучи по жизни большим педантом я каждый раз переписывал все свои проекты, чтобы они соответствовали моим новым стандартам. И вот наконец, как мне кажется, я достиг определенной точки и уже какое-то время следую одному стилю.

<!-- more -->

Если говорить именно о моем стиле, то он мало чем отличается от гидов *[Ray Wenderlich](https://github.com/raywenderlich/objective-c-style-guide)*, *[Futurice](https://github.com/futurice/ios-good-practices)*, *[NYTimes](https://github.com/NYTimes/objective-c-style-guide)* и других, в то же время вбирая в себя что-то у каждого из них. Единственное на что я хочу обратить внимание, -- укажите *Indentation* в настройках Xcode и в самих проектах на два пробела. Это сделает ваш код намного более компактным и читабельным.

Что касается форматирования, чтобы облегчить себе жизнь я составил для себя форматтер на *[uncrustify](http://uncrustify.sourceforge.net/)* с помощью *[UncrustifyX](https://github.com/ryanmaxwell/UncrustifyX)* и использую [плагин для *Xcode*](https://github.com/benoitsan/BBUncrustifyPlugin-Xcode) для автоматического форматирования при сохранении файлов. А вот собственно мой [файл конфигурации форматтера](https://dl.dropboxusercontent.com/u/32443787/uncrustify.cfg), если вам нужен пример.

Единственная проблема *uncrustify* в том, что он не может автоматически разрывать строки -- а мне это нужно, потому что я не выхожу за максимальную длину строки, которую я поставил в 120 колонок. Поэтому приходится вручную делать переносы, и для этого я себе тоже составил определенные стандарты.

Конструкторы я стараюсь записывать разделяя элементы попарно на отдельных строках. Например, для CGRect - это позиция и размер:
```objc
self.label.frame = CGRectMake(padding.left, padding.top,
                              self.view.width - padding.left - padding.right, labelHeight);
```

Если же, например, один из элементов конструктора не вмещается в строку, то лучше взять его в скобку и перенести вот так:
```objc
self.scrollView.contentOffset = CGPointMake(0, (self.scrollView.contentOffset.y +
                                                navigationBarHeight));
```

Значения отдельных ключей в словарях (NSDictionary), конечно, легче всего просто присваивать на отдельных строках:
```objc
[[NSMutableAttributedString alloc] initWithString:@"Some string" attributes:@{
  NSForegroundColorAttributeName : [UIColor whiteColor],
  NSFontAttributeName : [UIFont systemFontOfSize:[UIFont systemFontSize]]
}];
```

Таких примеров много, и каждый, конечно, для себя сам решает, как ему удобнее.

### Swift

Со свифтом у меня еще опыта мало, но я сразу же постарался определить для себя единый стиль и выбрал для этого [*SwiftLint*](https://github.com/realm/SwiftLint). Это очень удобный линтер с простой установкой и встроенной подсветкой в Xcode при создании билдов. В дефолтной конфигурации я вроде ничего кроме длины строки не менял. Выглядит она у меня вот так:
```
excluded: # paths to ignore during listing. overridden by `included`.
  - Carthage
  - Pods
# parameterized rules can be customized from this configuration file
line_length: 120
# parameterized rules are first parameterized as a warning level, then error level.
type_body_length:
  - 300 # warning
  - 400 # error
# parameterized rules are first parameterized as a warning level, then error level.
variable_name_max_length:
  - 40 # warning
  - 60 # error
# parameterized rules are first parameterized as a warning level, then error level.
variable_name_min_length:
  - 3 # warning
  - 2 # error
```
