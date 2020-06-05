[sywac](../README.md) › [Globals](../globals.md) › ["context"](_context_.md)

# Module: "context"

## Index

### Classes

* [Context](../classes/_context_.context.md)

### Interfaces

* [ContextOptions](../interfaces/_context_.contextoptions.md)
* [SlurpedArg](../interfaces/_context_.slurpedarg.md)
* [TypeObject](../interfaces/_context_.typeobject.md)

### Type aliases

* [DeferVersion](_context_.md#deferversion)
* [HelBuffer](_context_.md#helbuffer)
* [Source](_context_.md#source)

### Variables

* [format](_context_.md#const-format)

## Type aliases

###  DeferVersion

Ƭ **DeferVersion**: *object*

*Defined in [context.ts:17](https://github.com/jose-pr/sywac/blob/59b0233/src/context.ts#L17)*

#### Type declaration:

* **version**? : *string | Function*

___

###  HelBuffer

Ƭ **HelBuffer**: *object*

*Defined in [context.ts:18](https://github.com/jose-pr/sywac/blob/59b0233/src/context.ts#L18)*

#### Type declaration:

* **_usageName**: *string*

* **groups**: *Record‹string, [TypeObject](../interfaces/_context_.typeobject.md)[]›*

* **messages**: *string[]*

* **toString**(`o`: object): *string*

___

###  Source

Ƭ **Source**: *object*

*Defined in [context.ts:24](https://github.com/jose-pr/sywac/blob/59b0233/src/context.ts#L24)*

#### Type declaration:

* **position**: *number[]*

* **raw**: *string[]*

* **source**: *string*

## Variables

### `Const` format

• **format**: *any* = require('util').format

*Defined in [context.ts:4](https://github.com/jose-pr/sywac/blob/59b0233/src/context.ts#L4)*
