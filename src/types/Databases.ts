import DbTable from './DbTable';

export default interface Databases {
  [databaseName: string]: DbTable[];
}
