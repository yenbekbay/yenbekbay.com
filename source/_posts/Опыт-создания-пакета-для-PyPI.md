title: Опыт создания пакета для PyPI
date: 2015-10-27 15:45:48
tags: python
permalink: first-pypi-package
---

Около года назад я написал небольшой скрипт для скачивания музыки из ВКонтакте. 

<!-- more -->

Скрипт работал примерно так:
1. Сначала он проводит поиск по базам *Soundcloud*-а и *Musicbrainz*, чтобы подобрать существующий трек по указанному запросу. Это делается для того, чтобы на следующем этапе отфильтровать результаты с различающейся длительностью.
2. Далее скрипт отправляет запрос через API ВКонтакте, чтобы получить список аудиозаписей.
3. Полученный список фильтруется сначала по длительности, а затем по качеству (битрейту). Для меня качество критично, поэтому битрейт должен быть не меньше 320kbps.
4. Скрипт выбирает лучший трек и сохраняет его, при этом очищая теги и добавляя такие поля как альбом, номер трека и полное имя исполнителя. Также треку устанавливается обложка полученная от *Soundcloud*-а или от *Musicbrainz*.

Достаточно простой скрипт, который я написал хуже некуда. Так как этим скриптом я очень часто пользуюсь, я решил переписать его и опубликовать для простой установки.

Итак, что же я сделал, чтобы привести скрипт в порядок:
1. Разделил весь функционал на множество классов. Так намного удобнее взаимодействовать с объектами и, конечно же, это намного чище, чем использовать глобальные переменные (о чем я только думал).
2. Начал хранить настройки пользователя в INI файле. Для этого я использовал *[clint](https://github.com/kennethreitz/clint)* с его модулем `resources`. Очень удобный способ хранить настройки, я считаю; определенно лучше `json` файла, который я раньше использовал. Настройки собираются при первом открытии, запоминаются и больше не спрашиваются. Вот так, например, я создаю файл конфигурации в классе `Configuration`:
```python
def __init__(self):
        resources.init('yenbekbay', 'mudl')
        self.config = ConfigParser()
        if not os.path.exists(resources.user.path):
            os.makedirs(resources.user.path)
        self.config_path = os.path.join(resources.user.path, 'config.ini')
        self.config.read(self.config_path)
        if not self.config.has_section('general'):
            self.config.add_section('general')
```
3. Добавил несколько аргументов к команде. Эти аргументы в большинстве не очень нужны, так как легче просто поменять настройки по умолчанию, но кто знает -- вдруг кому пригодится.
4. Переписал код, следуя рекомендациям `pylint`, и сделал скрипт совместимым с Python 2.7 и Python 3.

Сам скрипт можете найти [тут](https://github.com/yenbekbay/mudl). Для установки просто выполните команду `pip install mudl`.

### Время небольшого туториала

Процесс загрузки на PyPI очень простой. Для загрузки потребуется несколько инструментов. [Тут](https://python-packaging-user-guide.readthedocs.org/en/latest/current/) есть полноценная инструкция, но по сути все, что нужно сделать, это:
```bash
# Install pip 
$ easy_install pip
# Or update pip
$ pip install --upgrade pip
# Install setup tools for building and distributing Python distributions
$ curl https://bootstrap.pypa.io/ez_setup.py -o - | python
# Remove the files created during the installation
$ rm ez_setup.py setuptools-18.4.zip
# Install twine for uploading distributions to PyPI
$ pip install twine
# Install wheel for creating wheel distributions
$ pip install wheel
```

После этого [проверьте](https://python-packaging-user-guide.readthedocs.org/en/latest/distributing), что вы правильно подготовились к публикации. Убедившись, можно регистрировать пакет:
```bash
$ python setup.py register
```

Затем сохраните архивы для дистрибуции:
```bash
$ python setup.py sdist
$ python setup.py bdist_wheel
```

И наконец загрузите ваш пакет на PyPI:
```bash
$ twine upload dist/* 
```

На этом, в принципе, все. Ваш пакет должен быть опубликован на PyPI. Поздравляю!