# Woo Blog

## Project Setting

`npm create vite@latest . -- --template react-ts`

현재 폴더에 프로젝트 파일 생성

### vite.config.ts

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 기존 코드
export default defineConfig({
  plugins: [react()],
})

// 변경된 코드
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

기존 코드에 server 를 추가하여, localhost:3000 으로 고정

#### Npm install

```
npm install vite-plugin-svgr // svg 파일 사용을 위한 플러그인 설치

npm install -D vite-tsconfig-paths @types/node // path 의 절대 경로 사용을 위한 플러그인 설치
```

최종 수정된 vite.config.ts

```
import * as path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
	plugins: [react(), svgrPlugin()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
```

### tsconfig.json

기존 코드

```
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

변경된 코드

```
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "types": ["vite/client", "vite-plugin-svgr/client"],
    "module": "ESNext",
    "skipLibCheck": true,
    "useDefineForClassFields": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "node",
    "allowImportingTsExtensions": true,
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "src/custom.d.ts"]
}
```

- "target": "ESNext" ESNext는 TypeScript가 지원하는 가장 높은 버전을 나타낸다.

- "types": ["vite/client", "vite-plugin-svgr/client"] svg 파일 사용을 위해 정의.

- "baseUrl": "." , "paths": {"@/_": ["./src/_"]}, 절대 경로 사용을 위해 정의.

- "moduleResolution": "node" node module 방식 사용을 위해 정의.

- "allowSyntheticDefaultImports": true 흔히 우리가 아는 다음과 같은 import 방식 사용을 위해 정의. <br>
  `import React from "react";`

- "include": ["src/custom.d.ts"] svg 파일 사용을 위해 정의. custom.d.ts 파일은 다음과 같다. <br>

  ```
  declare module "\*.svg" {
  import React = require("react");

      export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
      const src: string;
      export default src;

  }
  ```

## ESLint

설치 방법

ESLint와 동시에 필요한 `parser` 와 `plug-in` 도 함께 설치

```
npm install -D eslint@8.2.0 @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

여러 회사들이 ESLint를 사용중인데 `airbnb-config` 는 airbnb 사 에서 사용하고 있는 ESLint 규칙이다.

`airbnb-config` 사용을 위해 필요한 `dependency` 들은 다음 명령어를 통해 확인 할 수 있다.

`npm info "eslint-config-airbnb@latest" peerDependencies`

해당 명령어를 통해, 한번에 설치가 가능.

`npx install-peerdeps --dev eslint-config-airbnb`


root 디렉토리에 .eslintrc.json 파일을 생성 후, 다음과 같이 파일을 작성.

```
{
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
  ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
}
```

테스트로 안쓰는 변수 하나를 선언하고 터미널에 npm run lint를 실행하면 다음과 같은 오류를 확인할 수 있다.

## Prettier

설치 방법

```
npm install -D prettier eslint-config-prettier
```

그 후 `root` 디렉토리에 .prettierrc 파일을 생성. 해당 파일에 필요한 rule을 추가.

이 파일이 없으면 기본값으로 세팅된다.

### Prettier Rules

```
{
  "arrowParens": "avoid", // 화살표 함수 괄호 사용 방식
  "bracketSpacing": false, // 객체 리터럴에서 괄호에 공백 삽입 여부
  "endOfLine": "auto", // EoF 방식, OS별로 처리 방식이 다름
  "htmlWhitespaceSensitivity": "css", // HTML 공백 감도 설정
  "jsxBracketSameLine": false, // JSX의 마지막 `>`를 다음 줄로 내릴지 여부
  "jsxSingleQuote": false, // JSX에 singe 쿼테이션 사용 여부
  "printWidth": 80, //  줄 바꿈 할 폭 길이
  "proseWrap": "preserve", // markdown 텍스트의 줄바꿈 방식 (v1.8.2)
  "quoteProps": "as-needed" // 객체 속성에 쿼테이션 적용 방식
  "semi": true, // 세미콜론 사용 여부
  "singleQuote": true, // single 쿼테이션 사용 여부
  "tabWidth": 2, // 탭 너비
  "trailingComma": "all", // 여러 줄을 사용할 때, 후행 콤마 사용 방식
  "useTabs": false, // 탭 사용 여부
  "vueIndentScriptAndStyle": true, // Vue 파일의 script와 style 태그의 들여쓰기 여부 (v1.19.0)
  "parser": '', // 사용할 parser를 지정, 자동으로 지정됨
  "filepath": '', // parser를 유추할 수 있는 파일을 지정
  "rangeStart": 0, // 포맷팅을 부분 적용할 파일의 시작 라인 지정
  "rangeEnd": Infinity, // 포맷팅 부분 적용할 파일의 끝 라인 지정,
  "requirePragma": false, // 파일 상단에 미리 정의된 주석을 작성하고 Pragma로 포맷팅 사용 여부 지정 (v1.8.0)
  "insertPragma": false, // 미리 정의된 @format marker의 사용 여부 (v1.8.0)
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 200
      }
    }
  ], // 특정 파일별로 옵션을 다르게 지정함, ESLint 방식 사용
}
```
