import Type from './type';
import { TypeOptions } from './api';
export interface TypeWrapperOptions<T> extends TypeOptions<T> {
    elementType?: Type<T>;
    of?: Type<T>;
}
export declare class TypeWrapper<T> extends Type<T> {
    private _elementType;
    configure(opts?: TypeWrapperOptions<T>, override?: boolean): this;
    of(subtype: Type<T>): this;
    get elementType(): Type<T, TypeOptions<T>>;
    get datatype(): string;
    get shouldValidateDefaultValue(): boolean;
}
export default TypeWrapper;
