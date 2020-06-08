import { Factory } from "./factory";
import { TypeOptions } from "./options/type"
import { Sywac } from "./sywac";
import { Context, TypeResult } from "./context"

export interface TypeProvider<V = any, O extends TypeOptions<V> = TypeOptions<V>, T extends Type<V, O> = Type<V, O>> extends Factory<O, T, import('./sywac').Sywac> {
}

export type FlagTypeConfig<T> = T & ({ flags: string } | { aliases: string | string[] })

export interface TypeObject {
  id: string,
  aliases: string[],
  datatype: string,
  isRequired: boolean,
  helpFlags: string,
  helpDesc: string,
  helpHints: string[],
  helpGroup: string,
  isHidden: boolean
  invalid?: boolean
}

export interface Type<V = any, O extends TypeOptions<V> = TypeOptions<V>> {
  /**
   * Function to configure options of Type
   * @param opts Options object for type
   * @param override Override value Defaults to `true`
   */
  configure(opts?: Partial<O>, override?: boolean): this
  /**A string uniquely identifying this type across all levels used for mapping values and sources in context*/
  // readonly id: string
  /**Sets the parent name*/
  withParent(apiName: string): this
  /**Returns parent name*/
  // readonly parent:string
  /**Implementations should override this!*/
  readonly datatype: string
  // readonly shouldValidateDefaultValue:boolean
  readonly defaultVal?: V
  validateConfig(utils: any): void
 // getValue(context: Context): undefined | V
  setValue(context: Context, value: V): void
  applySource(context: Context, source?: string | null, position?: number, raw?: string): void
  parse(context: Context): Promise<this>
  toObject(): TypeObject
  toResult(context: Context, shouldCoerce?: boolean): TypeResult
  /** async hook to execute after all parsing*/
  postParse(context: Context): Promise<this>
}