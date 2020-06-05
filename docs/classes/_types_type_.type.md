[sywac](../README.md) › [Globals](../globals.md) › ["types/type"](../modules/_types_type_.md) › [Type](_types_type_.type.md)

# Class: Type ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **Type**

  ↳ [TypeBoolean](_types_boolean_.typeboolean.md)

## Index

### Constructors

* [constructor](_types_type_.type.md#constructor)

### Properties

* [_aliases](_types_type_.type.md#private-_aliases)
* [_coerceHandler](_types_type_.type.md#private-optional-_coercehandler)
* [_defaultVal](_types_type_.type.md#private-optional-_defaultval)
* [_desc](_types_type_.type.md#private-optional-_desc)
* [_flags](_types_type_.type.md#private-optional-_flags)
* [_group](_types_type_.type.md#private-optional-_group)
* [_hidden](_types_type_.type.md#private-optional-_hidden)
* [_hints](_types_type_.type.md#private-optional-_hints)
* [_parent](_types_type_.type.md#private-optional-_parent)
* [_required](_types_type_.type.md#private-optional-_required)
* [_strict](_types_type_.type.md#private-optional-_strict)

### Accessors

* [aliases](_types_type_.type.md#aliases)
* [coerceHandler](_types_type_.type.md#coercehandler)
* [datatype](_types_type_.type.md#datatype)
* [defaultVal](_types_type_.type.md#defaultval)
* [helpDesc](_types_type_.type.md#helpdesc)
* [helpFlags](_types_type_.type.md#helpflags)
* [helpGroup](_types_type_.type.md#helpgroup)
* [helpHints](_types_type_.type.md#helphints)
* [id](_types_type_.type.md#id)
* [isHidden](_types_type_.type.md#ishidden)
* [isRequired](_types_type_.type.md#isrequired)
* [isStrict](_types_type_.type.md#isstrict)
* [parent](_types_type_.type.md#parent)
* [shouldValidateDefaultValue](_types_type_.type.md#shouldvalidatedefaultvalue)
* [SOURCE_DEFAULT](_types_type_.type.md#static-source_default)
* [SOURCE_FLAG](_types_type_.type.md#static-source_flag)
* [SOURCE_POSITIONAL](_types_type_.type.md#static-source_positional)

### Methods

* [_internalParse](_types_type_.type.md#_internalparse)
* [alias](_types_type_.type.md#alias)
* [applySource](_types_type_.type.md#applysource)
* [buildHelpHints](_types_type_.type.md#buildhelphints)
* [buildInvalidMessage](_types_type_.type.md#buildinvalidmessage)
* [buildRequiredMessage](_types_type_.type.md#buildrequiredmessage)
* [coerce](_types_type_.type.md#coerce)
* [configure](_types_type_.type.md#configure)
* [defaultValue](_types_type_.type.md#defaultvalue)
* [desc](_types_type_.type.md#desc)
* [description](_types_type_.type.md#description)
* [failValidation](_types_type_.type.md#failvalidation)
* [flags](_types_type_.type.md#flags)
* [getValue](_types_type_.type.md#getvalue)
* [group](_types_type_.type.md#group)
* [hasRequiredValue](_types_type_.type.md#hasrequiredvalue)
* [hidden](_types_type_.type.md#hidden)
* [hints](_types_type_.type.md#hints)
* [isApplicable](_types_type_.type.md#isapplicable)
* [observeAlias](_types_type_.type.md#observealias)
* [parse](_types_type_.type.md#parse)
* [postParse](_types_type_.type.md#postparse)
* [required](_types_type_.type.md#required)
* [resolve](_types_type_.type.md#resolve)
* [setValue](_types_type_.type.md#setvalue)
* [strict](_types_type_.type.md#strict)
* [toObject](_types_type_.type.md#toobject)
* [toResult](_types_type_.type.md#toresult)
* [validateConfig](_types_type_.type.md#validateconfig)
* [validateParsed](_types_type_.type.md#validateparsed)
* [validateValue](_types_type_.type.md#validatevalue)
* [withParent](_types_type_.type.md#withparent)

## Constructors

###  constructor

\+ **new Type**(`opts?`: [TypeOptions](../interfaces/_types_type_.typeoptions.md)‹T›): *[Type](_types_type_.type.md)*

*Defined in [types/type.ts:140](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | [TypeOptions](../interfaces/_types_type_.typeoptions.md)‹T› |

**Returns:** *[Type](_types_type_.type.md)*

## Properties

### `Private` _aliases

• **_aliases**: *string[]*

*Defined in [types/type.ts:130](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L130)*

___

### `Private` `Optional` _coerceHandler

• **_coerceHandler**? : *[CoerceFunction](../modules/_types_type_.md#coercefunction)‹T›*

*Defined in [types/type.ts:134](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L134)*

___

### `Private` `Optional` _defaultVal

• **_defaultVal**? : *T*

*Defined in [types/type.ts:131](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L131)*

___

### `Private` `Optional` _desc

• **_desc**? : *undefined | string*

*Defined in [types/type.ts:136](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L136)*

___

### `Private` `Optional` _flags

• **_flags**? : *undefined | string*

*Defined in [types/type.ts:135](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L135)*

___

### `Private` `Optional` _group

• **_group**? : *undefined | string*

*Defined in [types/type.ts:138](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L138)*

___

### `Private` `Optional` _hidden

• **_hidden**? : *undefined | false | true*

*Defined in [types/type.ts:139](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L139)*

___

### `Private` `Optional` _hints

• **_hints**? : *string | string[]*

*Defined in [types/type.ts:137](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L137)*

___

### `Private` `Optional` _parent

• **_parent**? : *undefined | string*

*Defined in [types/type.ts:140](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L140)*

___

### `Private` `Optional` _required

• **_required**? : *undefined | false | true*

*Defined in [types/type.ts:132](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L132)*

___

### `Private` `Optional` _strict

• **_strict**? : *undefined | false | true*

*Defined in [types/type.ts:133](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L133)*

## Accessors

###  aliases

• **get aliases**(): *string[]*

*Defined in [types/type.ts:195](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L195)*

**Returns:** *string[]*

___

###  coerceHandler

• **get coerceHandler**(): *function*

*Defined in [types/type.ts:231](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L231)*

**Returns:** *function*

▸ (`v`: any): *T*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

___

###  datatype

• **get datatype**(): *string*

*Defined in [types/type.ts:181](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L181)*

subtypes should override this!

**Returns:** *string*

___

###  defaultVal

• **get defaultVal**(): *undefined | T*

*Defined in [types/type.ts:204](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L204)*

**Returns:** *undefined | T*

___

###  helpDesc

• **get helpDesc**(): *string*

*Defined in [types/type.ts:253](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L253)*

**Returns:** *string*

___

###  helpFlags

• **get helpFlags**(): *undefined | string*

*Defined in [types/type.ts:240](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L240)*

**Returns:** *undefined | string*

___

###  helpGroup

• **get helpGroup**(): *string*

*Defined in [types/type.ts:285](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L285)*

**Returns:** *string*

___

###  helpHints

• **get helpHints**(): *string | string[]*

*Defined in [types/type.ts:263](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L263)*

**Returns:** *string | string[]*

___

###  id

• **get id**(): *string*

*Defined in [types/type.ts:167](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L167)*

A string uniquely identifying this type across all levels
used for mapping values and sources in context

**Returns:** *string*

___

###  isHidden

• **get isHidden**(): *boolean*

*Defined in [types/type.ts:294](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L294)*

**Returns:** *boolean*

___

###  isRequired

• **get isRequired**(): *boolean*

*Defined in [types/type.ts:213](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L213)*

**Returns:** *boolean*

___

###  isStrict

• **get isStrict**(): *boolean*

*Defined in [types/type.ts:222](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L222)*

**Returns:** *boolean*

___

###  parent

• **get parent**(): *string*

*Defined in [types/type.ts:176](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L176)*

**Returns:** *string*

___

###  shouldValidateDefaultValue

• **get shouldValidateDefaultValue**(): *boolean*

*Defined in [types/type.ts:185](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L185)*

**Returns:** *boolean*

___

### `Static` SOURCE_DEFAULT

• **get SOURCE_DEFAULT**(): *string*

*Defined in [types/type.ts:118](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L118)*

**Returns:** *string*

___

### `Static` SOURCE_FLAG

• **get SOURCE_FLAG**(): *string*

*Defined in [types/type.ts:122](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L122)*

**Returns:** *string*

___

### `Static` SOURCE_POSITIONAL

• **get SOURCE_POSITIONAL**(): *string*

*Defined in [types/type.ts:126](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L126)*

**Returns:** *string*

## Methods

###  _internalParse

▸ **_internalParse**(`context`: [Context](_context_.context.md), `validate?`: undefined | false | true): *Promise‹this›*

*Defined in [types/type.ts:352](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L352)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`validate?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹this›*

___

###  alias

▸ **alias**(`a`: string): *this*

*Defined in [types/type.ts:190](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |

**Returns:** *this*

___

###  applySource

▸ **applySource**(`context`: [Context](_context_.context.md), `source`: string, `position`: number, `raw`: string): *void*

*Defined in [types/type.ts:443](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L443)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`source` | string |
`position` | number |
`raw` | string |

**Returns:** *void*

___

###  buildHelpHints

▸ **buildHelpHints**(`hintsArray`: string[]): *void*

*Defined in [types/type.ts:270](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L270)*

**Parameters:**

Name | Type |
------ | ------ |
`hintsArray` | string[] |

**Returns:** *void*

___

###  buildInvalidMessage

▸ **buildInvalidMessage**(`context`: [Context](_context_.context.md), `msgAndArgs`: object): *void*

*Defined in [types/type.ts:432](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L432)*

**Parameters:**

▪ **context**: *[Context](_context_.context.md)*

▪ **msgAndArgs**: *object*

Name | Type |
------ | ------ |
`args` | string[] |
`msg` | string |

**Returns:** *void*

___

###  buildRequiredMessage

▸ **buildRequiredMessage**(`context`: [Context](_context_.context.md), `msgAndArgs`: object): *void*

*Defined in [types/type.ts:427](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L427)*

**Parameters:**

▪ **context**: *[Context](_context_.context.md)*

▪ **msgAndArgs**: *object*

Name | Type |
------ | ------ |
`args` | string[] |
`msg` | string |

**Returns:** *void*

___

###  coerce

▸ **coerce**(`syncFunction`: [CoerceFunction](../modules/_types_type_.md#coercefunction)‹T›): *this*

*Defined in [types/type.ts:226](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L226)*

**Parameters:**

Name | Type |
------ | ------ |
`syncFunction` | [CoerceFunction](../modules/_types_type_.md#coercefunction)‹T› |

**Returns:** *this*

___

###  configure

▸ **configure**(`opts?`: [TypeOptions](../interfaces/_types_type_.typeoptions.md)‹T›, `override?`: undefined | false | true): *this*

*Defined in [types/type.ts:147](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | [TypeOptions](../interfaces/_types_type_.typeoptions.md)‹T› |
`override?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  defaultValue

▸ **defaultValue**(`dv`: T): *this*

*Defined in [types/type.ts:199](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`dv` | T |

**Returns:** *this*

___

###  desc

▸ **desc**(`d?`: undefined | string): *this*

*Defined in [types/type.ts:249](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L249)*

**Parameters:**

Name | Type |
------ | ------ |
`d?` | undefined &#124; string |

**Returns:** *this*

___

###  description

▸ **description**(`d?`: undefined | string): *this*

*Defined in [types/type.ts:244](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`d?` | undefined &#124; string |

**Returns:** *this*

___

###  failValidation

▸ **failValidation**(`context`: [Context](_context_.context.md), `msg`: string[]): *void*

*Defined in [types/type.ts:406](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L406)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`msg` | string[] |

**Returns:** *void*

___

###  flags

▸ **flags**(`f`: string): *this*

*Defined in [types/type.ts:235](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L235)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *this*

___

###  getValue

▸ **getValue**(`context`: [Context](_context_.context.md)): *unknown*

*Defined in [types/type.ts:467](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L467)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *unknown*

___

###  group

▸ **group**(`g`: string): *this*

*Defined in [types/type.ts:280](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L280)*

**Parameters:**

Name | Type |
------ | ------ |
`g` | string |

**Returns:** *this*

___

###  hasRequiredValue

▸ **hasRequiredValue**(`context`: [Context](_context_.context.md)): *boolean*

*Defined in [types/type.ts:423](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L423)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *boolean*

___

###  hidden

▸ **hidden**(`h`: boolean): *this*

*Defined in [types/type.ts:289](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L289)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | boolean |

**Returns:** *this*

___

###  hints

▸ **hints**(`h?`: string | string[]): *this*

*Defined in [types/type.ts:258](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L258)*

**Parameters:**

Name | Type |
------ | ------ |
`h?` | string &#124; string[] |

**Returns:** *this*

___

###  isApplicable

▸ **isApplicable**(`context`: [Context](_context_.context.md), `currentValue`: unknown, `previousValue`: unknown, `slurpedArg`: [SlurpedArg](../interfaces/_context_.slurpedarg.md)): *boolean*

*Defined in [types/type.ts:454](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L454)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`currentValue` | unknown |
`previousValue` | unknown |
`slurpedArg` | [SlurpedArg](../interfaces/_context_.slurpedarg.md) |

**Returns:** *boolean*

___

###  observeAlias

▸ **observeAlias**(`context`: [Context](_context_.context.md), `alias`: string): *void*

*Defined in [types/type.ts:461](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L461)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`alias` | string |

**Returns:** *void*

___

###  parse

▸ **parse**(`context`: [Context](_context_.context.md)): *Promise‹this›*

*Defined in [types/type.ts:349](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L349)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *Promise‹this›*

___

###  postParse

▸ **postParse**(`context`: [Context](_context_.context.md)): *Promise‹this›*

*Defined in [types/type.ts:438](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L438)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *Promise‹this›*

___

###  required

▸ **required**(`r`: boolean): *this*

*Defined in [types/type.ts:208](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L208)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | boolean |

**Returns:** *this*

___

###  resolve

▸ **resolve**(): *Promise‹this›*

*Defined in [types/type.ts:342](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L342)*

**Returns:** *Promise‹this›*

___

###  setValue

▸ **setValue**(`context`: [Context](_context_.context.md), `value`: T): *void*

*Defined in [types/type.ts:463](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L463)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`value` | T |

**Returns:** *void*

___

###  strict

▸ **strict**(`s`: boolean): *this*

*Defined in [types/type.ts:217](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | boolean |

**Returns:** *this*

___

###  toObject

▸ **toObject**(): *object*

*Defined in [types/type.ts:476](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L476)*

**Returns:** *object*

* **aliases**: *string[]* = this.aliases

* **datatype**: *string* = this.datatype

* **helpDesc**: *string* = this.helpDesc

* **helpFlags**: *undefined | string* = this.helpFlags

* **helpGroup**: *string* = this.helpGroup

* **helpHints**: *string | string[]* = this.helpHints

* **id**: *string* = this.id

* **isHidden**: *boolean* = this.isHidden

* **isRequired**: *boolean* = this.isRequired

___

###  toResult

▸ **toResult**(`context`: [Context](_context_.context.md), `shouldCoerce`: boolean): *object*

*Defined in [types/type.ts:492](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L492)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`shouldCoerce` | boolean |

**Returns:** *object*

* **aliases**: *string[]* = this.aliases

* **datatype**: *string* = this.datatype

* **parent**: *string* = this.parent

* **position**: *undefined | number[]* = obj && obj.position

* **raw**: *undefined | string[]* = obj && obj.raw

* **source**: *undefined | string* = obj && obj.source

* **value**: *unknown* = shouldCoerce ? this.coerceHandler(this.getValue(context)) : this.getValue(context)

___

###  validateConfig

▸ **validateConfig**(`utils`: any): *void*

*Defined in [types/type.ts:298](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L298)*

**Parameters:**

Name | Type |
------ | ------ |
`utils` | any |

**Returns:** *void*

___

###  validateParsed

▸ **validateParsed**(`context`: [Context](_context_.context.md)): *Promise‹this›*

*Defined in [types/type.ts:387](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L387)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *Promise‹this›*

___

###  validateValue

▸ **validateValue**(`value`: unknown, `context`: [Context](_context_.context.md)): *boolean*

*Defined in [types/type.ts:472](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L472)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | unknown |
`context` | [Context](_context_.context.md) |

**Returns:** *boolean*

___

###  withParent

▸ **withParent**(`apiName`: string): *this*

*Defined in [types/type.ts:171](https://github.com/jose-pr/sywac/blob/a63bd2b/src/types/type.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`apiName` | string |

**Returns:** *this*
