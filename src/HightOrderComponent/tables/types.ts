import { EntityRelated } from "@trifenix/agro-data";

// * Saca los elementos de la interfaz V a la interfaz T
export type Subtract<T, V> = Pick<T, Exclude<keyof T, keyof V>>;

// * Props del HOC
export type WithTableProps = TableFunction & TablePropertys;

/**
 * Table function
 * @param getHeaders Funcion que define como se van a extraer los headers
 * @param getData Funcion que define como se van a obtener los datos
 */
export interface TableFunction {
	getHeaders: (entity: EntityRelated, relsInfo?: EntityRelated[]) => IHeadersTable[];
	getData: (entity: EntityRelated, page: number, total: number) => Promise<any>;
}

/**
 * Table propertys
 * @param headers Estructura que deben tener los datos
 * @param data Datos que va a mostrar la tabla
 */
export interface TablePropertys {
	headers?: IHeadersTable[];
	data?: any[];
}

/**
 * Iheaders table
 * @param Header Cabecera de la Tabla
 * @param accessor Campo al que accedera una columna para identificar el dato para mostrar
 * @param Filter Como se filtrara la columna
 * @param Cell Define si en cada columna se mostrara un Elemento (Botones, links, etc)
 */
export interface IHeadersTable {
	Header: string;
	accessor: string;
	Filter?: any;
	Cell?: React.FunctionComponent;
}