export interface TypeOptions<V> {
  aliases?: string[] | string
  defaultValue?: V
  /**
   * @default false
   */
  required?: boolean
  /**
   * @default false
   */
  strict?: boolean
  coerce?: (s: string) => V
  /**
   * Defines the flags used in help text and aliases to expect when parsing.
   * 
     For example,`-n, --num <number>` would allow -n or --num to be given when parsing.
   */
  flags?: string
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
  description?: string
  /**
   * Alias for description
   * 
   * See also the {@link TypeOptions.description} property*/
  desc?: string
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
      --users                                                  [list of users]
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
  hints?: string[]
  /**
   * The group option allows you to organize options into multiple sections in the generated help text. By default, commands are grouped under the section Commands:, positional arguments are grouped under the section Arguments:, and flagged options are grouped under Options:.
   * @TIP The text you specify will be used verbatim, so be sure to include the ending colon (:) within your label if you want the colon in your section header.
   *@example_code:
   * ```js
   *sywac.number('-p, --port <port>', {
   *desc: 'port to listen on',
   *group: 'Server Options:'
   *});
   * ```
   *@example_output:
   *```console
   *Server Options:
   *-p, --port   port to listen on                                  [number]
   *```
   */
  group?: string
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
  hidden?: boolean
}
export type TypeOptionsAliases<O extends {}> = (O['flags'] extends string ? O["flags"] : never) | (O['aliases'] extends string ? O["aliases"] : never) | (O['aliases'] extends (infer N)[] ? (N extends string ? N : never) : never)
export type TypeIsRequired<O extends {},V> = O['defaultValue'] extends V ? true : O['required'] extends true ? true : false
export type ArgvExtension<O extends {}, V> = TypeIsRequired<O,V> extends true ? {
  [n in TypeOptionsAliases<O>]:V
}:{
  [n in TypeOptionsAliases<O>]?:V
}
type t=TypeIsRequired<{defaultValue:false}>