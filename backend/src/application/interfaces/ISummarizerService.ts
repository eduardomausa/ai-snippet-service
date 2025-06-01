export interface ISummarizerService {
  summarize(text: string): Promise<string>;
}
