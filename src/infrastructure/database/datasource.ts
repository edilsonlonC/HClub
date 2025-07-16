import { DataSource, DataSourceOptions } from 'typeorm';

export const getDataSource = (options: DataSourceOptions): DataSource => new DataSource(options);
