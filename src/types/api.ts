export interface DictionaryEntry {
  word: string;
  timestamp: string;
  entries: Array<{
    sense: Array<{
      id: number;
      def: string;
    }>;
  }>;
}

export type DictionaryResponse = DictionaryEntry[];

export type AlertType = 'error' | 'success';

export interface AlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
}
