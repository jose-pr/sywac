import { Context, SlurpedArg, TypeObject } from "../context";
export declare type CoerceFunction<T> = (v: any) => T;
export interface TypeOptions<T> {
    aliases?: string[] | string;
    defaultValue?: T;
    /**
     * @default false
     */
    required?: boolean;
    /**
     * @default false
     */
    strict?: boolean;
    coerce?: CoerceFunction<T>;
    /**
     * Defines the flags used in help text and aliases to expect when parsing.
     *
       For example,`-n, --num <number>` would allow -n or --num to be given when parsing.
     */
    flags?: string;
    /**
     * The desc (or description) property controls the text displayed immediately to the right of the option or argument in the generated help text.
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
    See also the {@link TypeOptions.hints} property.
     */
    description?: string;
    /**
     * Alias for description
     *
     * See also the {@link TypeOptions.description} property*/
    desc?: string;
    /**
     *
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
      See also the {@link TypeOptions.description} property.
      ```
     */
    hints: string[];
    /**
     * The group option allows you to organize options into multiple sections in the generated help text. By default, commands are grouped under the section Commands:, positional arguments are grouped under the section Arguments:, and flagged options are grouped under Options:.
  
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
     */
    group: string;
    /**
     * The hidden option allows you to specify that an option or argument should not be included
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
     */
    hidden: boolean;
}
export declare type TypeFactory<T extends Type<V>, V> = (opts?: TypeOptions<V>) => Type<V>;
export declare class Type<T> {
    static get SOURCE_DEFAULT(): string;
    static get SOURCE_FLAG(): string;
    static get SOURCE_POSITIONAL(): string;
    protected _aliases: string[];
    protected _defaultVal?: T;
    protected _required?: boolean;
    protected _strict?: boolean;
    protected _coerceHandler?: CoerceFunction<T>;
    protected _flags?: string;
    protected _desc?: string;
    protected _hints?: string | string[];
    protected _group?: string;
    protected _hidden?: boolean;
    protected _parent?: string;
    constructor(opts?: TypeOptions<T>);
    configure(opts?: TypeOptions<T>, override?: boolean): this;
    /**A string uniquely identifying this type across all levels
    used for mapping values and sources in context*/
    get id(): string;
    withParent(apiName: string): this;
    get parent(): string;
    /**subtypes should override this!*/
    get datatype(): string;
    get shouldValidateDefaultValue(): boolean;
    alias(a: string): this;
    get aliases(): string[];
    defaultValue(dv: T): this;
    get defaultVal(): T | undefined;
    required(r: boolean): this;
    get isRequired(): boolean;
    strict(s: boolean): this;
    get isStrict(): boolean;
    coerce(syncFunction: CoerceFunction<T>): this;
    get coerceHandler(): CoerceFunction<T>;
    flags(f: string): this;
    get helpFlags(): string | undefined;
    description(d?: string): this;
    desc(d?: string): this;
    get helpDesc(): string;
    hints(h?: string | string[]): this;
    get helpHints(): string | string[];
    buildHelpHints(hintsArray: string[]): void;
    group(g: string): this;
    get helpGroup(): string;
    hidden(h: boolean): this;
    get isHidden(): boolean;
    validateConfig(utils: any): void;
    resolve(): Promise<this>;
    parse(context: Context): Promise<this>;
    _internalParse(context: Context, validate?: boolean): Promise<this>;
    validateParsed(context: Context): Promise<this>;
    failValidation(context: Context, msg: string[]): void;
    hasRequiredValue(context: Context): boolean;
    buildRequiredMessage(context: Context, msgAndArgs: {
        msg: string;
        args: string[];
    }): void;
    buildInvalidMessage(context: Context, msgAndArgs: {
        msg: string;
        args: (T | string)[];
    }): void;
    postParse(context: Context): Promise<this>;
    applySource(context: Context, source?: string | null, position?: number, raw?: string): void;
    isApplicable(context: Context, currentValue: unknown, previousValue: unknown, slurpedArg: SlurpedArg): boolean;
    observeAlias(context: Context, alias: string): void;
    setValue(context: Context, value: T): void;
    getValue(context: Context): T;
    validateValue(value: unknown, context: Context): Promise<boolean> | boolean;
    toObject(): {
        id: string;
        aliases: string[];
        datatype: string;
        isRequired: boolean;
        helpFlags: string | undefined;
        helpDesc: string;
        helpHints: string | string[];
        helpGroup: string;
        isHidden: boolean;
    };
    toResult(context: Context, shouldCoerce?: boolean): Partial<TypeObject>;
}
export default Type;
