export type ApiState<Entity> = {
  items: Entity[];
  waiting: boolean;
  error?: Error;
};
