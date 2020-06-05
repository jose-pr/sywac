[sywac](../README.md) › [Globals](../globals.md) › ["context"](../modules/_context_.md) › [Context](_context_.context.md)

# Class: Context

## Hierarchy

* **Context**

## Index

### Constructors

* [constructor](_context_.context.md#constructor)

### Properties

* [_fsLib](_context_.context.md#private-optional-_fslib)
* [_pathLib](_context_.context.md#private-optional-_pathlib)
* [_utils](_context_.context.md#private-_utils)
* [args](_context_.context.md#args)
* [argv](_context_.context.md#argv)
* [code](_context_.context.md#code)
* [commandHandlerRun](_context_.context.md#commandhandlerrun)
* [details](_context_.context.md#details)
* [errors](_context_.context.md#errors)
* [helpRequested](_context_.context.md#helprequested)
* [helpRequestedImplicitly](_context_.context.md#helprequestedimplicitly)
* [knownArgv](_context_.context.md#knownargv)
* [messages](_context_.context.md#messages)
* [output](_context_.context.md#output)
* [slurped](_context_.context.md#slurped)
* [sources](_context_.context.md#sources)
* [state](_context_.context.md#private-state)
* [types](_context_.context.md#types)
* [values](_context_.context.md#values)
* [versionRequested](_context_.context.md#versionrequested)

### Accessors

* [fsLib](_context_.context.md#fslib)
* [pathLib](_context_.context.md#pathlib)
* [utils](_context_.context.md#utils)

### Methods

* [addDeferredHelp](_context_.context.md#adddeferredhelp)
* [addDeferredVersion](_context_.context.md#adddeferredversion)
* [addHelp](_context_.context.md#addhelp)
* [assignValue](_context_.context.md#assignvalue)
* [cliMessage](_context_.context.md#climessage)
* [deferHelp](_context_.context.md#deferhelp)
* [deferImplicitHelp](_context_.context.md#deferimplicithelp)
* [deferVersion](_context_.context.md#deferversion)
* [employSource](_context_.context.md#employsource)
* [explicitCommandMatch](_context_.context.md#explicitcommandmatch)
* [getUnknownArguments](_context_.context.md#getunknownarguments)
* [getUnknownSlurpedOptions](_context_.context.md#getunknownslurpedoptions)
* [lookupSource](_context_.context.md#lookupsource)
* [lookupSourceValue](_context_.context.md#lookupsourcevalue)
* [lookupValue](_context_.context.md#lookupvalue)
* [markTypeInvalid](_context_.context.md#marktypeinvalid)
* [matchCommand](_context_.context.md#matchcommand)
* [parseSingleArg](_context_.context.md#parsesinglearg)
* [populateArgv](_context_.context.md#populateargv)
* [pushLevel](_context_.context.md#pushlevel)
* [resetSource](_context_.context.md#resetsource)
* [slurpArgs](_context_.context.md#slurpargs)
* [toResult](_context_.context.md#toresult)
* [unexpectedError](_context_.context.md#unexpectederror)
* [get](_context_.context.md#static-get)

## Constructors

###  constructor

\+ **new Context**(`opts?`: [ContextOptions](../interfaces/_context_.contextoptions.md)): *[Context](_context_.context.md)*

*Defined in [context.ts:63](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | [ContextOptions](../interfaces/_context_.contextoptions.md) |

**Returns:** *[Context](_context_.context.md)*

## Properties

### `Private` `Optional` _fsLib

• **_fsLib**? : *typeof fs*

*Defined in [context.ts:46](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L46)*

___

### `Private` `Optional` _pathLib

• **_pathLib**? : *typeof path*

*Defined in [context.ts:45](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L45)*

___

### `Private` _utils

• **_utils**: *any*

*Defined in [context.ts:44](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L44)*

___

###  args

• **args**: *string[]*

*Defined in [context.ts:49](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L49)*

___

###  argv

• **argv**: *object & Record‹string, unknown›*

*Defined in [context.ts:55](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L55)*

___

###  code

• **code**: *number*

*Defined in [context.ts:53](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L53)*

___

###  commandHandlerRun

• **commandHandlerRun**: *boolean*

*Defined in [context.ts:60](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L60)*

___

###  details

• **details**: *object*

*Defined in [context.ts:57](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L57)*

#### Type declaration:

* **args**: *string[]*

* **types**: *[TypeObject](../interfaces/_context_.typeobject.md)[]*

___

###  errors

• **errors**: *undefined | string | Error[]*

*Defined in [context.ts:58](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L58)*

___

###  helpRequested

• **helpRequested**: *object*

*Defined in [context.ts:61](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L61)*

#### Type declaration:

___

###  helpRequestedImplicitly

• **helpRequestedImplicitly**: *boolean*

*Defined in [context.ts:62](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L62)*

___

###  knownArgv

• **knownArgv**: *Record‹string, unknown›*

*Defined in [context.ts:56](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L56)*

___

###  messages

• **messages**: *string[]*

*Defined in [context.ts:59](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L59)*

___

###  output

• **output**: *string*

*Defined in [context.ts:54](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L54)*

___

###  slurped

• **slurped**: *[SlurpedArg](../interfaces/_context_.slurpedarg.md)[]*

*Defined in [context.ts:50](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L50)*

___

###  sources

• **sources**: *Map‹string, [Source](../modules/_context_.md#source)›*

*Defined in [context.ts:52](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L52)*

___

### `Private` state

• **state**: *unknown*

*Defined in [context.ts:47](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L47)*

___

###  types

• **types**: *Record‹string, undefined | [TypeObject](../interfaces/_context_.typeobject.md)[]›*

*Defined in [context.ts:48](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L48)*

___

###  values

• **values**: *Map‹string, unknown›*

*Defined in [context.ts:51](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L51)*

___

###  versionRequested

• **versionRequested**: *[DeferVersion](../modules/_context_.md#deferversion) | false*

*Defined in [context.ts:63](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L63)*

## Accessors

###  fsLib

• **get fsLib**(): *undefined | "fs"*

*Defined in [context.ts:105](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L105)*

**Returns:** *undefined | "fs"*

___

###  pathLib

• **get pathLib**(): *undefined | PlatformPath*

*Defined in [context.ts:100](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L100)*

**Returns:** *undefined | PlatformPath*

___

###  utils

• **get utils**(): *any*

*Defined in [context.ts:95](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L95)*

**Returns:** *any*

## Methods

###  addDeferredHelp

▸ **addDeferredHelp**(`helpBuffer`: [HelBuffer](../modules/_context_.md#helbuffer)): *this*

*Defined in [context.ts:264](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L264)*

**Parameters:**

Name | Type |
------ | ------ |
`helpBuffer` | [HelBuffer](../modules/_context_.md#helbuffer) |

**Returns:** *this*

___

###  addDeferredVersion

▸ **addDeferredVersion**(): *this*

*Defined in [context.ts:297](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L297)*

**Returns:** *this*

___

###  addHelp

▸ **addHelp**(`helpBuffer`: [HelBuffer](../modules/_context_.md#helbuffer), `opts`: object): *this*

*Defined in [context.ts:288](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L288)*

**Parameters:**

Name | Type |
------ | ------ |
`helpBuffer` | [HelBuffer](../modules/_context_.md#helbuffer) |
`opts` | object |

**Returns:** *this*

___

###  assignValue

▸ **assignValue**(`id`: string, `value`: unknown): *void*

*Defined in [context.ts:321](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L321)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`value` | unknown |

**Returns:** *void*

___

###  cliMessage

▸ **cliMessage**(...`msg`: string[]): *void*

*Defined in [context.ts:206](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L206)*

**Parameters:**

Name | Type |
------ | ------ |
`...msg` | string[] |

**Returns:** *void*

___

###  deferHelp

▸ **deferHelp**(`opts`: object): *this*

*Defined in [context.ts:254](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L254)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | object |

**Returns:** *this*

___

###  deferImplicitHelp

▸ **deferImplicitHelp**(): *this*

*Defined in [context.ts:259](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L259)*

**Returns:** *this*

___

###  deferVersion

▸ **deferVersion**(`opts`: [DeferVersion](../modules/_context_.md#deferversion)): *this*

*Defined in [context.ts:292](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L292)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [DeferVersion](../modules/_context_.md#deferversion) |

**Returns:** *this*

___

###  employSource

▸ **employSource**(`id`: string, `source`: string, `position`: number, `raw`: string): *void*

*Defined in [context.ts:333](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L333)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`source` | string |
`position` | number |
`raw` | string |

**Returns:** *void*

___

###  explicitCommandMatch

▸ **explicitCommandMatch**(`level`: string): *boolean*

*Defined in [context.ts:236](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |

**Returns:** *boolean*

___

###  getUnknownArguments

▸ **getUnknownArguments**(): *string[]*

*Defined in [context.ts:370](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L370)*

**Returns:** *string[]*

___

###  getUnknownSlurpedOptions

▸ **getUnknownSlurpedOptions**(): *undefined | [SlurpedArg](../interfaces/_context_.slurpedarg.md)[]*

*Defined in [context.ts:376](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L376)*

**Returns:** *undefined | [SlurpedArg](../interfaces/_context_.slurpedarg.md)[]*

___

###  lookupSource

▸ **lookupSource**(`id`: string): *undefined | object*

*Defined in [context.ts:344](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L344)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *undefined | object*

___

###  lookupSourceValue

▸ **lookupSourceValue**(`id`: string): *undefined | string*

*Defined in [context.ts:348](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L348)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *undefined | string*

___

###  lookupValue

▸ **lookupValue**(`id`: string): *unknown*

*Defined in [context.ts:325](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L325)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *unknown*

___

###  markTypeInvalid

▸ **markTypeInvalid**(`id`: string): *void*

*Defined in [context.ts:224](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L224)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *void*

___

###  matchCommand

▸ **matchCommand**(`level`: string, `aliases`: string[], `isDefault`: boolean): *false | object*

*Defined in [context.ts:242](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L242)*

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |
`aliases` | string[] |
`isDefault` | boolean |

**Returns:** *false | object*

___

###  parseSingleArg

▸ **parseSingleArg**(`arg`: string): *object[]*

*Defined in [context.ts:157](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | string |

**Returns:** *object[]*

___

###  populateArgv

▸ **populateArgv**(`typeResults`: [TypeObject](../interfaces/_context_.typeobject.md)[]): *void*

*Defined in [context.ts:353](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L353)*

**Parameters:**

Name | Type |
------ | ------ |
`typeResults` | [TypeObject](../interfaces/_context_.typeobject.md)[] |

**Returns:** *void*

___

###  pushLevel

▸ **pushLevel**(`level`: string, `types`: [TypeObject](../interfaces/_context_.typeobject.md)[]): *this*

*Defined in [context.ts:195](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L195)*

**Parameters:**

Name | Type |
------ | ------ |
`level` | string |
`types` | [TypeObject](../interfaces/_context_.typeobject.md)[] |

**Returns:** *this*

___

###  resetSource

▸ **resetSource**(`id`: string, `source`: string): *void*

*Defined in [context.ts:329](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L329)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`source` | string |

**Returns:** *void*

___

###  slurpArgs

▸ **slurpArgs**(`args`: string | string[]): *this*

*Defined in [context.ts:110](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L110)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | string &#124; string[] |

**Returns:** *this*

___

###  toResult

▸ **toResult**(): *object*

*Defined in [context.ts:382](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L382)*

**Returns:** *object*

* **argv**: *object & object* = this.argv

* **code**: *number* = this.code

* **details**(): *object*

  * **args**: *string[]*

  * **types**: *[TypeObject](../interfaces/_context_.typeobject.md)[]*

* **errors**: *undefined | string | Error[]* = this.errors

* **output**: *string* = this.output

___

###  unexpectedError

▸ **unexpectedError**(`err?`: Error | string): *void*

*Defined in [context.ts:200](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L200)*

**Parameters:**

Name | Type |
------ | ------ |
`err?` | Error &#124; string |

**Returns:** *void*

___

### `Static` get

▸ **get**(`opts?`: [ContextOptions](../interfaces/_context_.contextoptions.md)): *[Context](_context_.context.md)‹›*

*Defined in [context.ts:40](https://github.com/jose-pr/sywac/blob/a63bd2b/src/context.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | [ContextOptions](../interfaces/_context_.contextoptions.md) |

**Returns:** *[Context](_context_.context.md)‹›*
