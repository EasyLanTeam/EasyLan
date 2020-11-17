# EasyLAN
## Front-end проект

### 1.Запуск фронта

При первом запуске требуется установка зависимостей (node_modules)

`npm i`

Запуск webpack-dev-server на порту 8022

`npm start`

### 2.Сборка фронта под продакшн
`npm run build`

Команда выполнит сборку и соберет все файлы в директорию ./dist

### 3.Соглашения
#### 3.1 Стилизация компонетов

В проекте используем компонентный подход,
стилизация компонентов происходит посредством scss-модулей (CSS-Modules)
и использование в компонентах проп - className.

Структура файлов компонента:

```
.\/Component.tsx
.\/Component.style.scss //стили
.\/index.ts // для импорта
```
Стилизация
```
import styles from "./Component.style.scss";

<Component className={styles.component}/>
```

Для комбинирования стилей используем css миксы - используем либу classnames
```
import styles from "./Component.style.scss";
import cn from "classnames";

<Component className={cn(styles.component, styles.componentMod)}/>
```

index.ts описывается так:
```
export {default} from "./Component"

```
```
// Необходим для того чтобы писать:
import Component from "./Component";
// вместо
import Component from "./Component/Component";
```
#### 3.2 TypeScript
Также для TypeScript используется линтинг кода.
Ошибки линтера не игнорить, так как они не дадут webpack'у скомпилить код.
