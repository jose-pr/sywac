import { Context } from "../context";
export declare type CoerceFunction<T> = (v: any) => T;
export interface TypeOptions<T = any> {
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
    hints?: string[];
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
    group?: string;
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
    hidden?: boolean;
}
export interface TypeProvider<V = any, O extends TypeOptions<V> = TypeOptions<V>, T extends IType<V, O> = IType<V, O>> {
    get(opts: O): T;
}
export interface TypeResult {
    aliases: string[];
    datatype: string;
    parent: string;
    value?: unknown;
    source?: string;
    position?: number[];
    raw?: string[];
}
export interface TypeObject {
    id: string;
    aliases: string[];
    datatype: string;
    isRequired: boolean;
    helpFlags: string;
    helpDesc: string;
    helpHints: string[];
    helpGroup: string;
    isHidden: boolean;
}
export interface IType<V = any, O extends TypeOptions<V> = TypeOptions<V>> {
    /**
     * Function to configure options of Type
     * @param opts Options object for type
     * @param override Override value Defaults to `true`
     */
    configure(opts?: Partial<O>, override?: boolean): this;
    /**A string uniquely identifying this type across all levels used for mapping values and sources in context*/
    /**Sets the parent name*/
    withParent(apiName: string): this;
    /**Returns parent name*/
    /**Implementations should override this!*/
    readonly datatype: string;
    readonly defaultVal?: V;
    validateConfig(utils: any): void;
    setValue(context: Context, value: V): void;
    applySource(context: Context, source?: string | null, position?: number, raw?: string): void;
    parse(context: Context): Promise<this>;
    toObject(): TypeObject;
    toResult(context: Context, shouldCoerce?: boolean): TypeResult;
    /** async hook to execute after all parsing*/
    postParse(context: Context): Promise<this>;
}
export declare enum SOURCE_CONSTANTS {
    SOURCE_DEFAULT = "default",
    SOURCE_FLAG = "flag",
    SOURCE_POSITIONAL = "positional"
}
export declare function normalizeOpts<O extends TypeOptions>(flags: string | string[] | Partial<O>, opts: Partial<O>): O;
