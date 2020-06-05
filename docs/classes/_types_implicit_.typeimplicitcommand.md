[sywac](../README.md) › [Globals](../globals.md) › ["types/implicit"](../modules/_types_implicit_.md) › [TypeImplicitCommand](_types_implicit_.typeimplicitcommand.md)

# Class: TypeImplicitCommand

## Hierarchy

  ↳ [TypeBoolean](_types_boolean_.typeboolean.md)

  ↳ **TypeImplicitCommand**

## Index

### Constructors

* [constructor](_types_implicit_.typeimplicitcommand.md#constructor)

### Properties

* [_implicitCommand](_types_implicit_.typeimplicitcommand.md#private-optional-_implicitcommand)

### Accessors

* [aliases](_types_implicit_.typeimplicitcommand.md#aliases)
* [coerceHandler](_types_implicit_.typeimplicitcommand.md#coercehandler)
* [datatype](_types_implicit_.typeimplicitcommand.md#datatype)
* [defaultVal](_types_implicit_.typeimplicitcommand.md#defaultval)
* [helpDesc](_types_implicit_.typeimplicitcommand.md#helpdesc)
* [helpFlags](_types_implicit_.typeimplicitcommand.md#helpflags)
* [helpGroup](_types_implicit_.typeimplicitcommand.md#helpgroup)
* [helpHints](_types_implicit_.typeimplicitcommand.md#helphints)
* [id](_types_implicit_.typeimplicitcommand.md#id)
* [implicitCommands](_types_implicit_.typeimplicitcommand.md#implicitcommands)
* [isHidden](_types_implicit_.typeimplicitcommand.md#ishidden)
* [isRequired](_types_implicit_.typeimplicitcommand.md#isrequired)
* [isStrict](_types_implicit_.typeimplicitcommand.md#isstrict)
* [parent](_types_implicit_.typeimplicitcommand.md#parent)
* [shouldValidateDefaultValue](_types_implicit_.typeimplicitcommand.md#shouldvalidatedefaultvalue)
* [SOURCE_DEFAULT](_types_implicit_.typeimplicitcommand.md#static-source_default)
* [SOURCE_FLAG](_types_implicit_.typeimplicitcommand.md#static-source_flag)
* [SOURCE_POSITIONAL](_types_implicit_.typeimplicitcommand.md#static-source_positional)

### Methods

* [_internalParse](_types_implicit_.typeimplicitcommand.md#_internalparse)
* [alias](_types_implicit_.typeimplicitcommand.md#alias)
* [applySource](_types_implicit_.typeimplicitcommand.md#applysource)
* [buildHelpHints](_types_implicit_.typeimplicitcommand.md#buildhelphints)
* [buildInvalidMessage](_types_implicit_.typeimplicitcommand.md#buildinvalidmessage)
* [buildRequiredMessage](_types_implicit_.typeimplicitcommand.md#buildrequiredmessage)
* [coerce](_types_implicit_.typeimplicitcommand.md#coerce)
* [configure](_types_implicit_.typeimplicitcommand.md#configure)
* [defaultValue](_types_implicit_.typeimplicitcommand.md#defaultvalue)
* [desc](_types_implicit_.typeimplicitcommand.md#desc)
* [description](_types_implicit_.typeimplicitcommand.md#description)
* [failValidation](_types_implicit_.typeimplicitcommand.md#failvalidation)
* [flags](_types_implicit_.typeimplicitcommand.md#flags)
* [getValue](_types_implicit_.typeimplicitcommand.md#getvalue)
* [group](_types_implicit_.typeimplicitcommand.md#group)
* [hasRequiredValue](_types_implicit_.typeimplicitcommand.md#hasrequiredvalue)
* [hidden](_types_implicit_.typeimplicitcommand.md#hidden)
* [hints](_types_implicit_.typeimplicitcommand.md#hints)
* [implicitCommandFound](_types_implicit_.typeimplicitcommand.md#implicitcommandfound)
* [isApplicable](_types_implicit_.typeimplicitcommand.md#isapplicable)
* [observeAlias](_types_implicit_.typeimplicitcommand.md#observealias)
* [parse](_types_implicit_.typeimplicitcommand.md#parse)
* [postParse](_types_implicit_.typeimplicitcommand.md#postparse)
* [required](_types_implicit_.typeimplicitcommand.md#required)
* [resolve](_types_implicit_.typeimplicitcommand.md#resolve)
* [setValue](_types_implicit_.typeimplicitcommand.md#setvalue)
* [strict](_types_implicit_.typeimplicitcommand.md#strict)
* [toObject](_types_implicit_.typeimplicitcommand.md#toobject)
* [toResult](_types_implicit_.typeimplicitcommand.md#toresult)
* [validateConfig](_types_implicit_.typeimplicitcommand.md#validateconfig)
* [validateParsed](_types_implicit_.typeimplicitcommand.md#validateparsed)
* [validateValue](_types_implicit_.typeimplicitcommand.md#validatevalue)
* [withParent](_types_implicit_.typeimplicitcommand.md#withparent)
* [get](_types_implicit_.typeimplicitcommand.md#static-get)

## Constructors

###  constructor

\+ **new TypeImplicitCommand**(`opts?`: [TypeImplicitCommandOptions](../interfaces/_types_implicit_.typeimplicitcommandoptions.md)): *[TypeImplicitCommand](_types_implicit_.typeimplicitcommand.md)*

*Overrides [TypeBoolean](_types_boolean_.typeboolean.md).[constructor](_types_boolean_.typeboolean.md#constructor)*

*Defined in [types/implicit.ts:10](https://github.com/jose-pr/sywac/blob/59b0233/src/types/implicit.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | [TypeImplicitCommandOptions](../interfaces/_types_implicit_.typeimplicitcommandoptions.md) |

**Returns:** *[TypeImplicitCommand](_types_implicit_.typeimplicitcommand.md)*

## Properties

### `Private` `Optional` _implicitCommand

• **_implicitCommand**? : *undefined | false | true*

*Defined in [types/implicit.ts:10](https://github.com/jose-pr/sywac/blob/59b0233/src/types/implicit.ts#L10)*

## Accessors

###  aliases

• **get aliases**(): *string[]*

*Inherited from [Type](_types_type_.type.md).[aliases](_types_type_.type.md#aliases)*

*Defined in [types/type.ts:195](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L195)*

**Returns:** *string[]*

___

###  coerceHandler

• **get coerceHandler**(): *function*

*Inherited from [Type](_types_type_.type.md).[coerceHandler](_types_type_.type.md#coercehandler)*

*Defined in [types/type.ts:231](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L231)*

**Returns:** *function*

▸ (`v`: any): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`v` | any |

___

###  datatype

• **get datatype**(): *string*

*Inherited from [TypeBoolean](_types_boolean_.typeboolean.md).[datatype](_types_boolean_.typeboolean.md#datatype)*

*Overrides [Type](_types_type_.type.md).[datatype](_types_type_.type.md#datatype)*

*Defined in [types/boolean.ts:13](https://github.com/jose-pr/sywac/blob/59b0233/src/types/boolean.ts#L13)*

**Returns:** *string*

___

###  defaultVal

• **get defaultVal**(): *undefined | T*

*Inherited from [Type](_types_type_.type.md).[defaultVal](_types_type_.type.md#defaultval)*

*Defined in [types/type.ts:204](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L204)*

**Returns:** *undefined | T*

___

###  helpDesc

• **get helpDesc**(): *string*

*Inherited from [Type](_types_type_.type.md).[helpDesc](_types_type_.type.md#helpdesc)*

*Defined in [types/type.ts:253](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L253)*

**Returns:** *string*

___

###  helpFlags

• **get helpFlags**(): *undefined | string*

*Inherited from [Type](_types_type_.type.md).[helpFlags](_types_type_.type.md#helpflags)*

*Defined in [types/type.ts:240](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L240)*

**Returns:** *undefined | string*

___

###  helpGroup

• **get helpGroup**(): *string*

*Inherited from [Type](_types_type_.type.md).[helpGroup](_types_type_.type.md#helpgroup)*

*Defined in [types/type.ts:285](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L285)*

**Returns:** *string*

___

###  helpHints

• **get helpHints**(): *string | string[]*

*Inherited from [Type](_types_type_.type.md).[helpHints](_types_type_.type.md#helphints)*

*Defined in [types/type.ts:263](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L263)*

**Returns:** *string | string[]*

___

###  id

• **get id**(): *string*

*Inherited from [Type](_types_type_.type.md).[id](_types_type_.type.md#id)*

*Defined in [types/type.ts:167](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L167)*

A string uniquely identifying this type across all levels
used for mapping values and sources in context

**Returns:** *string*

___

###  implicitCommands

• **get implicitCommands**(): *string[]*

*Defined in [types/implicit.ts:27](https://github.com/jose-pr/sywac/blob/59b0233/src/types/implicit.ts#L27)*

**Returns:** *string[]*

___

###  isHidden

• **get isHidden**(): *boolean*

*Inherited from [Type](_types_type_.type.md).[isHidden](_types_type_.type.md#ishidden)*

*Defined in [types/type.ts:294](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L294)*

**Returns:** *boolean*

___

###  isRequired

• **get isRequired**(): *boolean*

*Inherited from [Type](_types_type_.type.md).[isRequired](_types_type_.type.md#isrequired)*

*Defined in [types/type.ts:213](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L213)*

**Returns:** *boolean*

___

###  isStrict

• **get isStrict**(): *boolean*

*Inherited from [Type](_types_type_.type.md).[isStrict](_types_type_.type.md#isstrict)*

*Defined in [types/type.ts:222](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L222)*

**Returns:** *boolean*

___

###  parent

• **get parent**(): *string*

*Inherited from [Type](_types_type_.type.md).[parent](_types_type_.type.md#parent)*

*Defined in [types/type.ts:176](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L176)*

**Returns:** *string*

___

###  shouldValidateDefaultValue

• **get shouldValidateDefaultValue**(): *boolean*

*Inherited from [Type](_types_type_.type.md).[shouldValidateDefaultValue](_types_type_.type.md#shouldvalidatedefaultvalue)*

*Defined in [types/type.ts:185](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L185)*

**Returns:** *boolean*

___

### `Static` SOURCE_DEFAULT

• **get SOURCE_DEFAULT**(): *string*

*Inherited from [Type](_types_type_.type.md).[SOURCE_DEFAULT](_types_type_.type.md#static-source_default)*

*Defined in [types/type.ts:118](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L118)*

**Returns:** *string*

___

### `Static` SOURCE_FLAG

• **get SOURCE_FLAG**(): *string*

*Inherited from [Type](_types_type_.type.md).[SOURCE_FLAG](_types_type_.type.md#static-source_flag)*

*Defined in [types/type.ts:122](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L122)*

**Returns:** *string*

___

### `Static` SOURCE_POSITIONAL

• **get SOURCE_POSITIONAL**(): *string*

*Inherited from [Type](_types_type_.type.md).[SOURCE_POSITIONAL](_types_type_.type.md#static-source_positional)*

*Defined in [types/type.ts:126](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L126)*

**Returns:** *string*

## Methods

###  _internalParse

▸ **_internalParse**(`context`: [Context](_context_.context.md), `validate?`: undefined | false | true): *Promise‹this›*

*Inherited from [Type](_types_type_.type.md).[_internalParse](_types_type_.type.md#_internalparse)*

*Defined in [types/type.ts:352](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L352)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`validate?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹this›*

___

###  alias

▸ **alias**(`a`: string): *this*

*Inherited from [Type](_types_type_.type.md).[alias](_types_type_.type.md#alias)*

*Defined in [types/type.ts:190](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L190)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |

**Returns:** *this*

___

###  applySource

▸ **applySource**(`context`: [Context](_context_.context.md), `source`: string, `position`: number, `raw`: string): *void*

*Inherited from [Type](_types_type_.type.md).[applySource](_types_type_.type.md#applysource)*

*Defined in [types/type.ts:443](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L443)*

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

▸ **buildHelpHints**(`hints`: string[]): *void*

*Overrides [Type](_types_type_.type.md).[buildHelpHints](_types_type_.type.md#buildhelphints)*

*Defined in [types/implicit.ts:32](https://github.com/jose-pr/sywac/blob/59b0233/src/types/implicit.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`hints` | string[] |

**Returns:** *void*

___

###  buildInvalidMessage

▸ **buildInvalidMessage**(`context`: [Context](_context_.context.md), `msgAndArgs`: object): *void*

*Inherited from [Type](_types_type_.type.md).[buildInvalidMessage](_types_type_.type.md#buildinvalidmessage)*

*Defined in [types/type.ts:432](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L432)*

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

*Inherited from [Type](_types_type_.type.md).[buildRequiredMessage](_types_type_.type.md#buildrequiredmessage)*

*Defined in [types/type.ts:427](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L427)*

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

▸ **coerce**(`syncFunction`: [CoerceFunction](../modules/_types_type_.md#coercefunction)‹boolean›): *this*

*Inherited from [Type](_types_type_.type.md).[coerce](_types_type_.type.md#coerce)*

*Defined in [types/type.ts:226](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L226)*

**Parameters:**

Name | Type |
------ | ------ |
`syncFunction` | [CoerceFunction](../modules/_types_type_.md#coercefunction)‹boolean› |

**Returns:** *this*

___

###  configure

▸ **configure**(`opts?`: [TypeImplicitCommandOptions](../interfaces/_types_implicit_.typeimplicitcommandoptions.md), `override?`: undefined | false | true): *this*

*Overrides [Type](_types_type_.type.md).[configure](_types_type_.type.md#configure)*

*Defined in [types/implicit.ts:15](https://github.com/jose-pr/sywac/blob/59b0233/src/types/implicit.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | [TypeImplicitCommandOptions](../interfaces/_types_implicit_.typeimplicitcommandoptions.md) |
`override?` | undefined &#124; false &#124; true |

**Returns:** *this*

___

###  defaultValue

▸ **defaultValue**(`dv`: boolean): *this*

*Inherited from [Type](_types_type_.type.md).[defaultValue](_types_type_.type.md#defaultvalue)*

*Defined in [types/type.ts:199](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L199)*

**Parameters:**

Name | Type |
------ | ------ |
`dv` | boolean |

**Returns:** *this*

___

###  desc

▸ **desc**(`d?`: undefined | string): *this*

*Inherited from [Type](_types_type_.type.md).[desc](_types_type_.type.md#desc)*

*Defined in [types/type.ts:249](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L249)*

**Parameters:**

Name | Type |
------ | ------ |
`d?` | undefined &#124; string |

**Returns:** *this*

___

###  description

▸ **description**(`d?`: undefined | string): *this*

*Inherited from [Type](_types_type_.type.md).[description](_types_type_.type.md#description)*

*Defined in [types/type.ts:244](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L244)*

**Parameters:**

Name | Type |
------ | ------ |
`d?` | undefined &#124; string |

**Returns:** *this*

___

###  failValidation

▸ **failValidation**(`context`: [Context](_context_.context.md), `msg`: string[]): *void*

*Inherited from [Type](_types_type_.type.md).[failValidation](_types_type_.type.md#failvalidation)*

*Defined in [types/type.ts:406](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L406)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`msg` | string[] |

**Returns:** *void*

___

###  flags

▸ **flags**(`f`: string): *this*

*Inherited from [Type](_types_type_.type.md).[flags](_types_type_.type.md#flags)*

*Defined in [types/type.ts:235](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L235)*

**Parameters:**

Name | Type |
------ | ------ |
`f` | string |

**Returns:** *this*

___

###  getValue

▸ **getValue**(`context`: [Context](_context_.context.md)): *unknown*

*Inherited from [Type](_types_type_.type.md).[getValue](_types_type_.type.md#getvalue)*

*Defined in [types/type.ts:467](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L467)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *unknown*

___

###  group

▸ **group**(`g`: string): *this*

*Inherited from [Type](_types_type_.type.md).[group](_types_type_.type.md#group)*

*Defined in [types/type.ts:280](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L280)*

**Parameters:**

Name | Type |
------ | ------ |
`g` | string |

**Returns:** *this*

___

###  hasRequiredValue

▸ **hasRequiredValue**(`context`: [Context](_context_.context.md)): *boolean*

*Inherited from [Type](_types_type_.type.md).[hasRequiredValue](_types_type_.type.md#hasrequiredvalue)*

*Defined in [types/type.ts:423](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L423)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *boolean*

___

###  hidden

▸ **hidden**(`h`: boolean): *this*

*Inherited from [Type](_types_type_.type.md).[hidden](_types_type_.type.md#hidden)*

*Defined in [types/type.ts:289](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L289)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | boolean |

**Returns:** *this*

___

###  hints

▸ **hints**(`h?`: string | string[]): *this*

*Inherited from [Type](_types_type_.type.md).[hints](_types_type_.type.md#hints)*

*Defined in [types/type.ts:258](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L258)*

**Parameters:**

Name | Type |
------ | ------ |
`h?` | string &#124; string[] |

**Returns:** *this*

___

###  implicitCommandFound

▸ **implicitCommandFound**(`context`: [Context](_context_.context.md), `source`: string, `position`: number, `raw`: string): *void*

*Defined in [types/implicit.ts:38](https://github.com/jose-pr/sywac/blob/59b0233/src/types/implicit.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`source` | string |
`position` | number |
`raw` | string |

**Returns:** *void*

___

###  isApplicable

▸ **isApplicable**(`context`: [Context](_context_.context.md), `currentValue`: unknown, `previousValue`: unknown, `slurpedArg`: [SlurpedArg](../interfaces/_context_.slurpedarg.md)): *boolean*

*Inherited from [TypeBoolean](_types_boolean_.typeboolean.md).[isApplicable](_types_boolean_.typeboolean.md#isapplicable)*

*Overrides [Type](_types_type_.type.md).[isApplicable](_types_type_.type.md#isapplicable)*

*Defined in [types/boolean.ts:17](https://github.com/jose-pr/sywac/blob/59b0233/src/types/boolean.ts#L17)*

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

*Inherited from [Type](_types_type_.type.md).[observeAlias](_types_type_.type.md#observealias)*

*Defined in [types/type.ts:461](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L461)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`alias` | string |

**Returns:** *void*

___

###  parse

▸ **parse**(`context`: [Context](_context_.context.md)): *Promise‹this›*

*Inherited from [Type](_types_type_.type.md).[parse](_types_type_.type.md#parse)*

*Defined in [types/type.ts:349](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L349)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *Promise‹this›*

___

###  postParse

▸ **postParse**(`context`: [Context](_context_.context.md)): *Promise‹this›*

*Inherited from [Type](_types_type_.type.md).[postParse](_types_type_.type.md#postparse)*

*Defined in [types/type.ts:438](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L438)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *Promise‹this›*

___

###  required

▸ **required**(`r`: boolean): *this*

*Inherited from [Type](_types_type_.type.md).[required](_types_type_.type.md#required)*

*Defined in [types/type.ts:208](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L208)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | boolean |

**Returns:** *this*

___

###  resolve

▸ **resolve**(): *Promise‹this›*

*Inherited from [Type](_types_type_.type.md).[resolve](_types_type_.type.md#resolve)*

*Defined in [types/type.ts:342](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L342)*

**Returns:** *Promise‹this›*

___

###  setValue

▸ **setValue**(`context`: [Context](_context_.context.md), `value`: boolean): *void*

*Inherited from [TypeBoolean](_types_boolean_.typeboolean.md).[setValue](_types_boolean_.typeboolean.md#setvalue)*

*Overrides [Type](_types_type_.type.md).[setValue](_types_type_.type.md#setvalue)*

*Defined in [types/boolean.ts:21](https://github.com/jose-pr/sywac/blob/59b0233/src/types/boolean.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |
`value` | boolean |

**Returns:** *void*

___

###  strict

▸ **strict**(`s`: boolean): *this*

*Inherited from [Type](_types_type_.type.md).[strict](_types_type_.type.md#strict)*

*Defined in [types/type.ts:217](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L217)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | boolean |

**Returns:** *this*

___

###  toObject

▸ **toObject**(): *object*

*Inherited from [Type](_types_type_.type.md).[toObject](_types_type_.type.md#toobject)*

*Defined in [types/type.ts:476](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L476)*

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

*Inherited from [Type](_types_type_.type.md).[toResult](_types_type_.type.md#toresult)*

*Defined in [types/type.ts:492](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L492)*

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

*Inherited from [Type](_types_type_.type.md).[validateConfig](_types_type_.type.md#validateconfig)*

*Defined in [types/type.ts:298](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L298)*

**Parameters:**

Name | Type |
------ | ------ |
`utils` | any |

**Returns:** *void*

___

###  validateParsed

▸ **validateParsed**(`context`: [Context](_context_.context.md)): *Promise‹this›*

*Inherited from [Type](_types_type_.type.md).[validateParsed](_types_type_.type.md#validateparsed)*

*Defined in [types/type.ts:387](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L387)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | [Context](_context_.context.md) |

**Returns:** *Promise‹this›*

___

###  validateValue

▸ **validateValue**(`value`: unknown, `context`: [Context](_context_.context.md)): *boolean*

*Inherited from [Type](_types_type_.type.md).[validateValue](_types_type_.type.md#validatevalue)*

*Defined in [types/type.ts:472](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L472)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | unknown |
`context` | [Context](_context_.context.md) |

**Returns:** *boolean*

___

###  withParent

▸ **withParent**(`apiName`: string): *this*

*Inherited from [Type](_types_type_.type.md).[withParent](_types_type_.type.md#withparent)*

*Defined in [types/type.ts:171](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L171)*

**Parameters:**

Name | Type |
------ | ------ |
`apiName` | string |

**Returns:** *this*

___

### `Static` get

▸ **get**(`opts`: [TypeOptions](../interfaces/_types_type_.typeoptions.md)‹boolean›): *[TypeBoolean](_types_boolean_.typeboolean.md)‹›*

*Inherited from [TypeBoolean](_types_boolean_.typeboolean.md).[get](_types_boolean_.typeboolean.md#static-get)*

*Defined in [types/boolean.ts:5](https://github.com/jose-pr/sywac/blob/59b0233/src/types/boolean.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [TypeOptions](../interfaces/_types_type_.typeoptions.md)‹boolean› |

**Returns:** *[TypeBoolean](_types_boolean_.typeboolean.md)‹›*
