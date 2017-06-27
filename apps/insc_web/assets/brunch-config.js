exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: "js/app.js"

      // To use a separate vendor.js bundle, specify two files path
      // https://github.com/brunch/brunch/blob/master/docs/config.md#files
      // joinTo: {
      //  "js/app.js": /^(js)/,
      //  "js/vendor.js": /^(vendor)|(deps)/
      // }
      //
      // To change the order of concatenation of files, explicitly mention here
      // https://github.com/brunch/brunch/tree/master/docs#concatenation
      // order: {
      //   before: [
      //     "vendor/js/jquery-2.1.1.js",
      //     "vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: "css/app.css"
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/assets/static". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ["static", "css", "js", "vendor"],
    // Where to compile files to
    public: "../priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/vendor/],
      presets: [
        ["env", {
          targets: {
            browsers: ['last 2 versions'],
            chrome: 55,
            uglify: true
          },
          include: ["transform-es2015-arrow-functions", "es6.map"],
          exclude: ["transform-regenerator", "es6.set"],
          modules: "commonjs",
          useBuiltIns: true,
          debug: true
        }]
      ]
    },
    sass: {
      mode: "ruby", // set to 'native' to force libsass
      debug: "comments", // or set to 'debug' for the FireSass-style output
      allowCache: true,
      options: {
        includePaths: ["node_modules"]
      }
    },
    eslint: {
      pattern: /^app\/.*\.js?$/,
      parser: "babel-eslint",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 6,
      },
      env: {
        node: true,
        es6: true,
      },
      // warnOnly: true,
      config: {
        rules: {
          "comma-dangle": [2, "always-multiline"],
          "no-debugger": 2,
          "no-cond-assign": 2,
          "no-constant-condition": 2,
          "no-dupe-keys": 2,
          "no-duplicate-case": 2,
          "no-empty": 2,
          "no-ex-assign": 2,
          "no-extra-boolean-cast": 2,
          "no-extra-parens": 2,
          "no-func-assign": 2,
          "no-invalid-regexp": 2,
          "no-negated-in-lhs": 2,
          "no-obj-calls": 2,
          "no-regex-spaces": 2,
          "no-sparse-arrays": 2,
          "no-unexpected-multiline": 2,
          "no-unreachable": 2,
          "no-unsafe-finally": 2,
          "use-isnan": 2,
          "valid-typeof": 2,

          "accessor-pairs": 2,
          "curly": [2, "multi-line", "consistent"],
          "dot-location": [2, "property"],
          "dot-notation": 2,
          "eqeqeq": [2, "allow-null"],
          "no-alert": 2,
          "no-caller": 2,
          "no-else-return": 2,
          "no-eval": 2,
          "no-extend-native": 2,
          "no-extra-bind": 2,
          "no-fallthrough": 2,
          "no-floating-decimal": 2,
          "no-implicit-globals": 2,
          "no-implied-eval": 2,
          "no-iterator": 2,
          "no-labels": 2,
          "no-lone-blocks": 2,
          "no-multi-spaces": 2,
          "no-multi-str": 2,
          "no-native-reassign": 2,
          "no-new": 2,
          "no-new-func": 2,
          "no-new-wrappers": 2,
          "no-octal": 2,
          "no-octal-escape": 2,
          "no-proto": 2,
          "no-redeclare": 2,
          "no-return-assign": [2, "always"],
          "no-script-url": 2,
          "no-self-assign": 2,
          "no-self-compare": 2,
          "no-sequences": 2,
          "no-throw-literal": 2,
          "no-unmodified-loop-condition": 2,
          "no-useless-call": 2,
          "no-useless-concat": 2,
          "no-useless-escape": 2,
          "no-void": 2,
          "no-warning-comments": [1, {
            "terms": ["todo", "fixme", "xxx"],
            "location": "start",
          }],
          "no-with": 2,
          "wrap-iife": [2, "inside"],
          "yoda": [2, "never"],

          "strict": 2,
          "no-catch-shadow": 2,
          "no-undef": 2,
          "no-unused-vars": 2,
          "callback-return": 2,
          "handle-callback-err": 2,
          "no-path-concat": 2,

          "array-bracket-spacing": 2,
          "block-spacing": 2,
          "brace-style": 2,
          "camelcase": 2,
          "comma-spacing": 2,
          "comma-style": 2,
          "computed-property-spacing": 2,
          "eol-last": 2,
          "func-names": [2, "never"],
          "func-style": [2, "expression"],
          "indent": [2, 2, {"SwitchCase": 1}],
          "key-spacing": 2,
          "keyword-spacing": 2,
          "linebreak-style": 2,
          "new-cap": 2,
          "new-parens": 2,
          "no-array-constructor": 2,
          "no-lonely-if": 2,
          "no-mixed-spaces-and-tabs": 2,
          "no-multiple-empty-lines": [2, {"max": 2}],
          "no-negated-condition": 2,
          "no-new-object": 2,
          "no-spaced-func": 2,
          "no-trailing-spaces": 2,
          "no-unneeded-ternary": 2,
          "no-whitespace-before-property": 2,
          "object-curly-spacing": 2,
          "operator-linebreak": [2, "after"],
          "quote-props": [2, "as-needed"],
          "quotes": [2, "single", {
            "avoidEscape": true,
            "allowTemplateLiterals": true,
          }],
          "semi": [2, "always"],
          "semi-spacing": 2,
          "space-before-blocks": 2,
          "space-before-function-paren": [2, "never"],
          "space-in-parens": 2,
          "space-infix-ops": 2,
          "space-unary-ops": 2,
          "spaced-comment": 2,

          "max-params": [1, 4],
          "arrow-parens": [2, "as-needed"],
          "arrow-spacing": 2,
          "constructor-super": 2,
          "generator-star-spacing": [2, "after"],
          "no-class-assign": 2,
          "no-const-assign": 2,
          "no-dupe-class-members": 2,
          "no-new-symbol": 2,
          "no-this-before-super": 2,
          "no-useless-computed-key": 2,
          "no-useless-constructor": 2,
          "object-shorthand": [2, "always", {"ignoreConstructors": true}],
          "prefer-arrow-callback": 1,
          "prefer-const": 2,
          "prefer-template": 1,
          "require-yield": 2,
          "template-curly-spacing": 2,
          "yield-star-spacing": [2, "after"],
        }
      }
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/app"]
    },
    wrapper: "commonjs"
  },

  npm: {
    enabled: true
  }
};
