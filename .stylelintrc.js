module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order'
  ],
  plugins: [
    'stylelint-order'
  ],
  overrides: [
    {
      customSyntax: 'postcss-less',
      files: ['**/*.css', '**/*.less']
    },
    {
      customSyntax: 'postcss-html',
      files: ['**/*.html', '**/*.vue']
    }
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    // 类选择器的命名规则
    "selector-class-pattern": ".",
    // 禁止空块
    'block-no-empty': true,
    // 颜色6位长度
    "color-hex-length": "long",
    // 兼容自定义标签名
    "selector-type-no-unknown": [true, {
      "ignoreTypes": []
    }],
    "max-line-length": null,
    // 忽略伪类选择器 ::v-deep
    "selector-pseudo-element-no-unknown": [true, {
      "ignorePseudoElements": ["/./","v-deep", '/deep/', '-webkit-']
    }],
    // 禁止低优先级的选择器出现在高优先级的选择器之后。
    "no-descending-specificity": null,
    // 不验证@未知的名字，为了兼容scss的函数
    "at-rule-no-unknown": null,
    // 禁止空注释
    "comment-no-empty": true,
    // 禁止简写属性的冗余值
    "shorthand-property-no-redundant-values": true,
    "selector-pseudo-class-no-unknown": [true, {
      "ignorePseudoClasses": ['/./', '-webkit-']
    }],
    // 禁止值的浏览器引擎前缀
    "value-no-vendor-prefix": [true,
    {
      "ignoreValues": "box"
    }],
    // 禁止属性的浏览器引擎前缀
    "property-no-vendor-prefix": [
      true,
      {
        "ignoreProperties": [ /./]
      }
    ],
    // 禁止空第一行
    "no-empty-first-line": true,
    "block-opening-brace-space-before": null
  }
}
