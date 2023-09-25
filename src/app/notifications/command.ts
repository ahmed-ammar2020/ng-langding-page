export interface Command {
  text?: string;
  id: number;
  type: 'success' | 'error' | 'clear';
}
