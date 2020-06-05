[sywac](../README.md) › [Globals](../globals.md) › ["types/type"](../modules/_types_type_.md) › [TypeOptions](_types_type_.typeoptions.md)

# Interface: TypeOptions ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **TypeOptions**

  ↳ [TypeImplicitCommandOptions](_types_implicit_.typeimplicitcommandoptions.md)

## Index

### Properties

* [aliases](_types_type_.typeoptions.md#optional-aliases)
* [coerce](_types_type_.typeoptions.md#optional-coerce)
* [defaultValue](_types_type_.typeoptions.md#optional-defaultvalue)
* [desc](_types_type_.typeoptions.md#optional-desc)
* [description](_types_type_.typeoptions.md#optional-description)
* [flags](_types_type_.typeoptions.md#optional-flags)
* [group](_types_type_.typeoptions.md#group)
* [hidden](_types_type_.typeoptions.md#hidden)
* [hints](_types_type_.typeoptions.md#hints)
* [required](_types_type_.typeoptions.md#optional-required)
* [strict](_types_type_.typeoptions.md#optional-strict)

## Properties

### `Optional` aliases

• **aliases**? : *string[] | string*

*Defined in [types/type.ts:6](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L6)*

___

### `Optional` coerce

• **coerce**? : *[CoerceFunction](../modules/_types_type_.md#coercefunction)‹T›*

*Defined in [types/type.ts:16](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L16)*

___

### `Optional` defaultValue

• **defaultValue**? : *T*

*Defined in [types/type.ts:7](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L7)*

___

### `Optional` desc

• **desc**? : *undefined | string*

*Defined in [types/type.ts:42](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L42)*

Alias for description

See also the [TypeOptions.description](_types_type_.typeoptions.md#optional-description) property

___

### `Optional` description

• **description**? : *undefined | string*

*Defined in [types/type.ts:37](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L37)*

The desc (or description) property controls the text displayed immediately to the right of the option or argument in the generated help text.
If not specified, the description will be blank.
```ts
sywac.boolean('--confirm', {
desc: 'skip confirmation prompt'
});
```
```console
Options:
--confirm  skip confirmation prompt                                  [boolean]
```
See also the [TypeOptions.hints](_types_type_.typeoptions.md#hints) property.

___

### `Optional` flags

• **flags**? : *undefined | string*

*Defined in [types/type.ts:22](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L22)*

Defines the flags used in help text and aliases to expect when parsing.

For example,`-n, --num <number>` would allow -n or --num to be given when parsing.

___

###  group

• **group**: *string*

*Defined in [types/type.ts:96](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L96)*

The group option allows you to organize options into multiple sections in the generated help text. By default, commands are grouped under the section Commands:, positional arguments are grouped under the section Arguments:, and flagged options are grouped under Options:.

Tip:

The text you specify will be used verbatim, so be sure to include the ending colon (:)
within your label if you want the colon in your section header.
```js
sywac.number('-p, --port <port>', {
desc: 'port to listen on',
group: 'Server Options:'
});
```
```console
Server Options:
-p, --port   port to listen on                                  [number]
```

___

###  hidden

• **hidden**: *boolean*

*Defined in [types/type.ts:115](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L115)*

The hidden option allows you to specify that an option or argument should not be included
in the generated help text.

You can use this to hide a rarely-used or deprecated option, while still taking advantage
of sywac’s parsing.
```ts
sywac.boolean('--fancy', {
hidden: true
});
```
You can also use it to slurp up extra positional arguments, without being displayed in the arguments section.
```ts
sywac.positional('[users...]', {
hidden: true
});
```

___

###  hints

• **hints**: *string[]*

*Defined in [types/type.ts:77](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L77)*

The hints property controls the type information displayed to the far right of the option or argument in the generated help text.

By default, a hint will be generated automatically based on the type of the option - for example, [boolean] or [number].

You can use this to display an optional option as if it was required, or to make the hint more specific.
```ts
sywac.string('--name <name>', {
hints: '[required] [string]'
});
sywac.array('--users', {
hints: '[list of users]'
});
```
```console
Options:
--name                                               [required] [string]
--users                                                        [list of users]
```
You can also use this property to suppress an unwanted auto-generated hint.
```ts
sywac.command({
aliases: 'update <student-id>',
desc: 'update a student record',
hints: ''                       // suppress usual aliases hint
});
```
```console
Commands:
update    update a student record
See also the [TypeOptions.description](_types_type_.typeoptions.md#optional-description) property.
```

___

### `Optional` required

• **required**? : *undefined | false | true*

*Defined in [types/type.ts:11](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L11)*

**`default`** false

___

### `Optional` strict

• **strict**? : *undefined | false | true*

*Defined in [types/type.ts:15](https://github.com/jose-pr/sywac/blob/59b0233/src/types/type.ts#L15)*

**`default`** false
