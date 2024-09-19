export interface Streamer {
  name: string;
  last_stream: Date;
}

export interface StreamStatus {
  [streamer: string]: boolean | string;
}
